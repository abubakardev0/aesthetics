import { useState, useEffect } from 'react';

import Link from 'next/link';

import { auth } from '@/firebase/firebase-config';

import { handler, inCollection } from '@/commoncomponents/firebaseFunctions';
import Bookmark from '@/icons/Bookmark';
import Chat from '@/icons/Chat';
import Insta from '@/icons/Insta';
import Twitter from '@/icons/Twitter';
import Behance from '@/icons/Behance';

export default function Social({ id, sellerId, setAlert, setShow }) {
    const [save, setSave] = useState(false);

    useEffect(() => {
        if (auth.currentUser) {
            inCollection('saves', setSave, id);
        }
    }, []);

    function handleWishList() {
        if (!auth.currentUser) {
            setAlert({
                type: 'Not Logged In',
                message: 'Please login to save this item',
            });
            setShow(true);
            return;
        } else if (auth.currentUser.uid === sellerId) {
            setAlert({
                type: 'Error',
                message: 'Oops! You don`t have permission to save this artwork',
            });
            setShow(true);
            return;
        } else {
            handler('saves', setSave, save, id);
        }
    }

    return (
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
                <Link href="https://www.instagram.com/" passHref={true}>
                    <a>
                        <Insta className="h-6 w-6 hover:scale-105" />
                    </a>
                </Link>
                <Link href="https://www.behance.net/" passHref={true}>
                    <a>
                        <Behance className="h-6 w-6 hover:scale-105" />
                    </a>
                </Link>
                <Link href="https://www.twitter.com/" passHref={true}>
                    <a>
                        <Twitter className="h-6 w-6 hover:scale-105" />
                    </a>
                </Link>
            </div>
            <Link
                href={{
                    pathname: '/chat',
                    query:
                        auth.currentUser && auth.currentUser.uid !== sellerId
                            ? {
                                  currentUser: auth.currentUser.uid,
                                  otherUser: sellerId,
                              }
                            : null,
                }}
            >
                <a className="flex items-center space-x-2">
                    <Chat className="h-8 w-8" stroke="black" strokeWidth={1} />
                    <span className="hidden font-medium md:block">Chat</span>
                </a>
            </Link>
        </div>
    );
}
