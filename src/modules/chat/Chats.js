import useSWR from 'swr';

import {
    collection,
    query,
    doc,
    where,
    getDocs,
    getDoc,
} from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import { Loading } from '@nextui-org/react';
import { Avatar } from '@nextui-org/react';

const fetchChats = async () => {
    let chats = [];
    const chatsId = await getChats();
    for (let i = 0; i < chatsId.length; i++) {
        const users = Object.keys(chatsId[i].users);
        const otherUser = users.filter((id) => id !== auth.currentUser.uid);
        const user = await getUser(otherUser.toString());
        chats.push({
            chatId: chatsId[i].chatId,
            userId: otherUser,
            name: user.name,
            photo: user.photoURL,
        });
    }
    return chats;
};
const getChats = async () => {
    let chats = [];
    const ref = collection(db, 'chat');
    const q = query(ref, where(`users.${auth.currentUser.uid}`, '==', true));
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
        if (doc.exists()) {
            chats.push({ chatId: doc.id, users: doc.data().users });
        }
    });
    return chats;
};
export const getUser = async (userId) => {
    const getUserDoc = await getDoc(doc(db, 'users', `${userId}`));
    if (getUserDoc.exists) {
        return getUserDoc.data();
    }
};

export default function Chat({ setChat }) {
    const { data: chats, error } = useSWR('user_chats', fetchChats);
    return (
        <>
            <ul className="section-scrollbar h-full overflow-y-auto">
                {(chats === undefined || chats == null) && (
                    <div className="grid place-content-center">
                        <Loading>
                            {error ? 'Unable to Fetch' : 'Loading'}
                        </Loading>
                    </div>
                )}
                {chats && chats.length === 0 && (
                    <p className="text-center">No Chat found</p>
                )}
                {chats &&
                    chats.map((chat) => {
                        return (
                            <li
                                key={chat.chatId}
                                onClick={() => setChat(chat)}
                                className="flex cursor-pointer items-center space-x-2 rounded-xl border-b px-1 py-2 transition delay-75 duration-300 ease-in-out last:border-0 hover:bg-gray-100 focus:outline-none"
                            >
                                <Avatar
                                    size="lg"
                                    text={chat.name.toUpperCase()}
                                />
                                <span className="capitalize">{chat.name}</span>
                            </li>
                        );
                    })}
            </ul>
        </>
    );
}
