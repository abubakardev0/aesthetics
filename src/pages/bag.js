import { useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import useSWR from 'swr';

import { Checkbox } from '@nextui-org/react';

import ItemBlock from '@/immediatesell/shoppingbag/ItemBlock';
import EmptyBag from '@/immediatesell/shoppingbag/EmptyBag';

import { formatCurrency } from '@/commoncomponents/functions';

import Alert from '@/commoncomponents/popups/Alert';

async function getItems() {
    const docRef = doc(db, 'bag', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().artworks;
    }
}
async function getArtworks() {
    let items = [];
    const list = await getItems();
    for (let i = 0; i < list.length; i++) {
        const item = await getDoc(doc(db, 'artworks', list[i]));
        if (item) {
            items.push({ id: item.id, ...item.data() });
        }
    }
    return items;
}

export default function Bag() {
    const { data: items, error } = useSWR('bagItems', getArtworks);
    const [selectedItems, setSelectedItems] = useState([]);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    });

    if (!items) return <h1 className="text-center">Loading...</h1>;
    if (error)
        return <h1 className="text-center">Loading failed, Retrying...</h1>;

    async function removeFromBag(itemId) {
        try {
            await updateDoc(doc(db, 'bag', auth.currentUser.uid), {
                artworks: arrayRemove(itemId),
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    const getTotalPrice = () => {
        let price = 0;

        selectedItems.forEach((e) => {
            items.forEach((item) => {
                if (item.id === e) {
                    price += parseInt(item.price);
                }
            });
        });
        return price;
    };

    return (
        <>
            <Head>
                <title>Shopping Bag</title>
            </Head>
            {items.length === 0 ? (
                <EmptyBag />
            ) : (
                <section className="container md:mx-auto">
                    <div className="w-full">
                        <div className="flex flex-col items-center">
                            <h3 className="text-xl font-semibold uppercase leading-loose">
                                Your Shopping Bag
                            </h3>
                            <p className="w-full space-x-4 border-b-2 py-2 text-center">
                                <span className="border-r-2 pr-4">
                                    Bag Items ({items.length})
                                </span>
                                <span>Your Saves</span>
                            </p>
                        </div>
                        <div className="my-5 flex w-full flex-col items-start justify-between space-y-4 px-2 md:flex-row md:space-y-0">
                            <div className="w-full space-y-4 md:w-7/12">
                                <Checkbox.Group
                                    label="Select Items"
                                    color="primary"
                                    value={selectedItems}
                                    onChange={setSelectedItems}
                                >
                                    {items.map((each) => (
                                        <Checkbox
                                            value={each.id}
                                            css={{
                                                zIndex: 0,
                                            }}
                                            key={each.id}
                                        >
                                            <div className="w-screen pr-4 md:w-[750px]">
                                                <ItemBlock
                                                    item={each}
                                                    remove={removeFromBag}
                                                />
                                            </div>
                                        </Checkbox>
                                    ))}
                                </Checkbox.Group>
                            </div>
                            <div className="w-full space-y-4 p-5 md:w-4/12 md:rounded-md md:border-l-2 md:p-10">
                                <h3 className="mb-5 text-lg font-semibold uppercase tracking-wide md:text-2xl">
                                    Order Summary
                                </h3>
                                <div className="flex justify-between border-b-2 pb-2">
                                    <h6 className="text-base font-medium text-neutral-700 md:text-lg">
                                        Sub Total
                                    </h6>
                                    <p className="text-base font-medium text-neutral-700 md:text-lg">
                                        {formatCurrency(getTotalPrice())}
                                    </p>
                                </div>
                                <div className="flex justify-between border-b-2 pb-2">
                                    <h6 className="text-base font-medium text-neutral-700 md:text-lg">
                                        Estimated Shipping
                                    </h6>
                                    <p className="text-base font-medium text-neutral-700 md:text-lg">
                                        Free
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <h6 className="text-lg font-medium text-black md:text-xl">
                                        Estimated Total
                                    </h6>
                                    <p className="text-lg font-medium text-black md:text-xl">
                                        {formatCurrency(getTotalPrice())}
                                    </p>
                                </div>
                                <button className="h-12 w-full rounded-sm border border-[#2D2D2D] bg-none text-base transition-all hover:bg-[#2D2D2D] hover:text-white md:block">
                                    {selectedItems.length > 0 ? (
                                        <Link
                                            href={{
                                                pathname: '/checkout',
                                                query: selectedItems,
                                            }}
                                        >
                                            <a disabled={true}>Checkout Now</a>
                                        </Link>
                                    ) : (
                                        'Make a selection'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <Alert
                show={show}
                setShow={setShow}
                type={alert.type}
                message={alert.message}
            />
        </>
    );
}
