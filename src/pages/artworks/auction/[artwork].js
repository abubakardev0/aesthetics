import { useState, useRef, useEffect } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import {
    doc,
    updateDoc,
    getDoc,
    onSnapshot,
    Timestamp,
    collection,
    addDoc,
    increment,
} from 'firebase/firestore';

import { db, auth } from '@/firebase/firebase-config';

import { Loading } from '@nextui-org/react';
import axios from 'axios';

import { useCountDown } from '@/hooks/useCountDown';
import { useTimeout } from '@/hooks/useTimeout';

import Social from '@/artworkexperience/pages/Social';
import Details from '@/artworkexperience/pages/Details';
import ImageView from '@/artworkexperience/pages/ImageView';
import Attributes from '@/artworkexperience/pages/Attributes';
import BiddingDetails from '@/artworkexperience/pages/BiddingDetails';

import Loader from '@/commoncomponents/Loader';
import RelatedWorks from '@/buyer/components/artwork/RelatedWorks';
import ShowCounter from '@/commoncomponents/ShowCounter';
import Alert from '@/commoncomponents/popups/Alert';
import Error from '@/commoncomponents/Error';

function Item({ artwork, notFound }) {
    const [data, setData] = useState(JSON.parse(artwork));
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

    useEffect(() => {
        const docRef = doc(db, 'artworks', documentId);
        onSnapshot(docRef, (doc) => {
            setData({ id: doc.id, ...doc.data() });
        });
    }, [data]);

    useTimeout(() => {
        (async function handleAuctionEnd() {
            if (countDown > 0) return;
            if (data.status === 'sold' || data.status === 'archived') return;
            if (data.currentBid < data.price) {
                await updateDoc(doc(db, 'artworks', `${documentId}`), {
                    status: 'archived',
                });
                return;
            }
            axios.post('/api/auction-end', {
                documentId: documentId,
            });
        })();
    }, countDown);

    if (notFound) {
        return <Error />;
    }

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
                setAlert({
                    type: 'success',
                    message: 'A successful bid has been submitted',
                });
            } catch (error) {
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
            setUserBid((prev) => ({
                ...prev,
                value: parseInt(newValue),
                time: Timestamp.fromDate(new Date()),
            }));
        }

        async function newBid() {
            const ref = await addDoc(
                collection(db, 'artworks', `${documentId}`, 'bids'),
                {
                    user: auth.currentUser.uid,
                    value: parseInt(newValue),
                    time: Timestamp.fromDate(new Date()),
                }
            );
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
            setUserBid((prev) => ({
                ...prev,
                id: ref.id,
                value: parseInt(newValue),
                time: Timestamp.fromDate(new Date()),
            }));
        }
    };

    return (
        <>
            <Head>
                <title>{data.title.toLocaleUpperCase()}</title>
            </Head>
            <section className="container mx-auto flex h-full w-full flex-col md:h-screen md:flex-row md:gap-5">
                <ImageView images={data.images} />
                <div className="h-full w-full py-2 md:w-1/2 md:px-16">
                    <div className="h-full w-full flex-col-reverse space-y-8 p-4 md:flex-col md:rounded-lg md:p-12">
                        <Attributes
                            artist={data.artist}
                            setAlert={setAlert}
                            setShow={setShow}
                            title={data.title}
                            surfaces={data.surfaces}
                            mediums={data.mediums}
                            dimensions={data.dimensions}
                        />

                        <BiddingDetails
                            id={data.id}
                            price={data.price}
                            startingBid={data.startingBid}
                            currentBid={data.currentBid}
                        />
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
                        <Social
                            id={data.id}
                            sellerId={data.sellerId}
                            setAlert={setAlert}
                            setShow={setShow}
                        />
                    </div>
                </div>
            </section>
            <Details
                description={data.description}
                certificates={data.certificates}
            />
            <section className="container mx-auto px-3 py-6 md:px-0">
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
