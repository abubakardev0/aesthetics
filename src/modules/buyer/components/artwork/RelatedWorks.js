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
import { Loading } from '@nextui-org/react';
import Error from '@/commoncomponents/Error';

function RelatedWorks({ artist, artworkId }) {
    const { data: items, error } = useSWR('new-uploaded-artworks', async () => {
        const list = [];
        const docSnap = await getDocs(
            query(
                collection(db, 'artworks'),
                where('status', '==', 'listed'),
                where('artist', '==', artist),
                orderBy('uploadedAt', 'desc'),
                limit(8)
            )
        );
        docSnap.forEach((eachDoc) => {
            if (eachDoc.exists) {
                if (eachDoc.id !== artworkId)
                    list.push({ id: eachDoc.id, ...eachDoc.data() });
            }
        });
        return list;
    });
    if (!items) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loading />
            </div>
        );
    }
    if (error) {
        return <Error />;
    }
    return (
        <>
            <div className="my-8 text-center md:my-12">
                <p className="text-sm font-medium uppercase md:text-base">
                    Love what you like
                </p>
                <h2 className="mt-1 mb-6 font-garamond text-2xl font-semibold capitalize md:text-4xl">
                    Related Artworks
                </h2>
            </div>
            <Carousel list={items} />
        </>
    );
}

export default RelatedWorks;
