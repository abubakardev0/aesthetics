import { useState, useRef } from 'react';

import Link from 'next/link';

import {
    collection,
    query,
    getDocs,
    where,
    orderBy,
    limit,
    startAfter,
} from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import useSWR from 'swr';
import { Loading, Avatar } from '@nextui-org/react';

import Modal from '@/commoncomponents/modal/Modal';
import Bell from '@/icons//Bell';
import Error from '@/commoncomponents/Error';

function Notification() {
    const [isNotificationsEnd, setNotificationsEnd] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const { data, error } = useSWR('notifications', async () => {
        const list = [];
        const docRef = await getDocs(
            query(
                collection(db, 'notifications'),
                where('sellerId', '==', auth.currentUser.uid),
                orderBy('time', 'desc'),
                limit(5)
            )
        );
        docRef.forEach((each) => {
            list.push({ id: each.id, ...each.data() });
        });
        setNotificationsEnd(false);
        setNotifications(list);
    });

    const dropdownRef = useRef(null);

    const getMore = async () => {
        const last = notifications[notifications.length - 1];
        const list = [];
        const cursor = last.time;
        const q = query(
            collection(db, 'notifications'),
            where('sellerId', '==', auth.currentUser.uid),
            orderBy('time', 'desc'),
            startAfter(cursor),
            limit(5)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            list.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        setNotifications(notifications.concat(list));
        if (list.length < 5) {
            setNotificationsEnd(true);
        }
    };
    return (
        <>
            <button
                onClick={() => dropdownRef.current.handler()}
                className="relative z-10 flex items-center rounded-full border border-transparent"
            >
                <span className="absolute right-4 top-0.5 h-2 w-2 animate-pulse rounded-full bg-red-600 ring-2 ring-red-400" />
                <Bell className="mr-1 h-6 w-6 fill-transparent stroke-current md:mr-2 md:h-8 md:w-8" />
            </button>
            <Modal ref={dropdownRef}>
                <div className="min-h-24 absolute right-0 z-20 mt-3 max-h-96 w-60 overflow-hidden rounded-xl border-2 border-slate-200 bg-white p-3 py-2 pb-2 shadow-xl lg:w-72">
                    <h4 className="pb-2 font-medium">Notifications</h4>

                    {!notifications && (
                        <div className="grid h-full w-full place-content-center">
                            <Loading />
                        </div>
                    )}
                    {error && <Error />}
                    <ul className="section-scrollbar max-h-64 w-full overflow-auto">
                        {notifications.length > 0 ? (
                            notifications.map((each) => (
                                <Link
                                    href={`/seller/artworks/${each.reference}`}
                                    key={each.id}
                                >
                                    <li className="relative m-0 flex cursor-pointer gap-x-3 rounded-md px-1 py-2.5 odd:bg-gray-50 hover:bg-gray-100">
                                        <Avatar
                                            size="md"
                                            bordered
                                            text={each.bidder.toUpperCase()[0]}
                                        />
                                        <div>
                                            <p className="truncate whitespace-pre-wrap break-words text-sm leading-4 tracking-wide">
                                                {each.message}
                                            </p>
                                            <p className="absolute bottom-1 right-1 text-xs text-gray-600">
                                                {new Date(
                                                    each.time.seconds * 1000
                                                ).toLocaleDateString('en-US', {
                                                    hour12: true,
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </li>
                                </Link>
                            ))
                        ) : (
                            <p className="py-3 text-center text-sm">
                                No notifications
                            </p>
                        )}
                    </ul>
                    <button
                        onClick={getMore}
                        disabled={isNotificationsEnd ? true : false}
                        className={
                            notifications.length > 0
                                ? 'w-full py-2.5 text-center underline disabled:cursor-not-allowed'
                                : 'hidden'
                        }
                    >
                        {isNotificationsEnd
                            ? 'No more notifications'
                            : 'See More'}
                    </button>
                </div>
            </Modal>
        </>
    );
}
export default Notification;
