import { useState } from 'react';

import Head from 'next/head';

import { db } from '@/firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';

import List from '@/icons/List';
import Grid from '@/icons/Grid';

import Collection from '@/buyer/components/artwork/Collection';
import Error from '@/commoncomponents/Error';

export default function ArtworkCollection({ list, hasError }) {
    if (hasError) {
        return <Error />;
    }
    const [display, setDisplay] = useState('grid');
    return (
        <>
            <Head>
                <title>Collections</title>
            </Head>
            <section className="container space-y-4 px-5 py-5 md:mx-auto md:px-0 ">
                <h2 className="py-4 text-center font-garamond text-3xl font-semibold  md:text-4xl">
                    Explore Collections
                </h2>
                <div className="mx-auto w-fit space-x-3">
                    <button
                        onClick={() => setDisplay('list')}
                        className="rounded border border-neutral-500 px-2 py-2 text-neutral-500 transition delay-100 duration-300 hover:border-neutral-700 hover:text-neutral-700 focus:border-neutral-900 focus:text-neutral-900"
                    >
                        <List
                            className="h-6 w-6 text-current"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        />
                    </button>
                    <button
                        onClick={() => setDisplay('grid')}
                        className="rounded border border-neutral-500 px-2 py-2 text-neutral-500 transition delay-100 duration-300 hover:border-neutral-700 hover:text-neutral-700 focus:border-neutral-900 focus:text-neutral-900"
                    >
                        <Grid
                            className="h-6 w-6 text-current"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        />
                    </button>
                </div>
                <div>
                    {display === 'list' ? (
                        <CollectionList list={list} />
                    ) : (
                        <CollectionGrid list={list} />
                    )}
                </div>
            </section>
        </>
    );
}

function CollectionList({ list }) {
    return (
        <ul className="sm:colums-2 my-6 mx-auto w-3/4 columns-1 text-gray-700 md:columns-3">
            {list.map((collection) => (
                <li
                    key={Date.now() + Math.random()}
                    className="w-fit cursor-pointer border-gray-700 text-lg font-medium uppercase underline-offset-4 transition-all delay-300 visited:text-blue-500 hover:underline"
                >
                    {collection}
                </li>
            ))}
        </ul>
    );
}

function CollectionGrid({ list }) {
    return (
        <>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {list.map((category) => (
                    <Collection category={category} />
                ))}
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const docSnap = await getDoc(doc(db, 'categories', 'paintings'));
    const list = docSnap.data().list;
    if (list === undefined || list.length === 0) {
        return {
            props: { hasError: true },
        };
    }
    return {
        props: {
            list,
        },
    };
}
