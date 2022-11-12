import useSWR from 'swr';

import { db } from '@/firebase/firebase-config';
import {
    getDocs,
    collection,
    orderBy,
    limit,
    where,
    query,
} from 'firebase/firestore';

import Carousel from '@/commoncomponents/Scrollers/Carousel';
import Error from '@/commoncomponents/Error';
import { Loading } from '@nextui-org/react';

function Trending() {
    const { data: items, error } = useSWR('new-uploaded-artworks', async () => {
        const list = [];
        const docSnap = await getDocs(
            query(
                collection(db, 'artworks'),
                where('status', '==', 'listed'),
                where('type', '==', 'auction'),
                orderBy('uploadedAt', 'desc'),
                limit(8)
            )
        );
        docSnap.forEach((eachDoc) => {
            if (eachDoc.exists) {
                list.push({ id: eachDoc.id, ...eachDoc.data() });
            }
        });
        return list;
    });
    if (error) {
        return <Error />;
    }
    if (!items) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loading />
            </div>
        );
    }
    return (
        <>
            <div className="my-8 text-center md:mt-12">
                <p className="text-sm font-medium uppercase md:text-base">
                    Bid It To Win It
                </p>
                <h2 className="mt-2 font-garamond text-2xl font-semibold md:text-4xl ">
                    Auction Lots
                </h2>
            </div>
            <Carousel list={items} />
        </>
    );
}

export default Trending;
