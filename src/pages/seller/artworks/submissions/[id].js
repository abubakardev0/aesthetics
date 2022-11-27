import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { db, auth } from '@/firebase/firebase-config';
import {
    doc,
    getDoc,
    addDoc,
    deleteDoc,
    Timestamp,
    collection,
    increment,
    updateDoc,
} from 'firebase/firestore';

import { Input, Loading } from '@nextui-org/react';

import SellerLayout from '@/layouts/SellerLayout';

import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import Checkbox from '@/seller/uploadartwork/Checkbox';
import Error from '@/commoncomponents/Error';
import Loader from '@/commoncomponents/Loader';
import ErrorIcon from '@/icons/Error';

function Artwork({ artwork, hasError }) {
    const router = useRouter();

    if (hasError) {
        router.replace('/404');
        return <Loader />;
    }
    const item = JSON.parse(artwork);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [type, setType] = useState('immediate');
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { data: categories, error } = useSWR('categories', async () => {
        const ref = await getDoc(doc(db, 'categories', 'paintings'));
        if (ref.exists()) {
            return ref.data().list;
        }
    });

    if (error) {
        return <Error />;
    }

    async function onSubmit(data) {
        setLoading(true);
        const itemData = {
            artist: item.artist,
            category: selectedCategory[0],
            certificates: item.certificates,
            description: data.description,
            dimensions: {
                height: item.height,
                width: item.width,
                depth: item.depth,
                unit: item.unit,
            },
            images: item.images,
            mediums: item.mediums,
            surfaces: item.surfaces,
            price: parseInt(data.price),
            sellerId: auth.currentUser.uid,
            title: item.title,
            type: type,
            status: 'listed',
            uploadedAt: Timestamp.fromDate(new Date()),
        };
        if (type === 'auction') {
            itemData['startingBid'] = parseInt(data.startingBid);
            itemData['currentBid'] = parseInt(data.startingBid);
            itemData['lastBid'] = null;
            itemData['totalBids'] = 0;
            itemData['endingTime'] = Timestamp.fromDate(
                new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
            );
        }
        try {
            await addDoc(collection(db, 'artworks'), itemData);
            await deleteDoc(doc(db, 'submittedArtworks', `${item.id}`));
            await updateDoc(doc(db, 'users', `${auth.currentUser.uid}`), {
                uploadedWorks: increment(1),
            });
            router.push('/seller/artworks');
        } catch (error) {
            alert(error);
        }
        setLoading(false);
    }
    return (
        <>
            <Head>
                <title>{item.title.toUpperCase()}</title>
            </Head>
            <section className="grid h-fit place-content-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full space-y-4 border-0 p-5 md:w-[450px] md:rounded-lg md:border-2 md:px-8 md:py-6 xl:w-[500px]"
                >
                    <div className="space-y-1">
                        <h3 className="font-garamond text-3xl font-semibold xl:text-4xl">
                            Get your aesthetic enjoyment
                        </h3>
                        <p className="">
                            Complete details to list your artwork in our space
                        </p>
                    </div>
                    <label className="block text-sm">
                        Choose Selling option
                        <div className="mt-1 flex w-fit space-x-2">
                            <label>
                                <input
                                    checked={
                                        type === 'immediate' ? true : false
                                    }
                                    id="immediate-radio"
                                    type="radio"
                                    name="immediate"
                                    onChange={() => setType('immediate')}
                                    className="peer hidden"
                                />
                                <div className="w-fit rounded-full border-2 border-gray-300 px-5  py-2 text-sm capitalize peer-checked:border-blue-400 peer-checked:bg-blue-400 peer-checked:text-white">
                                    Immediate Sell
                                </div>
                            </label>
                            <label>
                                <input
                                    checked={type === 'auction' ? true : false}
                                    id="auction-radio"
                                    type="radio"
                                    name="auction"
                                    onChange={() => setType('auction')}
                                    className="peer hidden"
                                />
                                <div className="w-fit rounded-full border-2 border-gray-300 px-5 py-2 text-sm capitalize peer-checked:border-blue-400 peer-checked:bg-blue-400 peer-checked:text-white">
                                    Auction
                                </div>
                            </label>
                        </div>
                    </label>
                    <label className="block text-sm">
                        Select Category
                        <div className="mt-1 flex flex-wrap gap-4">
                            {!categories ? (
                                <Loading />
                            ) : (
                                <Checkbox
                                    list={categories}
                                    selected={selectedCategory}
                                    setSelected={setSelectedCategory}
                                    max={1}
                                />
                            )}
                        </div>
                    </label>

                    {type === 'immediate' ? (
                        <>
                            <Input
                                clearable
                                bordered
                                width="100%"
                                label="Price"
                                placeholder="Estimated Price"
                                labelLeft="PKR"
                                helperText={
                                    errors.price && (
                                        <span className="text-sm text-red-500">
                                            Invalid Price
                                        </span>
                                    )
                                }
                                {...register('price', {
                                    required: true,
                                    min: 0,
                                    pattern: /^\d+(\.\d+)?$/,
                                })}
                            />
                        </>
                    ) : (
                        <>
                            <Input
                                clearable
                                bordered
                                width="100%"
                                label="Estimation"
                                placeholder="Estimated Price"
                                labelLeft="PKR"
                                helperText={
                                    errors.price && (
                                        <span className="text-sm text-red-500">
                                            Invalid Price
                                        </span>
                                    )
                                }
                                {...register('price', {
                                    required: true,
                                    min: 0,
                                    pattern: /^\d+(\.\d+)?$/,
                                })}
                            />
                            <Input
                                clearable
                                bordered
                                width="100%"
                                label="Price"
                                placeholder="Starting Bid"
                                labelLeft="PKR"
                                helperText={
                                    errors.price && (
                                        <span className="text-sm text-red-500">
                                            Invalid Amount
                                        </span>
                                    )
                                }
                                {...register('startingBid', {
                                    required: true,
                                    min: 0,
                                    pattern: /^\d+(\.\d+)?$/,
                                })}
                            />
                        </>
                    )}
                    <div className="space-y-1">
                        <label className="text-sm">Description</label>
                        <textarea
                            rows="4"
                            className="section-scrollbar w-full resize-none rounded-xl border-2 border-gray-300 bg-slate-50 p-2 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-black focus:-translate-y-[2px] focus:border-black"
                            placeholder="Description of your artwork"
                            {...register('description', {
                                required: true,
                            })}
                        />
                        {errors.description && (
                            <span className="text-sm text-red-500">
                                required field*
                            </span>
                        )}
                    </div>
                    {item.status !== 'accepted' ? (
                        <p className="border-2 border-black py-2.5 text-center">
                            Your artwork is not approved yet
                        </p>
                    ) : (
                        <div className="flex w-full space-x-3">
                            <button
                                type="reset"
                                className="w-1/2 rounded-lg bg-neutral-200 py-2 text-neutral-800 active:bg-neutral-300"
                            >
                                Discard
                            </button>
                            <button
                                type="submit"
                                className="w-1/2 rounded-lg bg-neutral-800 p-3 font-medium tracking-wide text-neutral-100 shadow-lg hover:bg-neutral-900"
                            >
                                {loading ? (
                                    <Loading
                                        type="points-opacity"
                                        color="white"
                                    />
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </div>
                    )}
                </form>
            </section>
        </>
    );
}

Artwork.Layout = SellerLayout;
export default Artwork;

export async function getServerSideProps({
    params = { id: id.id.toString() },
}) {
    const id = params.id;
    const data = await getDoc(doc(db, 'submittedArtworks', id));
    if (!data.exists()) {
        return {
            props: {
                hasError: true,
            },
        };
    }
    return {
        props: {
            artwork: JSON.stringify({ id: data.id, ...data.data() }),
        },
    };
}
