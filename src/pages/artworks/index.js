import { useState, useRef } from 'react';

import Head from 'next/head';

import {
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    startAfter,
    Timestamp,
    where,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';

import { Loading, Collapse, Input } from '@nextui-org/react';

import useSWR from 'swr';

import Plus from '@/icons/Plus';
import Modal from '@/commoncomponents/modal/Modal';
import Page from '@/buyer/components/artwork/Page';
import Error from '@/commoncomponents/Error';

import {
    priceFilterQuery,
    artistFilterQuery,
    typeFilterQuery,
    categoryFilterQuery,
} from '../../common/queries';

const LIMIT = 12;

function Artworks({ artworks, hasError }) {
    if (hasError) {
        return <Error />;
    }
    const { data: list, error } = useSWR('collection', async () => {
        const docSnap = await getDoc(doc(db, 'categories', 'paintings'));
        const list = docSnap.data().list;
        return list;
    });
    const [posts, setPosts] = useState(JSON.parse(artworks));
    const [loading, setLoading] = useState(false);
    const [postsEnd, setPostsEnd] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const filterRef = useRef(null);
    const minRef = useRef(null);
    const maxRef = useRef(null);

    const getMorePosts = async () => {
        setLoading(true);
        const last = posts[posts.length - 1];
        const data = [];
        const cursor =
            typeof last.uploadedAt === 'number'
                ? Timestamp.fromMillis(last.uploadedAt)
                : last.uploadedAt;

        const q = query(
            collection(db, 'artworks'),
            where('status', '==', 'listed'),
            orderBy('uploadedAt', 'desc'),
            startAfter(cursor),
            limit(LIMIT)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const {
                artist,
                title,
                images,
                dimensions,
                price,
                mediums,
                surfaces,
                uploadedAt,
                type,
            } = doc.data();
            data.push({
                id: doc.id,
                artist,
                title,
                mediums,
                surfaces,
                images,
                dimensions,
                price,
                type,
                uploadedAt: uploadedAt.toMillis() || 0,
            });
        });

        setPosts(posts.concat(data));
        setLoading(false);

        if (data.length < LIMIT) {
            setPostsEnd(true);
        }
    };
    function filterPrice() {
        const min = parseInt(minRef.current?.value);
        const max = parseInt(maxRef.current?.value);
        const query = priceFilterQuery(min, max);
        filter(query);
    }
    function filterArtist(name) {
        const query = artistFilterQuery(name);
        filter(query);
    }
    function filterType(type) {
        const query = typeFilterQuery(type);
        filter(query);
    }
    function filterCategory(category) {
        console.log(category);
        const query = categoryFilterQuery(category);
        filter(query);
    }
    async function filter(q) {
        filterRef.current.handler();
        const data = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const {
                artist,
                title,
                images,
                dimensions,
                price,
                mediums,
                surfaces,
                type,
                uploadedAt,
            } = doc.data();
            data.push({
                id: doc.id,
                artist,
                title,
                mediums,
                surfaces,
                images,
                dimensions,
                price,
                type,
                uploadedAt: uploadedAt.toMillis() || 0,
            });
        });
        setPosts(data);

        if (data.length > 0) {
            setPostsEnd(true);
        } else {
            setNotFound(true);
        }
    }

    return (
        <div>
            <Head>
                <title>Artworks</title>
            </Head>
            <h2 className="py-4 text-center font-garamond text-3xl font-medium md:py-8 md:text-5xl">
                Explore Artworks
            </h2>
            <main className="relative">
                <Page posts={posts} />
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2  transform md:-bottom-3">
                    <button
                        onClick={getMorePosts}
                        className={
                            notFound || postsEnd
                                ? 'hidden'
                                : 'rounded-md border-2 px-5 py-2.5 text-center hover:bg-gray-50 focus:border-gray-100 focus:bg-gray-100'
                        }
                    >
                        {loading ? (
                            <Loading
                                type="points"
                                color="currentColor"
                                size="sm"
                            />
                        ) : (
                            'Load More'
                        )}
                    </button>

                    {postsEnd && (
                        <span className="w-full text-xs font-medium md:text-lg">
                            You have reached the end!
                        </span>
                    )}
                </div>
            </main>
            <div className="sticky bottom-[72px] my-6 flex w-full flex-col items-end justify-end pr-3 md:bottom-8 md:items-center md:justify-center md:pr-0">
                <Modal ref={filterRef}>
                    <div className="absolute bottom-10 mb-3 h-fit w-56 rounded-md border-2 border-gray-100 bg-white px-2 drop-shadow-lg transition delay-200 duration-1000 md:w-64">
                        <Collapse.Group width="100%">
                            <Collapse title="Price">
                                <div className="flex justify-between space-x-3">
                                    <Input
                                        ref={minRef}
                                        clearable
                                        label="Min"
                                        placeholder="0"
                                        animated={false}
                                    />
                                    <Input
                                        ref={maxRef}
                                        clearable
                                        label="Max"
                                        placeholder="9999999"
                                        animated={false}
                                    />
                                </div>
                                <button
                                    onClick={filterPrice}
                                    className="mt-2 w-full rounded-md bg-neutral-800 py-2 text-center text-white hover:bg-neutral-700 focus:bg-neutral-900"
                                >
                                    Filter Results
                                </button>
                            </Collapse>
                            <Collapse title="Category">
                                <ul className="list-inside list-disc">
                                    {error && 'Couldnot load list'}
                                    {list &&
                                        list.map((category) => {
                                            return (
                                                <li
                                                    key={
                                                        Date.now() +
                                                        Math.random()
                                                    }
                                                    className="cursor-pointer capitalize hover:underline"
                                                    onClick={() => {
                                                        filterCategory(
                                                            category
                                                        );
                                                    }}
                                                >
                                                    {category}
                                                </li>
                                            );
                                        })}
                                </ul>
                            </Collapse>
                            <Collapse title="Type">
                                <ul className="list-inside list-disc">
                                    <li
                                        className="cursor-pointer hover:underline"
                                        onClick={() => {
                                            filterType('immediate');
                                        }}
                                    >
                                        Immediate Buy
                                    </li>
                                    <li
                                        className="cursor-pointer hover:underline"
                                        onClick={() => {
                                            filterType('auction');
                                        }}
                                    >
                                        Auction
                                    </li>
                                </ul>
                            </Collapse>
                        </Collapse.Group>
                    </div>
                </Modal>
                <button
                    onClick={() => filterRef.current.handler()}
                    className="flex w-fit items-center justify-between rounded-full bg-black p-3 text-lg text-white md:w-64 md:rounded md:py-2 md:px-4"
                >
                    <span className="hidden md:block">Filter</span>
                    <Plus className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

export default Artworks;

export async function getServerSideProps() {
    const data = [];
    const q = query(
        collection(db, 'artworks'),
        where('status', '==', 'listed'),
        orderBy('uploadedAt', 'desc'),
        limit(LIMIT)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const {
            artist,
            title,
            images,
            dimensions,
            price,
            mediums,
            surfaces,
            uploadedAt,
            type,
        } = doc.data();
        data.push({
            id: doc.id,
            artist,
            title,
            mediums,
            surfaces,
            images,
            dimensions,
            price,
            type,
            uploadedAt: uploadedAt.toMillis() || 0,
        });
    });
    if (!data || data.length === 0) {
        return {
            props: { hasError: true },
        };
    }
    return {
        props: {
            artworks: JSON.stringify(data),
        },
    };
}
