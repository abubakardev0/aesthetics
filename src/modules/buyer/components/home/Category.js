import { useState, useRef, useEffect } from 'react';

import { useRouter } from 'next/router';

import useSWR from 'swr';

import { db } from '@/firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';

import Collection from '@/buyer/components/artwork/Collection';

import Arrow from '@/icons/Arrow';

function Category() {
    const { data: categories, error } = useSWR('collection', async () => {
        const docSnap = await getDoc(doc(db, 'categories', 'paintings'));
        const list = docSnap.data().list;
        return list;
    });
    const maxScrollWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carousel = useRef(null);
    const router = useRouter();
    useEffect(() => {
        if (carousel !== null && carousel.current !== null) {
            carousel.current.scrollLeft =
                carousel.current.offsetWidth * currentIndex;
        }
    }, [currentIndex]);

    useEffect(() => {
        maxScrollWidth.current = carousel.current
            ? carousel.current.scrollWidth - carousel.current.offsetWidth
            : 0;
    }, []);

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevState) => prevState - 1);
        }
    };
    const next = () => {
        if (
            carousel.current !== null &&
            carousel.current.offsetWidth * currentIndex <=
                maxScrollWidth.current
        ) {
            setCurrentIndex((prevState) => prevState + 1);
        }
    };
    const isDisabled = (direction) => {
        if (direction === 'prev') {
            return currentIndex <= 0;
        }

        if (direction === 'next' && carousel.current !== null) {
            return (
                carousel.current.offsetWidth * currentIndex >=
                maxScrollWidth.current
            );
        }

        return false;
    };
    const handleClick = ({ category }) => {
        router.push(`/collection/${category}`);
    };
    return (
        <>
            <div className="w-full px-2 md:w-1/2 md:px-0">
                <h4 className="m text-sm font-medium uppercase">
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
                <div className="mt-4 inline-flex gap-x-2">
                    <button
                        onClick={prev}
                        className="hidden rounded-full border p-3 text-neutral-700 transition-all duration-300 ease-in-out hover:bg-neutral-50 active:bg-neutral-600 active:text-white active:ring-8 active:ring-neutral-200 disabled:cursor-not-allowed disabled:opacity-25 md:block"
                    >
                        <Arrow className="h-8 w-8 rotate-180" />
                    </button>
                    <button
                        onClick={next}
                        className="hidden rounded-full border p-3 text-neutral-700 transition-all duration-300 ease-in-out hover:bg-neutral-50 active:bg-neutral-600 active:text-white active:ring-8 active:ring-neutral-200 disabled:cursor-not-allowed disabled:opacity-25 md:block"
                    >
                        <Arrow className="h-8 w-8" />
                    </button>
                </div>
            </div>

            <div className="h-full w-full px-2 md:w-1/2 md:px-0">
                <ul
                    ref={carousel}
                    className="no-scrollbar flex snap-x snap-mandatory items-end gap-x-6 overflow-x-auto overflow-y-hidden ease-in-out"
                >
                    {categories &&
                        categories.map((category) => {
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
