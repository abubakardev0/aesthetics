import { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/router';
import {
    doc,
    getDocs,
    query,
    limit,
    where,
    Timestamp,
    collection,
    addDoc,
    increment,
    updateDoc,
} from 'firebase/firestore';

import { db, auth } from '@/firebase/firebase-config';
import { Loading } from '@nextui-org/react';
import axios from 'axios';

import { useCountDown } from '@/hooks/useCountDown';
import { useTimeout } from '@/hooks/useTimeout';
import ShowCounter from '@/commoncomponents/ShowCounter';
import Loader from '@/commoncomponents/Loader';
import { formatCurrency } from '@/commoncomponents/functions';

export default function BiddingDetails({ data, setAlert, setShow }) {
    const [userBid, setUserBid] = useState(null);
    const [loading, setLoading] = useState(false);
    const countDown = useCountDown(data.endingTime.seconds);
    const router = useRouter();
    const bidValueRef = useRef();

    useEffect(() => {
        if (auth.currentUser) {
            checkBid();
        }
    }, []);

    useTimeout(() => {
        (async function handleAuctionEnd() {
            if (countDown > 0) return;
            if (data.status === 'sold' || data.status === 'archived') return;
            if (data.currentBid < data.price) {
                await updateDoc(doc(db, 'artworks', `${data.id}`), {
                    status: 'archived',
                });
                return;
            }
            axios.post('/api/auction-end', {
                documentId: data.id,
            });
        })();
    }, countDown);

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
                doc(db, 'artworks', `${data.id}`, 'bids', `${userBid.id}`),
                {
                    value: parseInt(newValue),
                    time: Timestamp.fromDate(new Date()),
                }
            );
            if (data.currentBid === data.startingBid) {
                updateDoc(doc(db, 'artworks', `${data.id}`), {
                    currentBid: parseInt(newValue),
                });
            } else {
                updateDoc(doc(db, 'artworks', `${data.id}`), {
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
                collection(db, 'artworks', `${data.id}`, 'bids'),
                {
                    user: auth.currentUser.uid,
                    value: parseInt(newValue),
                    time: Timestamp.fromDate(new Date()),
                }
            );
            if (data.currentBid === data.startingBid) {
                updateDoc(doc(db, 'artworks', `${data.id}`), {
                    currentBid: parseInt(newValue),
                    totalBids: increment(1),
                });
            } else {
                updateDoc(doc(db, 'artworks', `${data.id}`), {
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
            <div className="w-full">
                <p className="text-lg font-medium">
                    Estimates:
                    <span className="ml-1">{formatCurrency(data.price)}</span>
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
            <div>{countDown >= 0 && <ShowCounter countDown={countDown} />}</div>
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
                    <option value={parseInt(data.currentBid) + 1000}>
                        {parseInt(data.currentBid) + 1000}
                    </option>
                    <option value={parseInt(data.currentBid) + 2000}>
                        {parseInt(data.currentBid) + 2000}
                    </option>
                    <option value={parseInt(data.currentBid) + 3000}>
                        {parseInt(data.currentBid) + 3000}
                    </option>
                    <option value={parseInt(data.currentBid) + 4000}>
                        {parseInt(data.currentBid) + 5000}
                    </option>
                    <option value={parseInt(data.currentBid) + 6000}>
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
        </>
    );
}
