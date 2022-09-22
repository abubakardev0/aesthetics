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

function RelatedWorks({ category }) {
    const { data: items, error } = useSWR('new-uploaded-artworks', async () => {
        const list = [];
        const docSnap = await getDocs(
            query(
                collection(db, 'artworks'),
                where('status', '==', 'listed'),
                where('category', '==', `still life`),
                orderBy('uploadedAt', 'desc'),
                limit(6)
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
    return (
        <>
            <div className="my-12 text-center">
                <h4 className="text-sm font-medium uppercase md:text-base">
                    Love what you like
                </h4>
                <h2 className="mt-1 mb-6 font-garamond text-2xl font-semibold capitalize md:text-4xl">
                    Related Artworks
                </h2>
            </div>
            {items && <Carousel list={items} />}
        </>
    );
}

export default RelatedWorks;
