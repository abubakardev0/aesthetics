import Link from 'next/link';

import useSWR from 'swr';
import {
    collection,
    limit,
    where,
    orderBy,
    getDocs,
    getDoc,
    doc,
    query,
} from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import { Avatar, Loading } from '@nextui-org/react';

import Artwork from '@/icons/Artwork';

const getChats = async () => {
    let chats = [];
    const ref = collection(db, 'chat');
    const q = query(ref, where(`users.${auth.currentUser.uid}`, '==', true));
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
        if (doc.exists()) {
            chats.push(doc.id);
        }
    });
    return chats;
};

export default function Chat() {
    const { data: chat, error } = useSWR('recent-chat', async () => {
        const messages = [];
        const chat = await getChats();
        for (let i = 0; i < chat.length; i++) {
            const ref = query(
                collection(db, 'chat', `${chat[i]}`, 'messages'),
                where('sentBy', '!=', `${auth.currentUser.uid}`),
                orderBy('sentBy'),
                orderBy('sentAt', 'desc'),
                limit(1)
            );
            const querySnapshot = await getDocs(ref);
            querySnapshot.forEach((doc) => {
                messages.push({ id: doc.id, ...doc.data() });
            });
        }
        for (let i = 0; i < messages.length; i++) {
            const ref = await getDoc(doc(db, 'users', `${messages[i].sentBy}`));
            if (ref.exists()) {
                messages[i].name = ref.data().name;
            }
        }

        return messages;
    });
    if (error) {
        return <p className="px-4 text-center">Oops! Something went wrong!</p>;
    }

    return (
        <div className="min-h-fit w-full space-y-3 overflow-hidden rounded-2xl border-2 bg-white p-4 drop-shadow-lg md:h-full">
            <div className="flex justify-between">
                <h3 className="text-lg font-medium">Recent Messages</h3>
                <Link href="/chat">
                    <a className="text-sky-500 underline underline-offset-2">
                        View All
                    </a>
                </Link>
            </div>
            <ul className="section-scrollbar h-[280px] space-y-3 overflow-y-auto">
                {!chat && (
                    <div className="grid h-full w-full place-content-center">
                        <Loading />
                    </div>
                )}
                {chat &&
                    chat.slice(0, 4).map((message) => (
                        <Link
                            href={{
                                pathname: '/chat',
                                query: {
                                    otherUser: message.sentBy,
                                    currentUser: auth.currentUser.uid,
                                },
                            }}
                            key={message.id}
                        >
                            <Card
                                type={message.type}
                                name={message.name}
                                text={message.text}
                                date={message.sentAt.seconds}
                            />
                        </Link>
                    ))}
                {chat && chat.length === 0 && (
                    <p className="py-[25%] text-center">No messages</p>
                )}
            </ul>
        </div>
    );
}

export const Card = ({ name, text, date, type }) => {
    return (
        <li className="relative flex cursor-pointer rounded-md border-b bg-gray-50 p-2.5 drop-shadow">
            <Avatar size="md" bordered text={name.toUpperCase()[0]} />
            <span className="flex flex-col px-2.5">
                <h3 className="font-medium capitalize">{name}</h3>
                {type === 'text' ? (
                    <p className="truncate whitespace-pre-wrap break-all text-sm md:text-base">
                        {text}
                    </p>
                ) : (
                    <Artwork className="h-4 w-4" />
                )}
                <span className="absolute bottom-1 right-2 text-xs text-gray-500">
                    {new Date(date * 1000).toLocaleDateString('en-US', {
                        hour12: true,
                        hour: 'numeric',
                        minute: 'numeric',
                    })}
                </span>
            </span>
        </li>
    );
};
