import { useRef, useState } from 'react';

import { motion } from 'framer-motion';

import Plus from '@/icons/Plus';
import Search from '@/icons/Search';

import Image from 'next/image';

import { db } from '@/firebase/firebase-config';
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
} from 'firebase/firestore';

import { Loading } from '@nextui-org/react';

function SearchModel(props) {
    const [searchValue, setValue] = useState('');
    const [searchResult, setResult] = useState([]);
    const ref = useRef(null);
    const textRef = useRef(null);

    const handleSearch = async (e) => {
        let result = [];
        const fieldValue = ref.current?.value;
        const searchValue = e.target.value.toLowerCase();
        try {
            const documents = await getDocs(
                query(
                    collection(db, 'artworks'),
                    where(`${fieldValue}`, '>=', `${searchValue}`),
                    where(`${fieldValue}`, '<=', `${searchValue}\uf8ff`),
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
                });
            });
            setResult(result);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <motion.div
            initial={{ x: '-100', opacity: 0 }}
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
            className={`fixed top-0 right-0 left-0 z-50 h-full w-full bg-slate-500/25 transition-all duration-500 ease-in-out`}
        >
            <div className="flex h-14 w-full flex-col items-center bg-[#010101] md:h-20">
                <div className="relative mx-auto my-auto w-full md:w-1/2">
                    <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center space-x-2 md:left-0">
                        <button type="submit">
                            <Search className="h-6 w-6" stroke="white" />
                        </button>
                    </div>
                    <div className="absolute inset-y-0 left-6 flex items-center px-4">
                        <select
                            ref={ref}
                            className="content:after[>] block w-full appearance-none bg-transparent px-2 py-1 text-sm text-gray-300 md:px-4"
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
                        autocomplete="false"
                        type="text"
                        id="search"
                        onChange={handleSearch}
                        className="block w-full bg-[#010101] p-2.5 pl-28 text-base text-white shadow-slate-700 focus:outline-none md:pl-36"
                        placeholder="Search artworks"
                    />
                </div>
            </div>

            <div className="min-h-48 relative mx-auto w-full rounded-b-2xl border-b bg-white py-4 px-3 shadow sm:w-5/6 sm:py-8 md:w-1/2">
                <ul className="my-1 space-y-1">
                    {searchResult ? (
                        searchResult.map((result) => {
                            return (
                                <Item
                                    key={result.id}
                                    title={result.title}
                                    image={result.image}
                                    artist={result.artist}
                                />
                            );
                        })
                    ) : (
                        <p className="text-center">No Result</p>
                    )}
                </ul>
            </div>
        </motion.div>
    );
}
export default SearchModel;

function Item(props) {
    return (
        <li className="flex h-16 w-full items-center space-x-4 rounded py-2 pl-3 hover:bg-blue-200/50">
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
        </li>
    );
}
