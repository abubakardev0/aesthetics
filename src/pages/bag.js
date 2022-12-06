import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import useSWR from 'swr';

import { Checkbox, Loading } from '@nextui-org/react';

import ItemBlock from '@/immediatesell/shoppingbag/ItemBlock';
import EmptyBag from '@/immediatesell/shoppingbag/EmptyBag';
import { formatCurrency } from '@/commoncomponents/functions';
import Alert from '@/commoncomponents/popups/Alert';
import Error from '@/commoncomponents/Error';
import Loader from '@/commoncomponents/Loader';

async function getItems() {
    const docRef = doc(db, 'bag', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().artworks;
    }
    return 0;
}
async function getArtworks() {
    let items = [];
    const list = await getItems();
    for (let i = 0; i < list.length; i++) {
        const item = await getDoc(doc(db, 'artworks', list[i]));
        if (item.exists()) {
            items.push({ id: item.id, ...item.data() });
        }
    }
    return items;
}

export default function Bag() {
    const router = useRouter();
    if (!auth.currentUser) {
        router.replace('/auth/login');
        return <Loader />;
    }
    const { data: items, error } = useSWR('bagItems', getArtworks, {
        refreshInterval: 1000,
    });
    const [selectedItems, setSelectedItems] = useState([]);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    });

    if (!items)
        return (
            <div className="grid h-screen place-content-center">
                <Loading />
            </div>
        );
    if (error) return <Error />;
    async function removeFromBag(itemId) {
        try {
            await updateDoc(doc(db, 'bag', auth.currentUser.uid), {
                artworks: arrayRemove(itemId),
            });
        } catch (error) {
            setAlert({
                type: 'error',
                message: 'There was an error while removing item from your bag',
            });
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
                                <span>
                                    <Link href="/profile/saves">
                                        Your Saves
                                    </Link>
                                </span>
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
                                <div className="flex justify-between border-t-2 pt-2">
                                    <h6 className="text-sm text-neutral-700 md:text-base">
                                        Shipping (5-7 Business Days)
                                    </h6>
                                    <p className="text-sm font-medium text-neutral-700 md:text-base">
                                        FREE
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <h6 className="text-sm text-neutral-700 md:text-base">
                                        TAX
                                    </h6>
                                    <p className="text-sm font-medium text-neutral-700 md:text-base">
                                        PKR 0.00
                                    </p>
                                </div>
                                <div className="flex justify-between border-b-2 pb-2">
                                    <h6 className="text-sm text-neutral-700 md:text-base">
                                        Subtotal
                                    </h6>
                                    <p className="text-sm font-medium text-neutral-700 md:text-base">
                                        {formatCurrency(getTotalPrice())}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <h6 className="text-lg font-medium text-black md:text-xl">
                                        Total
                                    </h6>
                                    <p className="text-lg font-medium text-black md:text-xl">
                                        {formatCurrency(getTotalPrice())}
                                    </p>
                                </div>
                                <button className="h-12 w-full rounded-sm border border-[#2D2D2D] bg-none text-base transition-all hover:bg-[#2D2D2D] hover:text-white">
                                    {selectedItems.length > 0 ? (
                                        <Link
                                            href={{
                                                pathname: '/checkout',
                                                query: selectedItems,
                                            }}
                                        >
                                            <a>Checkout Now</a>
                                        </Link>
                                    ) : (
                                        'Make a selection'
                                    )}
                                </button>
                                <button className="w-full text-center text-sm uppercase tracking-wide underline-offset-4 before:pr-2 before:content-['<'] hover:underline">
                                    <Link href="/artworks">
                                        Continue Shopping
                                    </Link>
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

Bag.title = 'Bag';
