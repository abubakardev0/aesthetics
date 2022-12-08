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
            <section className="relative grid h-screen w-full place-content-center bg-gray-100">
                <button
                    onClick={() => router.back()}
                    className="fixed left-5 top-3 z-50 rounded-full border bg-white p-2 hover:bg-gray-50"
                >
                    <Arrow className="h-6 w-6 -rotate-180" />
                </button>
                <div className="mx-auto flex flex-col gap-2 px-3 py-14 md:flex-row md:gap-5 md:py-10 lg:w-[900px] 2xl:w-[1020px]">
                    <div className="mt-3 h-fit max-h-[36rem] w-full overflow-x-auto rounded-xl border bg-white p-3 drop-shadow-md md:w-[32rem] md:overflow-hidden">
                        <Chats setChat={setChat} />
                    </div>
                    <div className="relative mt-3 flex h-[36rem] w-full flex-col rounded-xl border bg-white 2xl:h-[40rem]">
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
    if (otherUser && currentUser) {
        const docSnap = await getDocs(
            query(
                collection(db, 'chat'),
                where(`users.${otherUser}`, '==', true),
                where(`users.${currentUser}`, '==', true),
                limit(1)
            )
        );
        docSnap.forEach((each) => {
            chatId = each.id;
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
