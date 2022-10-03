import Link from 'next/link';
import Image from 'next/image';

import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import useSWR from 'swr';

import { Loading } from '@nextui-org/react';

import SettingsLayout from '@/layouts/SettingsLayout';
import { formatCurrency } from '@/commoncomponents/functions';

import Error from '@/commoncomponents/Error';

async function getItems() {
    const docRef = doc(db, 'saves', auth.currentUser.uid);
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
        if (item) {
            items.push({ id: item.id, ...item.data() });
        }
    }
    return items;
}

function Saves() {
    const { data: items, error } = useSWR('saves', getArtworks);
    if (error) {
        return <Error />;
    }
    if (!items) {
        return (
            <div className="grid h-screen place-content-center">
                <Loading />
            </div>
        );
    }
    if (items.length === 0) {
        return (
            <div className="grid h-screen place-content-center gap-y-4 text-center">
                <p>No Saves</p>
                <Link href="/artworks">
                    <a className="h-fit w-fit border-2 border-black px-4 py-2 text-sm transition duration-200 hover:bg-black hover:text-white sm:text-sm md:text-base">
                        Explore Artworks
                    </a>
                </Link>
            </div>
        );
    }
    return (
        <>
            <section>
                <h3 className="py-10 text-center text-xl font-medium md:text-4xl">
                    Your Saves
                </h3>
                <ul className="mx-auto w-full space-y-5 pb-6 md:w-[600px]">
                    {items.map((item) => (
                        <Item key={item.id} item={item} />
                    ))}
                </ul>
            </section>
        </>
    );
}
Saves.title = 'Your Saves';
Saves.Layout = SettingsLayout;

export default Saves;

function Item({ item }) {
    return (
        <li>
            <Link
                href={`/artworks${
                    item.type === 'auction' ? '/auction' : '/immediate'
                }/${item.id}`}
            >
                <a className="flex w-full cursor-pointer flex-col items-start justify-start space-y-4 rounded-md border p-4 hover:bg-gray-50 md:mt-0 md:h-36 md:flex-row  md:items-center md:space-x-5">
                    <div className="relative h-full w-full md:w-40">
                        <Image
                            src={item.images[0]}
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            priority
                        />
                    </div>
                    <div className="flex w-full flex-col items-start justify-between space-y-4 pb-5 md:flex-row md:justify-between md:space-y-0">
                        <div className="flex w-full flex-col leading-loose">
                            <h3 className="text-2xl font-medium capitalize text-gray-800">
                                {item.title}
                            </h3>
                            <p className="text-base capitalize text-gray-700">
                                by {item.artist}
                            </p>
                        </div>
                        <p className="text-xl font-medium">
                            {formatCurrency(item.price)}
                        </p>
                    </div>
                </a>
            </Link>
        </li>
    );
}
