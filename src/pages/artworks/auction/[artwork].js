import { useState, useRef, useEffect } from 'react';

import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

import {
    doc,
    updateDoc,
    getDoc,
    getDocs,
    onSnapshot,
    Timestamp,
    collection,
    arrayUnion,
    arrayRemove,
    addDoc,
    increment,
    query,
    limit,
    where,
} from 'firebase/firestore';

import { db, auth } from '@/firebase/firebase-config';

import { Avatar, Collapse, Loading } from '@nextui-org/react';

import { useCountDown } from '@/hooks/useCountDown';

import Slider from '@/commoncomponents/Scrollers/Slider';
import Loader from '@/commoncomponents/Loader';
import RelatedWorks from '@/buyer/components/artwork/RelatedWorks';
import ShowCounter from '@/commoncomponents/ShowCounter';
import Alert from '@/commoncomponents/popups/Alert';
import { formatCurrency } from '@/commoncomponents/functions';
import Error from '@/commoncomponents/Error';

import ARView from '@/icons/ARView';
import Bookmark from '@/icons/Bookmark';
import Chat from '@/icons/Chat';
import Insta from '@/icons/Insta';
import Twitter from '@/icons/Twitter';
import Behance from '@/icons/Behance';

function Item({ artwork, notFound }) {
    const [data, setData] = useState(JSON.parse(artwork));
    const [userBid, setUserBid] = useState(null);
    const [follow, setFollow] = useState(false);
    const [save, setSave] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    });
    const router = useRouter();
    const bidValueRef = useRef();
    const countDown = useCountDown(data.endingTime.seconds);
    const documentId = data.id;
    const users = {
        currentUser: auth.currentUser && auth.currentUser.uid,
        otherUser: data.sellerId,
    };

    useEffect(() => {
        const docRef = doc(db, 'artworks', documentId);
        onSnapshot(docRef, (doc) => {
            setData({ id: doc.id, ...doc.data() });
        });
    }, [data]);

    if (notFound) {
        return <Error />;
    }

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
                type: 'Not Logged In',
                message: 'Please login to save this item',
            });
            setShow(true);
            return;
        } else if (auth.currentUser.uid === data.sellerId) {
            setAlert({
                type: 'Error',
                message: 'Oops! You don`t have permission to save this artwork',
            });
            setShow(true);
            return;
        } else {
            handler('saves', setSave, save);
        }
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

    async function checkBid() {
        const ref = query(
            collection(db, 'artworks', `${data.id}`, 'bids'),
            where('user', '==', auth.currentUser.uid),
            limit(1)
        );
        const docs = await getDocs(ref);
        docs.forEach((doc) => {
            setUserBid({ id: doc.id, ...doc.data() });
        });
    }

    useEffect(() => {
        if (auth.currentUser) {
            inCollection('saves', setSave);
            checkFollow(auth.currentUser.uid);
            checkBid();
        }
    }, []);

    const validateBidValue = (newValue, currentValue) => {
        newValue = parseInt(newValue);
        currentValue = parseInt(currentValue);
        return newValue > currentValue ? true : false;
    };

    const placeBid = async () => {
        if (!auth.currentUser) {
            router.push('/auth/login');
            return <Loader />;
        }
        if (auth.currentUser.uid === data.sellerId) {
            setAlert({
                type: 'Error',
                message: 'You don`t have permission to bid on this artwork',
            });
            setShow(true);
            return;
        }
        if (countDown <= 0) {
            setAlert({
                type: 'error',
                message: 'The auction has concluded',
            });
            setShow(true);
            return;
        }
        const newValue = bidValueRef.current?.value;
        const currentValue = data.currentBid;
        const isValid = validateBidValue(newValue, currentValue);

        if (!isValid) {
            setAlert({
                type: 'error',
                message: 'The bid must be greater than the current value',
            });
            setShow(true);
            return;
        } else {
            setLoading(true);
            try {
                userBid ? await updateBid() : await newBid();
                setUserBid((prev) => ({
                    ...prev,
                    value: parseInt(newValue),
                    time: Timestamp.fromDate(new Date()),
                }));
                setAlert({
                    type: 'success',
                    message: 'A successful bid has been submitted',
                });
            } catch (error) {
                console.log(error);
                setAlert({
                    type: 'error',
                    message: 'There was no success with the bid',
                });
            } finally {
                setShow(true);
                setLoading(false);
            }
        }

        async function updateBid() {
            await updateDoc(
                doc(db, 'artworks', `${documentId}`, 'bids', `${userBid.id}`),
                {
                    value: parseInt(newValue),
                    time: Timestamp.fromDate(new Date()),
                }
            );
            if (data.currentBid === data.startingBid) {
                updateDoc(doc(db, 'artworks', `${documentId}`), {
                    currentBid: parseInt(newValue),
                });
            } else {
                updateDoc(doc(db, 'artworks', `${documentId}`), {
                    currentBid: parseInt(newValue),
                    lastBid: {
                        user: auth.currentUser.uid,
                        bid: parseInt(currentValue),
                    },
                });
            }
        }

        async function newBid() {
            await addDoc(collection(db, 'artworks', `${documentId}`, 'bids'), {
                user: auth.currentUser.uid,
                value: parseInt(newValue),
                time: Timestamp.fromDate(new Date()),
            });
            if (data.currentBid === data.startingBid) {
                updateDoc(doc(db, 'artworks', `${documentId}`), {
                    currentBid: parseInt(newValue),
                    totalBids: increment(1),
                });
            } else {
                updateDoc(doc(db, 'artworks', `${documentId}`), {
                    currentBid: parseInt(newValue),
                    lastBid: {
                        user: auth.currentUser.uid,
                        bid: parseInt(currentValue),
                    },
                    totalBids: increment(1),
                });
            }
        }
    };

    return (
        <>
            <Head>
                <title>{data.title.toLocaleUpperCase()}</title>
            </Head>
            <section className="container mx-auto flex h-full w-full flex-col md:h-screen md:flex-row md:gap-5">
                <div className="grid h-[450px] w-full place-content-center md:h-full md:w-1/2">
                    <Slider images={data.images} />
                    <div className="mt-3 flex justify-center">
                        <Link href="/">
                            <a>
                                <ARView className="h-12 w-12 md:h-16 md:w-16" />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="h-full w-full py-2 md:w-1/2 md:px-16">
                    <div className="h-full w-full flex-col-reverse space-y-8 p-4 md:flex-col md:rounded-lg md:p-12">
                        <div className="flex w-full items-center justify-between">
                            <div className="inline-flex items-center space-x-3">
                                <Avatar
                                    size="lg"
                                    text={data.artist.toLocaleUpperCase()}
                                    css={{ zIndex: 1 }}
                                />
                                <h3 className="text-base capitalize md:text-lg">
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
                                {follow ? 'Follwing' : 'Follow'}
                            </button>
                        </div>
                        <div>
                            <h2 className="mb-1 text-xl font-medium capitalize sm:text-2xl md:text-3xl">
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
                            <p className="text-lg font-medium">
                                Estimates:
                                <span className="ml-1">
                                    {formatCurrency(data.price)}
                                </span>
                            </p>
                            <p className="text-lg font-medium ">
                                {data.currentBid === data.startingBid ? (
                                    <>
                                        Starting bid:
                                        <span className="ml-1">
                                            {formatCurrency(data.startingBid)}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        Current bid:
                                        <span className="ml-1">
                                            {formatCurrency(data.currentBid)}
                                        </span>
                                    </>
                                )}
                                <br />
                                {userBid !== null && (
                                    <>
                                        Your bid:
                                        <span className="ml-1">
                                            {formatCurrency(userBid.value)}
                                        </span>
                                    </>
                                )}
                            </p>
                        </div>
                        <div>
                            {countDown >= 0 && (
                                <ShowCounter countDown={countDown} />
                            )}
                        </div>
                        <div className="inline-flex h-auto w-full space-x-2 md:space-x-5">
                            <select
                                id="bidValue"
                                name="bidValue"
                                className="w-1/2 rounded-md border border-gray-100 bg-gray-200 p-2.5 text-[14px] text-gray-600"
                                required
                                defaultValue={parseInt(data.currentBid) + 1000}
                                ref={bidValueRef}
                            >
                                <option disabled>Select your bid</option>
                                <option
                                    value={parseInt(data.currentBid) + 1000}
                                >
                                    {parseInt(data.currentBid) + 1000}
                                </option>
                                <option
                                    value={parseInt(data.currentBid) + 2000}
                                >
                                    {parseInt(data.currentBid) + 2000}
                                </option>
                                <option
                                    value={parseInt(data.currentBid) + 3000}
                                >
                                    {parseInt(data.currentBid) + 3000}
                                </option>
                                <option
                                    value={parseInt(data.currentBid) + 4000}
                                >
                                    {parseInt(data.currentBid) + 5000}
                                </option>
                                <option
                                    value={parseInt(data.currentBid) + 6000}
                                >
                                    {parseInt(data.currentBid) + 6000}
                                </option>
                            </select>
                            <button
                                disabled={countDown <= 0}
                                onClick={placeBid}
                                className="h-12 w-1/2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-neutral-300"
                            >
                                {countDown <= 0 ? (
                                    'Auction Ends'
                                ) : loading ? (
                                    <Loading
                                        type="points-opacity"
                                        color="currentColor"
                                        size="sm"
                                    />
                                ) : (
                                    'Place Bid'
                                )}
                            </button>
                        </div>
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
                            <div className="flex space-x-5 border-l-2 border-r-2 border-black/25 px-3">
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

export default Item;

export async function getServerSideProps({
    params = { id: artwork.id.toString() },
}) {
    const id = params.artwork;
    const data = await getDoc(doc(db, 'artworks', id));

    if (!data) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            artwork: JSON.stringify({ id: data.id, ...data.data() }),
        },
    };
}
