import { useState, useEffect } from 'react';

import { getDocs, collection, query, limit, where } from 'firebase/firestore';

import { db, auth } from '@/firebase/firebase-config';

import { formatCurrency } from '@/commoncomponents/functions';

export default function BiddingDetails({ id, price, startingBid, currentBid }) {
    const [userBid, setUserBid] = useState(null);
    useEffect(() => {
        if (auth.currentUser) {
            checkBid();
        }
    }, []);
    async function checkBid() {
        const ref = query(
            collection(db, 'artworks', `${id}`, 'bids'),
            where('user', '==', auth.currentUser.uid),
            limit(1)
        );
        const docs = await getDocs(ref);
        docs.forEach((doc) => {
            setUserBid({ id: doc.id, ...doc.data() });
        });
    }
    return (
        <div className="w-full">
            <p className="text-lg font-medium">
                Estimates:
                <span className="ml-1">{formatCurrency(price)}</span>
            </p>
            <p className="text-lg font-medium ">
                {currentBid === startingBid ? (
                    <>
                        Starting bid:
                        <span className="ml-1">
                            {formatCurrency(startingBid)}
                        </span>
                    </>
                ) : (
                    <>
                        Current bid:
                        <span className="ml-1">
                            {formatCurrency(currentBid)}
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
    );
}
