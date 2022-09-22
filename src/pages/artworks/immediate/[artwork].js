import { useState, useEffect } from 'react';

import Link from 'next/link';
import Head from 'next/head';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import ARView from '@/icons/ARView';
import Bookmark from '@/icons/Bookmark';
import Insta from '@/icons/Insta';
import Twitter from '@/icons/Twitter';
import Behance from '@/icons/Behance';

import { Avatar, Collapse } from '@nextui-org/react';

import Slider from '@/commoncomponents/Scrollers/Slider';
import RelatedWorks from '@/buyer/components/artwork/RelatedWorks';
import { numberWithCommas } from '@/commoncomponents/functions';

import Alert from '@/commoncomponents/popups/Alert';

export default function Item({ artwork, hasError }) {
    const [save, setSave] = useState(false);
    const [addtoBag, setAddtoBag] = useState(false);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    });

    const data = JSON.parse(artwork);

    async function handler(document, set) {
        const docRef = doc(db, document, auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const artworks = docSnap.data().artworks;
            const index = artworks.indexOf(data.id);
            if (index !== -1) {
                artworks.splice(index, 1);
                await setDoc(docRef, {
                    artworks: artworks,
                });
                set(false);
            } else {
                artworks.push(data.id);
                setDoc(docRef, {
                    artworks: artworks,
                });
                set(true);
            }
        } else {
            await setDoc(docRef, {
                artworks: [data.id],
            });
            set(true);
        }
    }
    async function inCollection(document, set) {
        const docRef = doc(db, document, auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const artworks = docSnap.data().artworks;
            const index = artworks.indexOf(data.id);
            if (index !== -1) {
                set(true);
                return;
            }
        }
    }

    function handleWishList() {
        if (!auth.currentUser) {
            setAlert({
                type: 'Not Loggedin',
                message: 'Please login to add items to your bag',
            });
            setShow(true);
            return;
        } else {
            handler('saves', setSave);
        }
    }

    function handleBag() {
        if (!auth.currentUser) {
            setAlert({
                type: 'Not Loggedin',
                message: 'Please login to add items to your bag',
            });
            setShow(true);
            return;
        } else {
            handler('bag', setAddtoBag);
        }
    }

    useEffect(() => {
        if (auth.currentUser) {
            inCollection('saves', setSave);
        }
    }, [save]);

    useEffect(() => {
        if (auth.currentUser) {
            inCollection('bag', setAddtoBag);
        }
    }, [addtoBag]);

    if (hasError) {
        return 'Not Found';
    }

    return (
        <>
            <Head>
                <title>{data.title}</title>
            </Head>
            <section className="container mx-auto flex h-full w-full flex-col md:h-[600px] md:flex-row md:gap-5">
                <div className="grid h-[450px] w-full place-content-center pt-0 md:h-full md:w-1/2 md:pt-14">
                    <Slider images={data.images} />
                    <div className="mt-3 flex justify-center">
                        <Link href="/">
                            <a>
                                <ARView className="h-12 w-12 md:h-16 md:w-16" />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="h-full w-full py-5 md:w-1/2 md:px-16">
                    <div className="h-full w-full flex-col-reverse space-y-6 p-4 md:flex-col md:space-y-12 md:rounded-lg md:p-12">
                        <div className="flex w-full items-center justify-between">
                            <div className="inline-flex items-center space-x-3">
                                <Avatar
                                    size="lg"
                                    text={data.artist.toLocaleUpperCase()}
                                    css={{ zIndex: 1 }}
                                />
                                <h3 className="text-base font-medium capitalize sm:text-lg md:text-xl">
                                    {data.artist}
                                </h3>
                            </div>
                            <button className="h-8 w-20 rounded-full border-2 border-black bg-none text-base transition-all duration-100 hover:bg-neutral-800 hover:text-white active:bg-neutral-900 active:text-white sm:w-24 md:h-10 md:w-32">
                                Follow
                            </button>
                        </div>
                        <div>
                            <h2 className="mb-1 text-xl font-medium tracking-wide sm:text-2xl md:text-3xl md:font-semibold">
                                {data.title}
                            </h2>
                            <p>
                                <span className="text-base italic md:text-lg">
                                    Acrylic on Canvas
                                </span>
                                <br />
                                9 1/2 x 9 1/2 in <br /> 24.1 x 24.1 cm
                            </p>
                        </div>
                        <div className="w-full space-y-4">
                            <h4 className="text-lg font-medium tracking-wide md:text-xl">
                                PKR.
                                <span className="ml-1">
                                    {numberWithCommas(data.price)}
                                </span>
                            </h4>
                        </div>

                        <button
                            onClick={handleBag}
                            className="h-12 w-80 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-neutral-300"
                        >
                            {addtoBag ? 'Remove from Bag' : 'Add to Bag'}
                        </button>
                        <div className="mt-2 flex justify-evenly space-x-3 md:justify-start">
                            <button
                                className="flex items-center space-x-2"
                                onClick={handleWishList}
                            >
                                <Bookmark
                                    className={`delay-50 h-6 w-6 transition-colors md:h-8 md:w-8 `}
                                    fill={save ? 'black' : 'none'}
                                    stroke="black"
                                />
                                <span className="font-medium">
                                    Save Artwork
                                </span>
                            </button>
                            <div className="flex space-x-6 border-l-2 border-black/25 px-3">
                                <button>
                                    <Insta className="h-6 w-6 hover:scale-105" />
                                </button>
                                <button>
                                    <Behance className="h-6 w-6 hover:scale-105" />
                                </button>
                                <button>
                                    <Twitter className="h-6 w-6 hover:scale-105" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container mx-auto py-6 md:py-16">
                <div className="mb-5 flex w-full flex-col items-center justify-center space-y-5 md:mb-10">
                    <Collapse
                        title="About This Artwork"
                        expanded
                        bordered
                        className="w-full md:w-3/5 lg:w-1/2"
                    >
                        <p>{data.description ?? 'No Description'}</p>
                    </Collapse>
                    <Collapse
                        title="Additional Details"
                        bordered
                        className="w-full md:w-3/5 lg:w-1/2"
                    >
                        <h4 className="text-xl font-medium">Certificates</h4>
                        <p>
                            {data.certificates ??
                                'This artwork has no certification'}
                        </p>
                    </Collapse>
                </div>
                <RelatedWorks category={data.category} />
            </section>
            <Alert
                show={show}
                setShow={setShow}
                type={alert.type}
                message={alert.message}
            />
        </>
    );
}

export async function getServerSideProps({
    params = { id: artwork.id.toString() },
}) {
    const id = params.artwork;
    const data = await getDoc(doc(db, 'artworks', id));
    if (!data) {
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
