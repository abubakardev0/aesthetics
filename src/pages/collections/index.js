import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';

import { db } from '@/firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';

import List from '@/icons/List';
import Grid from '@/icons/Grid';

import { myLoader } from '@/commoncomponents/functions';

function Collection({ list, hasError }) {
    if (hasError) {
        return <p>Not found</p>;
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

export default Collection;

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
            <div className="flex flex-wrap justify-center gap-6">
                {list.map((category) => (
                    <div
                        key={Date.now() + Math.random()}
                        className="relative h-56 w-48 snap-center snap-normal overflow-hidden md:h-80 md:w-72 lg:h-[400px] lg:w-80"
                    >
                        <Image
                            src={myLoader(category)}
                            height={500}
                            width={400}
                            className="bg-gradient-to-t from-neutral-800 via-neutral-200/10 to-neutral-300/10 object-cover"
                        />
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-gray-400/10 via-black/10 to-gray-400/10 backdrop-blur-[0.6px]">
                            <button className="absolute bottom-8 left-8 rounded-full border-[3px] border-gray-100 px-4 py-2 text-lg font-medium capitalize text-gray-100 delay-100 duration-300 ease-in-out hover:bg-gray-100 hover:text-black">
                                Explore {category}
                            </button>
                        </div>
                    </div>
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
