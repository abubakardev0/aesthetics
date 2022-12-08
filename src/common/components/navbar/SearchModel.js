import { useRef, useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { db } from '@/firebase/firebase-config';
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
} from 'firebase/firestore';

import { motion } from 'framer-motion';

import { useDebounce } from '@/hooks/useDebounce';
import Plus from '@/icons/Plus';
import Search from '@/icons/Search';

function SearchModel(props) {
    const [searchQuery, setQuery] = useState('');
    const [searchResult, setResult] = useState(null);
    const [error, setError] = useState(false);
    const debouncedSearch = useDebounce(searchQuery, 500);
    const ref = useRef(null);

    const searchItems = async () => {
        let result = [];
        const fieldValue = ref.current.value;
        try {
            const documents = await getDocs(
                query(
                    collection(db, 'artworks'),
                    where(
                        `${fieldValue}`,
                        '>=',
                        `${searchQuery.toLowerCase()}`
                    ),
                    where(
                        `${fieldValue}`,
                        '<=',
                        `${searchQuery.toLowerCase()}\uf8ff`
                    ),
                    where('status', '==', 'listed'),
                    orderBy(`${fieldValue}`),
                    limit(5)
                )
            );
            documents.forEach((document) => {
                result.push({
                    id: document.id,
                    title: document.data().title,
                    image: document.data().images[0],
                    artist: document.data().artist,
                    type: document.data().type,
                });
            });
            setResult(result);
        } catch (error) {
            setError(true);
        }
    };

    useEffect(() => {
        if (debouncedSearch) {
            searchItems();
        }
    }, [debouncedSearch]);

    return (
        <motion.div
            initial={{ x: '-100', opacity: 0.5 }}
            animate={{
                x: '0',
                opacity: 1,
                transition: {
                    duration: 0.1,
                    type: 'spring',
                    damping: 25,
                    stiffness: 500,
                },
            }}
            className={`fixed top-0 right-0 left-0 z-50 h-screen w-screen bg-slate-500/25 transition-all duration-500 ease-in-out`}
        >
            <div className="flex h-14 w-full flex-col items-center bg-[#010101] md:h-20">
                <div className="relative mx-auto my-auto w-full md:w-1/2">
                    <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center space-x-2 md:left-0">
                        <button type="submit">
                            <Search className="h-6 w-6" stroke="white" />
                        </button>
                    </div>
                    <div className="absolute inset-y-0 left-5 flex w-24 items-center px-3 md:w-28 lg:w-32">
                        <select
                            ref={ref}
                            className="block w-full border-none bg-black px-2 py-2 text-sm font-[500] text-gray-300 focus:ring-0"
                        >
                            <option value="title">Title</option>
                            <option value="artist">Artist</option>
                            <option value="category">Category</option>
                        </select>
                    </div>
                    <div className="absolute inset-y-0 right-2 flex items-center pr-3 md:right-0">
                        <button
                            onClick={() => {
                                props.openSearchModel(false);
                            }}
                        >
                            <Plus
                                className="h-6 w-6 rotate-45"
                                stroke="white"
                            />
                        </button>
                    </div>
                    <input
                        autocomplete="off"
                        type="text"
                        id="search"
                        onChange={(e) => setQuery(e.target.value)}
                        className="block w-full appearance-none bg-[#010101] p-2.5 pl-28 text-base text-white shadow-slate-700 focus:outline-none md:pl-36"
                        placeholder="Search artworks"
                    />
                </div>
            </div>

            {searchResult && (
                <div className="min-h-48 relative mx-auto w-full rounded-b-2xl border-b bg-white py-4 px-3 shadow sm:w-5/6 sm:py-8 md:w-1/2">
                    <div className="space-y-1">
                        {searchResult.length > 0 ? (
                            <>
                                <h6 className="pl-3 font-medium text-gray-600">
                                    Search Results:
                                </h6>
                                {searchResult.map((result) => {
                                    return (
                                        <Link
                                            href={`/artworks${
                                                result.type === 'auction'
                                                    ? '/auction'
                                                    : '/immediate'
                                            }/${result.id}`}
                                            key={result.id}
                                        >
                                            <a className="flex h-16 w-full items-center space-x-4 rounded py-2 pl-3 hover:bg-blue-200/50">
                                                <Item
                                                    title={result.title}
                                                    image={result.image}
                                                    artist={result.artist}
                                                />
                                            </a>
                                        </Link>
                                    );
                                })}
                            </>
                        ) : (
                            <p className="text-center">No Result</p>
                        )}
                        {error ? 'Unable to search' : null}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
export default SearchModel;

function Item(props) {
    return (
        <>
            <div className="relative h-10 w-10 md:h-12 md:w-12">
                <Image
                    src={props.image}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                />
            </div>
            <div>
                <h6 className="text-base font-medium capitalize leading-none tracking-wide md:text-lg">
                    {props.title}
                </h6>
                <p className="text-sm md:text-base">
                    by <span className="capitalize">{props.artist}</span>
                </p>
            </div>
        </>
    );
}
