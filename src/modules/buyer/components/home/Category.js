import useSWR from 'swr';

import { db } from '@/firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';

import Collection from '@/buyer/components/artwork/Collection';

import { Loading } from '@nextui-org/react';
import Error from '@/commoncomponents/Error';

function Category() {
    const { data: categories, error } = useSWR('collection', async () => {
        const docSnap = await getDoc(doc(db, 'categories', 'paintings'));
        const list = docSnap.data().list;
        return list;
    });
    if (error) {
        return <Error />;
    }
    if (!categories) {
        return (
            <div className="flex w-screen items-center justify-center py-20">
                <Loading />
            </div>
        );
    }

    return (
        <>
            <div className="w-full px-2 md:w-1/2 md:px-0">
                <h4 className="text-sm font-medium uppercase">
                    Our Collections
                </h4>
                <h1 className="mt-1 mb-3 font-garamond text-3xl font-semibold md:mt-2 md:mb-5 md:text-5xl">
                    Shop by Category
                </h1>
                <p className="w-full text-base md:w-3/4 md:text-lg">
                    Browse artworks by collection whether you're interested in
                    modern or classical, abstract or figurative, landscape or
                    still life, we've got you covered. It's easy to explore the
                    world of art
                </p>
            </div>

            <div className="h-full w-full px-2 md:w-1/2 md:px-0">
                <ul className="no-scrollbar flex snap-x snap-mandatory items-end gap-x-6 overflow-x-auto overflow-y-hidden transition-all delay-75 duration-500 ease-in-out">
                    {categories.map((category) => {
                        return (
                            <li key={Date.now() + Math.random() * 100}>
                                <Collection category={category} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export default Category;
