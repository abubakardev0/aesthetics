import { useState } from 'react';

import { useRouter } from 'next/router';
import {
    doc,
    getDocs,
    query,
    getDoc,
    addDoc,
    limit,
    collection,
    where,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';

import PrivateRoute from '@/commoncomponents/routes/Private';

import Chats from '@/chat/Chats';
import Room from '@/chat/Room';
import EmptyLayout from '@/layouts/EmptyLayout';
import Arrow from '@/icons/Arrow';

function Chat({ chat, hasError, noQuery }) {
    const router = useRouter();
    const [currentChat, setChat] = useState(chat && JSON.parse(chat));

    return (
        <PrivateRoute>
            <section className="relative h-full w-full bg-gray-100">
                <button
                    onClick={() => router.back()}
                    className="fixed left-5 top-3 rounded-full border bg-white p-2 hover:bg-gray-50"
                >
                    <Arrow className="h-6 w-6 -rotate-180" />
                </button>
                <div className="mx-auto flex space-x-5 py-10 lg:w-[900px]">
                    <div className="mt-3 h-fit max-h-[36rem] w-[32rem] rounded-xl border bg-white p-3 drop-shadow-md">
                        <Chats setChat={setChat} />
                    </div>
                    <div className="relative mt-3 h-[36rem] w-full rounded-xl border bg-white">
                        <Room chat={currentChat} setChat={setChat} />
                    </div>
                </div>
            </section>
        </PrivateRoute>
    );
}
Chat.title = 'Chat';
Chat.Layout = EmptyLayout;

export default Chat;

export async function getServerSideProps(context) {
    if (!context.query) {
        return {
            props: {
                noQuery: true,
            },
        };
    }
    const { currentUser, otherUser } = context.query;
    let chatId = null;
    if (
        otherUser !== null &&
        otherUser !== undefined &&
        currentUser !== null &&
        currentUser !== undefined
    ) {
        const docSnap = await getDocs(
            query(
                collection(db, 'chat'),
                where(`users.${otherUser}`, '==', true),
                where(`users.${currentUser}`, '==', true),
                limit(1)
            )
        );
        docSnap.forEach((each) => {
            if (each.exists()) {
                chatId = each.id;
            }
        });
        if (chatId === null) {
            const docRef = await addDoc(collection(db, 'chat'), {
                users: {
                    [otherUser]: true,
                    [currentUser]: true,
                },
            });
            chatId = docRef.id;
        }
    }
    if (chatId !== null) {
        const getUserDoc = await getDoc(doc(db, 'users', `${otherUser}`));
        if (getUserDoc.exists()) {
            return {
                props: {
                    chat: JSON.stringify({
                        chatId: chatId,
                        userId: getUserDoc.id,
                        name: getUserDoc.data().name,
                    }),
                },
            };
        }
    }
    return {
        props: {
            hasError: true,
        },
    };
}
