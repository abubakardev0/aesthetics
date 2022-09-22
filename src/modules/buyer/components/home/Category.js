import Image from 'next/image';
import { useRouter } from 'next/router';

import useSWR from 'swr';

import { db } from '@/firebase/firebase-config';

import { doc, getDoc } from 'firebase/firestore';
import { myLoader } from '@/commoncomponents/functions';

import Arrow from '@/icons/Arrow';

function Category() {
    const { data: categories, error } = useSWR('collection', async () => {
        const docSnap = await getDoc(doc(db, 'categories', 'paintings'));
        const list = docSnap.data().list;
        return list;
    });
    const router = useRouter();
    const handleClick = ({ category }) => {
        router.push(`/collection/${category}`);
    };
    return (
        <>
            <div className="w-full md:w-1/2">
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
                    <button className="hidden rounded-full border p-3 text-neutral-700 transition-all duration-300 ease-in-out hover:bg-neutral-50 active:bg-neutral-600 active:text-white active:ring-8 active:ring-neutral-200 disabled:cursor-not-allowed disabled:opacity-25 md:block">
                        <Arrow className="h-8 w-8 rotate-180" />
                    </button>
                    <button className="hidden rounded-full border p-3 text-neutral-700 transition-all duration-300 ease-in-out hover:bg-neutral-50 active:bg-neutral-600 active:text-white active:ring-8 active:ring-neutral-200 disabled:cursor-not-allowed disabled:opacity-25 md:block">
                        <Arrow className="h-8 w-8" />
                    </button>
                </div>
            </div>

            <div className="h-full w-full md:w-1/2">
                <ul className="no-scrollbar flex snap-x snap-mandatory items-end gap-x-6 overflow-x-auto overflow-y-hidden ease-in-out">
                    {categories &&
                        categories.map((category) => {
                            return (
                                <li key={Date.now() + Math.random() * 100}>
                                    <div className="group relative h-[400px] w-[250px] snap-center overflow-hidden drop-shadow-md md:h-[500px] md:w-[300px]">
                                        <Image
                                            src={myLoader(category)}
                                            layout="fill"
                                            className="absolute object-cover transition-all delay-75 duration-1000 ease-in-out"
                                        />
                                        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-gray-400/10 via-black/10 to-gray-400/10 backdrop-blur-[0.6px]">
                                            <button
                                                onClick={() =>
                                                    handleClick(category)
                                                }
                                                className="absolute bottom-8 left-8 rounded-full border-[3px] border-gray-100 px-4 py-2 text-lg font-medium capitalize text-gray-100 delay-100 duration-300 ease-in-out hover:bg-gray-100 hover:text-black"
                                            >
                                                Explore {category}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </>
    );
}

export default Category;
