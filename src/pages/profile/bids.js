import Image from 'next/image';
import Link from 'next/link';

import {
    collection,
    query,
    getDocs,
    orderBy,
    where,
    limit,
} from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import useSWR from 'swr';

import { Loading, Tooltip } from '@nextui-org/react';

import { useCountDown } from '@/hooks/useCountDown';
import SettingsLayout from '@/layouts/SettingsLayout';
import { formatCurrency } from '@/commoncomponents/functions';
import Error from '@/commoncomponents/Error';

function Bids() {
    const { data: bids, error } = useSWR('bids', async () => {
        let bids = [];
        const auctionDocs = [];
        const docSnap = await getDocs(
            query(
                collection(db, 'artworks'),
                where('type', '==', 'auction'),
                where('totalBids', '>', 0)
            )
        );
        docSnap.forEach((doc) => {
            auctionDocs.push({
                artworkId: doc.id,
                image: doc.data().images[0],
                currentBid: doc.data().currentBid,
                endingTime: doc.data().endingTime,
            });
        });
        for (let i = 0; i < auctionDocs.length; i++) {
            const childRef = query(
                collection(
                    db,
                    'artworks',
                    `${auctionDocs[i].artworkId}`,
                    'bids'
                ),
                where('user', '==', `${auth.currentUser.uid}`),
                orderBy('value', 'desc'),
                limit(1)
            );
            const querySnapshot = await getDocs(childRef);
            querySnapshot.forEach((childDoc) => {
                bids.push({
                    id: childDoc.id,
                    ...auctionDocs[i],
                    ...childDoc.data(),
                });
            });
        }
        return bids;
    });

    if (error) {
        return <Error />;
    }
    if (!bids) {
        return (
            <div className="grid h-screen place-content-center">
                <Loading />
            </div>
        );
    }
    if (bids.length === 0) {
        return <p className="grid h-screen place-content-center">No Bids</p>;
    }

    return (
        <>
            <div className="grid h-screen place-content-center">
                <h3 className="my-5 text-center text-xl font-medium md:text-2xl">
                    Your Bids
                </h3>
                <ul className="h-[500px] w-full space-y-4 overflow-auto">
                    {bids.map((data) => {
                        return <Bid key={data.id} data={data} />;
                    })}
                </ul>
            </div>
        </>
    );
}

export default Bids;
Bids.title = 'Your Bids';
Bids.Layout = SettingsLayout;

function Bid({ data }) {
    const time = useCountDown(data.endingTime.seconds);
    const handleBidCancellation = async () => {
        if (data.value === data.currentBid) {
            alert('Highest Bidder');
        }
        const ref = query(
            collection(db, 'artworks', `${data.artworkId}`, 'bids'),
            where('user', '==', auth.currentUser.uid),
            limit(1)
        );
        const docs = await getDocs(ref);
        docs.forEach((doc) => {
            alert({ id: doc.id, ...doc.data() });
        });
    };
    return (
        <li className="relative">
            <Link href={`/artworks/auction/${data.artworkId}`}>
                <a className="flex h-32 w-full cursor-pointer items-end space-x-2 border-b py-2.5 pr-10 hover:bg-gray-50 md:h-36 md:w-[500px] md:items-center md:rounded-lg md:border md:px-4">
                    <div className="h-24 w-20 overflow-hidden md:h-32 md:w-28">
                        <Image
                            src={data.image}
                            height={250}
                            width={200}
                            className="object-cover"
                        />
                    </div>
                    <div className="mt-2 leading-3">
                        <p>
                            <span className="mr-1 font-medium">
                                Current Bid:
                            </span>
                            {formatCurrency(data.currentBid)}
                        </p>
                        <p>
                            <span className="mr-1 font-medium">Your Bid:</span>
                            {formatCurrency(data.value)}
                        </p>
                        <p>
                            <span className="mr-1 font-medium">Bid At:</span>
                            {new Date(data.time.seconds * 1000).toDateString()}
                        </p>
                    </div>
                </a>
            </Link>
            {time >= 0 ? (
                <div className="absolute top-2 right-1 flex flex-row gap-2 md:flex-col">
                    <span className="rounded-full bg-green-100 px-4 py-[2px] text-sm text-green-500">
                        Listed
                    </span>
                    <button
                        onClick={handleBidCancellation}
                        className="rounded-full bg-red-100 px-4 py-[2px] text-sm text-red-500"
                    >
                        <Tooltip content="Cancel Bid" color="invert">
                            Cancel
                        </Tooltip>
                    </button>
                </div>
            ) : (
                <span className="absolute top-0 right-0 rounded-full bg-red-100 px-4 py-[2px] text-sm text-red-500 md:right-2 md:top-2">
                    Auction Ends
                </span>
            )}
        </li>
    );
}
