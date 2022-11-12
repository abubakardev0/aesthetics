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

function NewWorks() {
    const { data: items, error } = useSWR('new-uploaded-artworks', async () => {
        const list = [];
        const docSnap = await getDocs(
            query(
                collection(db, 'artworks'),
                where('status', '==', 'listed'),
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
        return <p>Error fetching data!</p>;
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
            <div className="my-8 text-center md:my-12">
                <p className="text-sm font-medium uppercase md:text-base">
                    epitome of creativity
                </p>
                <h2 className="mt-2 font-garamond text-2xl font-semibold md:text-4xl ">
                    See Latest Works
                </h2>
            </div>
            <Carousel list={items} />
        </>
    );
}

export default NewWorks;
