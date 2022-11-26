import { useState, useEffect } from 'react';

import {
    doc,
    getDoc,
    updateDoc,
    arrayRemove,
    arrayUnion,
} from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import { Avatar } from '@nextui-org/react';

export default function Artist({
    artist,
    setAlert,
    setShow,
    title,
    dimensions,
    mediums,
    surfaces,
}) {
    const [follow, setFollow] = useState(false);

    useEffect(() => {
        if (auth.currentUser) {
            checkFollow();
        }
    }, []);

    async function checkFollow() {
        const ref = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (ref.exists()) {
            if (ref.data().favourites.includes(artist)) {
                setFollow(true);
                return;
            }
            setFollow(false);
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
                favourites: arrayRemove(artist),
            });
        } else {
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                favourites: arrayUnion(artist),
            });
        }
        setFollow(!follow);
    }

    return (
        <>
            <div className="flex w-full items-center justify-between">
                <div className="inline-flex items-center space-x-3">
                    <Avatar
                        size="lg"
                        text={artist.toLocaleUpperCase()[0]}
                        css={{
                            zIndex: 1,
                        }}
                    />
                    <h3 className="text-base capitalize md:text-lg">
                        {artist}
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
            <div>
                <h2 className="mb-1 text-xl font-medium capitalize sm:text-2xl md:text-3xl">
                    {title}
                </h2>
                <p className="text-lg capitalize italic md:text-xl">
                    {mediums && mediums.join(' and ')}
                    <span className="mx-1 lowercase">on</span>
                    {surfaces && surfaces.join(' and ')}
                </p>
                <p>
                    {dimensions.height} H x {dimensions.width} W{' '}
                    {dimensions.unit}
                </p>
            </div>
        </>
    );
}
