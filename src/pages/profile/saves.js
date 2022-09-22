import useSWR from 'swr';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SettingsLayout from '@/layouts/SettingsLayout';

import Card from '@/buyer/components/artwork/Card';

import Loader from '@/commoncomponents/Loader';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

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
    const router = useRouter();
    const { data: items, error } = useSWR('saves', getArtworks);
    if (error) {
        return <h1>Error Occured!</h1>;
    }
    if (!auth.currentUser) {
        router.replace('/auth/login');
        return <Loader />;
    }

    return (
        <>
            <Head>
                <title>Save Artworks</title>
            </Head>
            <section>
                <h3 className="py-10 text-center text-xl font-medium md:text-4xl">
                    Save Artworks
                </h3>
                <div className="flex h-full w-full flex-wrap items-start justify-start gap-3 p-2 md:gap-6 md:pl-64">
                    {items &&
                        items.map((item) => (
                            <Link href={`/artworks/${item.id}`} key={item.id}>
                                <a>
                                    <Card
                                        image={item.images[0]}
                                        artist={item.artist}
                                        title={item.title}
                                        height={item.dimensions.height}
                                        width={item.dimensions.width}
                                        mediums={item.mediums}
                                        surfaces={item.surfaces}
                                        unit={item.dimensions.unit}
                                        price={item.price}
                                    />
                                </a>
                            </Link>
                        ))}
                </div>
            </section>
        </>
    );
}

Saves.Layout = SettingsLayout;

export default Saves;
