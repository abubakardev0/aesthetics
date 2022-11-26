import { useRef } from 'react';

import Link from 'next/link';

import { collection, query, getDocs, where, orderBy } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import useSWR from 'swr';
import { Loading, Avatar } from '@nextui-org/react';

import Modal from '@/commoncomponents/modal/Modal';
import Bell from '@/icons//Bell';
import Error from '@/commoncomponents/Error';

function Notification() {
    const { data: notifications, error } = useSWR('notifications', async () => {
        const list = [];
        const docRef = await getDocs(
            query(
                collection(db, 'notifications'),
                where('sellerId', '==', auth.currentUser.uid),
                orderBy('time', 'desc')
            )
        );
        docRef.forEach((each) => {
            list.push({ id: each.id, ...each.data() });
        });
        return list;
    });
    const dropdownRef = useRef(null);
    console.log(error);
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
                <div className="min-h-36 absolute right-0 z-20 mt-3 max-h-80 w-60 overflow-hidden rounded-xl border-2 border-slate-200 bg-white p-3 py-2 pb-2 shadow-xl lg:w-72">
                    <h4 className="pb-2 font-medium">Notifications</h4>

                    {!notifications && (
                        <div className="grid h-full w-full place-content-center">
                            <Loading />
                        </div>
                    )}
                    {error && <Error />}
                    <ul className="section-scrollbar h-64 w-full overflow-auto">
                        {notifications && notifications.length > 0 ? (
                            notifications.map((each) => (
                                <Link
                                    href={`/seller/artworks/${each.reference}`}
                                    key={each.id}
                                >
                                    <li className="relative m-0 flex cursor-pointer gap-x-2 rounded-md border-t px-1 py-2 hover:bg-gray-50">
                                        <Avatar
                                            size="md"
                                            bordered
                                            text={each.bidder.toUpperCase()[0]}
                                        />
                                        <div>
                                            <p className="truncate whitespace-pre-wrap break-words text-sm md:text-base">
                                                {each.message}
                                            </p>
                                            <p className="text-right text-xs md:text-sm">
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
                            <p className="py-10 text-center text-sm">
                                No notifications
                            </p>
                        )}
                    </ul>
                </div>
            </Modal>
        </>
    );
}
export default Notification;
