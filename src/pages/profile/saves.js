import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import useSWR from 'swr';

import SettingsLayout from '@/layouts/SettingsLayout';
import { formatCurrency } from '@/commoncomponents/functions';

import Error from '@/commoncomponents/Error';

async function getItems() {
    const docRef = doc(db, 'saves', auth.currentUser.uid);
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

function Saves() {
    const { data: items, error } = useSWR('saves', getArtworks);
    if (error) {
        return <Error />;
    }
    return (
        <>
            <Head>
                <title>Save Artworks</title>
            </Head>
            <section>
                <h3 className="py-10 text-center text-xl font-medium md:text-4xl">
                    Your Saves
                </h3>
                <div className="mx-auto w-full space-y-5 pb-6 md:w-[600px]">
                    {items ? (
                        items.map((item) => (
                            <Link
                                href={`/artworks${
                                    item.type === 'auction'
                                        ? '/auction'
                                        : '/immediate'
                                }/${item.id}`}
                                key={item.id}
                            >
                                <div className="flex w-full cursor-pointer flex-col items-start justify-start space-y-4 rounded-md border p-4 hover:bg-gray-50 md:mt-0 md:h-36 md:flex-row  md:items-center md:space-x-5">
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
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center">No Saves</p>
                    )}
                </div>
            </section>
        </>
    );
}

Saves.Layout = SettingsLayout;

export default Saves;
