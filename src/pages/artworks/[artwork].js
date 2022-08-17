import Image from 'next/image';
import ARView from '@/icons/ARView';
import Bookmark from '@/icons/Bookmark';
import Insta from '@/icons/Insta';
import Twitter from '@/icons/Twitter';
import Behance from '@/icons/Behance';
import { db } from '@/firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

const Item = ({ artwork }) => {
    const { images, artist, title, /*uploadedOn*/ price } = JSON.parse(artwork);
    return (
        <>
            <div className="container flex w-full flex-col px-2 md:mx-auto md:h-screen md:flex-row md:space-x-4">
                <div className="w-ful md:w-4/6">
                    <div className="flex w-full flex-col-reverse justify-around md:flex-row md:px-10 md:py-5">
                        <div className="flex flex-row justify-center gap-3 md:flex-col md:justify-center md:gap-0">
                            <div className="h-16 w-16 md:h-28 md:w-24">
                                <Image
                                    src={images[0]}
                                    alt={title}
                                    width={100}
                                    height={100}
                                    className="object-cover"
                                />
                            </div>
                            <div className="h-16 w-16 md:h-28 md:w-24">
                                <Image
                                    src={images[0]}
                                    alt={title}
                                    width={100}
                                    height={100}
                                    className="object-cover"
                                />
                            </div>
                            <div className="h-16 w-16 md:h-28 md:w-24">
                                <Image
                                    src={images[0]}
                                    alt={title}
                                    width={100}
                                    height={100}
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="h-5/6 flex-col justify-center md:h-4/6">
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
                                        <ARView className="h-10 w-10 md:h-16 md:w-16" />
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-2/6">
                    <div className="w-full py-5 md:px-4">
                        <div className="bg-gray flex items-center justify-between">
                            <h3 className="text-lg font-medium md:text-xl">
                                {artist}
                                <br />
                                <span className="text-sm font-normal md:text-base">
                                    (Islamabad, b. 1989)
                                </span>
                            </h3>
                            <button className="h-8 w-24 rounded-full border-2 border-black bg-none text-base transition-all duration-100 hover:bg-black hover:text-white md:h-10 md:w-32">
                                Follow
                            </button>
                        </div>
                        <div className="mt-2 md:mt-10">
                            <h2 className="text-xl font-medium tracking-wide md:text-3xl md:font-semibold">
                                {title}
                            </h2>
                            <p>
                                <span className="text-lg italic">
                                    Acrylic on Canvas
                                </span>
                                <br />
                                9 1/2 x 9 1/2 in <br /> 24.1 x 24.1 cm
                            </p>
                            <h3 className="mt-3 text-lg leading-relaxed md:mt-5">
                                Estimates
                            </h3>
                            <p className="text-2xl">
                                <span className="mr-1 text-base">PKR.</span>
                                {price}
                            </p>
                            <button className="mt-5 h-12 w-full rounded-sm border border-black bg-none text-base transition-all hover:bg-black hover:text-white md:mt-10">
                                Add to Bag
                            </button>
                            <div className="mt-5 inline-flex space-x-3 ">
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
    return {
        props: {
            artwork: JSON.stringify(obj.data()),
        },
    };
}
