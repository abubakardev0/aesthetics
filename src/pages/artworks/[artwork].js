import { useState } from 'react';
import Image from 'next/image';
import { Dropdown } from '@nextui-org/react';
import ARView from '../../common/utils/icons/ARView';
import Card from '../../modules/artworkexperience/Card';
import Bookmark from '../../common/utils/icons/Bookmark';
import Insta from '../../common/utils/icons/Insta';
import Twitter from '../../common/utils/icons/Twitter';
import Behance from '../../common/utils/icons/Behance';
import Head from 'next/head';
import { db } from '../../common/utils/firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

const Item = ({ artwork }) => {
    const { images, artist, title, uploadedOn, price } = JSON.parse(artwork);
    console.log(artwork);
    return (
        <>
            <div className="container mx-auto flex h-screen w-full space-x-4">
                <div className="w-4/6">
                    <div className="flex w-full justify-around px-10 py-5">
                        <div>
                            <div>
                                <Image
                                    src={images[0]}
                                    alt={title}
                                    width={100}
                                    height={100}
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <Image
                                    src={images[0]}
                                    alt={title}
                                    width={100}
                                    height={100}
                                    className="object-cover"
                                />
                            </div>

                            <div>
                                <Image
                                    src={images[0]}
                                    alt={title}
                                    width={100}
                                    height={100}
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="h-4/6 flex-col justify-center">
                            <Image
                                src={images[0]}
                                alt={title}
                                width={550}
                                height={500}
                                priority
                                className="object-cover"
                            />
                            <div className="flex items-center justify-center">
                                <Link href="/">
                                    <a>
                                        <ARView className="h-16 w-16" />
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-2/6">
                    <div className="w-full px-4 py-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-medium">
                                {artist}
                                <br />
                                <span className="text-base font-normal">
                                    (Islamabad, b. 1989)
                                </span>
                            </h3>
                            <button className="h-10 w-32 rounded-full border-2 border-black bg-none text-base transition-all duration-100 hover:bg-black hover:text-white">
                                Follow
                            </button>
                        </div>
                        <div className="mt-10">
                            <h2 className="text-3xl font-semibold leading-loose">
                                {title}
                            </h2>
                            <p>
                                <span className="text-lg italic">
                                    Acrylic on Canvas
                                </span>
                                <br />
                                9 1/2 x 9 1/2 in <br /> 24.1 x 24.1 cm
                            </p>
                            <h3 className="mt-5 text-lg leading-relaxed">
                                Estimates
                            </h3>
                            <p className="text-2xl">
                                <span className="mr-1 text-base">PKR.</span>
                                {price}
                            </p>
                            <button className="mt-10 h-12 w-full rounded-sm border border-black bg-none text-base transition-all hover:bg-black hover:text-white">
                                Add to Bag
                            </button>
                            <div className="mt-5 inline-flex space-x-3">
                                <button className="flex space-x-2">
                                    <Bookmark
                                        className={`delay-50 h-6 w-6 transition-colors `}
                                    />
                                    <span className="font-medium">
                                        Save Artwork
                                    </span>
                                </button>
                                <div className="flex space-x-5 border-l-2 border-black/25 px-3">
                                    <button>
                                        <Insta className="h-6 w-6 hover:scale-105" />
                                    </button>
                                    <button>
                                        <Behance className="h-6 w-6 hover:scale-105" />
                                    </button>
                                    <button>
                                        <Twitter className="h-6 w-6 hover:scale-105" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Item;

export async function getServerSideProps({
    params = { id: artwork.id.toString() },
}) {
    const id = params.artwork;
    const obj = await getDoc(doc(db, 'artworks', id));
    const artwork = JSON.stringify(obj.data());
    return {
        props: {
            artwork,
        },
    };
}
