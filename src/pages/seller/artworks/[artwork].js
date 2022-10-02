import { useState } from 'react';
import Head from 'next/head';

import { db } from '@/firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';

import SellerLayout from '@/layouts/SellerLayout';

import Overview from '@/seller/components/artwork/Overview';
// import EditDetails from '@/seller/components/artwork/EditDetails';
import ViewBids from '@/seller/components/artwork/ViewBids';

function Artwork({ artwork }) {
    const [mode, setMode] = useState('overview');
    const data = JSON.parse(artwork);
    return (
        <>
            <Head>
                <title>{data.title.toUpperCase()}</title>
            </Head>
            <section className="space-y-10 px-8">
                <ul className="flex border-b-2 border-gray-200 text-sm font-medium text-gray-500">
                    <li
                        onClick={() => setMode('overview')}
                        className={`${
                            mode === 'overview' ? ' bg-gray-200' : 'bg-none'
                        } mb-0 cursor-pointer rounded-t-lg px-3 py-2.5 text-gray-800`}
                    >
                        Overview
                    </li>
                    {/* <li
                        onClick={() => setMode('edit')}
                        className={`${
                            mode === 'edit' ? ' bg-gray-200' : 'bg-none'
                        } mb-0 cursor-pointer rounded-t-lg px-3 py-2.5 text-gray-800`}
                    >
                        Edit Details
                    </li> */}
                    {data.type === 'auction' && (
                        <li
                            onClick={() => setMode('bids')}
                            className={`${
                                mode === 'bids' ? ' bg-gray-200' : 'bg-none'
                            } mb-0 cursor-pointer rounded-t-lg px-3 py-2.5 text-gray-800`}
                        >
                            View Bids
                        </li>
                    )}
                </ul>
                {mode === 'overview' && <Overview data={data} />}
                {/* {mode === 'edit' && (
                    <EditDetails
                        title={data.title}
                        price={data.price}
                        description={data.description}
                    />
                )} */}
                {mode === 'bids' && (
                    <ViewBids
                        id={data.id}
                        totalBids={data.totalBids}
                        startingBid={data.startingBid}
                        currentBid={data.currentBid}
                        estimate={data.price}
                    />
                )}
            </section>
        </>
    );
}

Artwork.Layout = SellerLayout;
export default Artwork;

export async function getServerSideProps({
    params = { id: artwork.id.toString() },
}) {
    const id = params.artwork;
    const data = await getDoc(doc(db, 'artworks', id));
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
