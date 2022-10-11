import { useState, useEffect } from 'react';

import Link from 'next/link';
import Head from 'next/head';

import {
    doc,
    getDoc,
    updateDoc,
    arrayRemove,
    arrayUnion,
} from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import { Avatar, Collapse } from '@nextui-org/react';

import Slider from '@/commoncomponents/Scrollers/Slider';
import RelatedWorks from '@/buyer/components/artwork/RelatedWorks';
import { formatCurrency } from '@/commoncomponents/functions';
import Alert from '@/commoncomponents/popups/Alert';
import Error from '@/commoncomponents/Error';

import ARView from '@/icons/ARView';
import Bookmark from '@/icons/Bookmark';
import Chat from '@/icons/Chat';
import Insta from '@/icons/Insta';
import Twitter from '@/icons/Twitter';
import Behance from '@/icons/Behance';

export default function Item({ artwork, hasError }) {
    const [follow, setFollow] = useState(false);
    const [save, setSave] = useState(false);
    const [addtoBag, setAddtoBag] = useState(false);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    });

    const data = JSON.parse(artwork);
    const users = {
        currentUser: auth.currentUser && auth.currentUser.uid,
        otherUser: data.sellerId,
    };

    async function handler(document, set, type) {
        if (type) {
            await updateDoc(doc(db, document, auth.currentUser.uid), {
                artworks: arrayRemove(data.id),
            });
            set(false);
        } else {
            await updateDoc(doc(db, document, auth.currentUser.uid), {
                artworks: arrayUnion(data.id),
            });
            set(true);
        }
    }

    async function inCollection(document, set) {
        const docRef = doc(db, document, auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const artworks = docSnap.data().artworks;
            const index = artworks.indexOf(data.id);
            if (index !== -1) {
                set(true);
                return;
            }
        }
    }

    function handleWishList() {
        if (!auth.currentUser) {
            setAlert({
                type: 'Not Loggedin',
                message: 'Please login to add items to your bag',
            });
            setShow(true);
            return;
        }
        if (auth.currentUser.uid === data.sellerId) {
            setAlert({
                type: 'Error',
                message: 'You don`t have permission to save this artwork',
            });
            setShow(true);
            return;
        }
        handler('saves', setSave, save);
    }

    function handleBag() {
        if (!auth.currentUser) {
            setAlert({
                type: 'Not Loggedin',
                message: 'Please login to add items to your bag',
            });
            setShow(true);
            return;
        }
        if (auth.currentUser.uid === data.sellerId) {
            setAlert({
                type: 'Error',
                message: 'You don`t have permission to add this artwork to bag',
            });
            setShow(true);
            return;
        }
        handler('bag', setAddtoBag, addtoBag);
    }
    async function handleFollow() {
        if (!auth.currentUser) {
            setAlert({
                type: 'Not Logged In',
                message: 'Please login to use this feature',
            });
            setShow(true);
            return;
        }
        if (follow) {
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                favourites: arrayRemove(data.artist),
            });
        } else {
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                favourites: arrayUnion(data.artist),
            });
        }
        setFollow(!follow);
    }
    async function checkFollow() {
        const ref = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (ref.exists()) {
            if (ref.data().favourites.includes(data.artist)) {
                setFollow(true);
                return;
            }
            setFollow(false);
        }
    }
    useEffect(() => {
        if (auth.currentUser) {
            inCollection('saves', setSave);
            inCollection('bag', setAddtoBag);
            checkFollow();
        }
    }, []);

    if (hasError) {
        return <Error />;
    }

    return (
        <>
            <Head>
                <title>{data.title.toLocaleUpperCase()}</title>
            </Head>
            <section className="container mx-auto flex h-full w-full flex-col md:h-[600px] md:flex-row md:gap-5">
                <div className="grid h-[450px] w-full place-content-center pt-0 md:h-full md:w-1/2 md:pt-14">
                    <Slider images={data.images} />
                    <div className="mt-3 flex justify-center">
                        <Link
                            href={{
                                pathname:
                                    'https://model-viewer-ar-xwsb.vercel.app',
                                query: { id: data.images[0] },
                            }}
                        >
                            <a>
                                <ARView className="h-12 w-12 md:h-16 md:w-16" />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="h-full w-full py-5 md:w-1/2 md:px-16">
                    <div className="h-full w-full flex-col-reverse space-y-6 p-4 md:flex-col md:space-y-12 md:rounded-lg md:p-12">
                        <div className="flex w-full items-center justify-between">
                            <div className="inline-flex items-center space-x-3">
                                <Avatar
                                    size="lg"
                                    text={data.artist.toLocaleUpperCase()[0]}
                                    css={{ zIndex: 1 }}
                                />
                                <h3 className="text-base font-medium capitalize sm:text-lg md:text-xl">
                                    {data.artist}
                                </h3>
                            </div>
                            <button
                                onClick={handleFollow}
                                className={`${
                                    follow
                                        ? 'bg-neutral-900 text-white'
                                        : 'bg-none text-black'
                                } h-10 w-24 rounded-full border border-black text-base transition-all duration-100 hover:bg-neutral-800 hover:text-white sm:w-28 md:h-10 md:w-32`}
                            >
                                {follow ? 'Following' : 'Follow'}
                            </button>
                        </div>
                        <div className="space-y-2">
                            <h2 className="mb-1 text-xl font-medium capitalize tracking-wide sm:text-2xl md:text-3xl md:font-semibold">
                                {data.title}
                            </h2>
                            <p>
                                <span className="mr-1 text-lg capitalize italic md:text-xl">
                                    {data.mediums && data.mediums.join(' and ')}
                                </span>
                                on
                                <span className="ml-1 text-lg capitalize md:text-xl">
                                    {data.surfaces}
                                </span>
                                <br />
                                {data.dimensions.height} H x{' '}
                                {data.dimensions.width} W {data.dimensions.unit}
                            </p>
                        </div>
                        <div className="w-full">
                            <h4 className="text-lg font-medium tracking-wide md:text-xl">
                                {formatCurrency(data.price)}
                            </h4>
                        </div>

                        <button
                            onClick={handleBag}
                            className="h-12 w-full rounded-md bg-neutral-900 text-white hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-neutral-300 md:w-80"
                        >
                            {addtoBag ? 'Remove from Bag' : 'Add to Bag'}
                        </button>
                        <div className="flex justify-center space-x-5 md:justify-start md:space-x-3">
                            <button
                                className="flex items-center space-x-2"
                                onClick={handleWishList}
                            >
                                <Bookmark
                                    className="delay-50 h-8 w-8 transition-colors "
                                    fill={save ? 'black' : 'none'}
                                    stroke="black"
                                />
                                <span className="hidden font-medium  md:block">
                                    Save Artwork
                                </span>
                            </button>
                            <div className="flex items-center gap-x-5 border-l-2 border-r-2 border-black/25 px-3">
                                <Link
                                    href="https://www.instagram.com/"
                                    passHref={true}
                                >
                                    <a>
                                        <Insta className="h-6 w-6 hover:scale-105" />
                                    </a>
                                </Link>
                                <Link
                                    href="https://www.behance.net/"
                                    passHref={true}
                                >
                                    <a>
                                        <Behance className="h-6 w-6 hover:scale-105" />
                                    </a>
                                </Link>
                                <Link
                                    href="https://www.twitter.com/"
                                    passHref={true}
                                >
                                    <a>
                                        <Twitter className="h-6 w-6 hover:scale-105" />
                                    </a>
                                </Link>
                            </div>
                            <Link
                                href={{
                                    pathname: '/chat',
                                    query: auth.currentUser ? users : '',
                                }}
                            >
                                <a className="flex items-center space-x-2">
                                    <Chat
                                        className="h-8 w-8"
                                        stroke="black"
                                        strokeWidth={1}
                                    />
                                    <span className="hidden font-medium md:block">
                                        Chat
                                    </span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container mx-auto py-6 md:py-16">
                <div className="mb-5 flex w-full flex-col items-center justify-center space-y-5 md:mb-10">
                    <Collapse
                        title="About This Artwork"
                        expanded
                        bordered
                        className="w-full md:w-3/5 lg:w-1/2"
                    >
                        <p>
                            {data.description
                                ? data.description
                                : 'No Description'}
                        </p>
                    </Collapse>
                    <Collapse
                        title="Additional Details"
                        bordered
                        className="w-full md:w-3/5 lg:w-1/2"
                    >
                        <h4 className="text-xl font-medium">Certificates</h4>
                        <p>
                            {data.certificates
                                ? 'It is a certified piece of artwork'
                                : 'It is not certified piece of artwork'}
                        </p>
                    </Collapse>
                </div>
                <RelatedWorks category={data.category} />
            </section>
            <Alert
                show={show}
                setShow={setShow}
                type={alert.type}
                message={alert.message}
            />
        </>
    );
}

export async function getServerSideProps({
    params = { id: artwork.id.toString() },
}) {
    const id = params.artwork;
    const data = await getDoc(doc(db, 'artworks', id));
    if (!data) {
        return {
            props: {
                hasError: true,
            },
        };
    }
    return {
        props: {
            artwork: JSON.stringify({ id: data.id, ...data.data() }),
        },
    };
}
