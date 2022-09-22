import { useRef, useEffect, useState } from 'react';
import { db, auth } from '@/firebase/firebase-config';
import {
    addDoc,
    Timestamp,
    query,
    orderBy,
    limit,
    getDocs,
    startAfter,
    collection,
} from 'firebase/firestore';
import { Avatar } from '@nextui-org/react';
import useSWR from 'swr';
import Plane from '@/icons/Plane';

const LIMIT = 10;

const Room = ({ chat }) => {
    if (chat === undefined || chat === null) {
        return (
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-2xl font-medium">
                Aesthetics Chat App
                <br />
                <span className="text-base font-normal">
                    Connecting buyers and sellers
                </span>
            </p>
        );
    }
    const { data: list, error } = useSWR(
        'chatroom',
        async () => {
            let messages = [];
            const messageRef = collection(
                db,
                'chat',
                `${chat.chatId}`,
                'messages'
            );
            const q = query(
                messageRef,
                orderBy('sentAt', 'desc'),
                limit(LIMIT)
            );
            const docSnap = await getDocs(q);
            docSnap.forEach((doc) => {
                if (doc.exists) {
                    messages.push({ id: doc.id, ...doc.data() });
                }
            });
            return messages;
        },
        { refreshInterval: 500 }
    );
    if (error) {
        return <p>Cannot load messages!</p>;
    }
    const [messages, setMessages] = useState(list);
    const textRef = useRef(null);
    const dummy = useRef();

    const sendMessage = async (e) => {
        e.preventDefault();
        if (
            textRef.current.value === undefined ||
            textRef.current.value === null
        )
            return;
        await addDoc(collection(db, 'chat', `${chat.chatId}`, 'messages'), {
            text: textRef.current.value,
            sentAt: Timestamp.fromDate(new Date()),
            sentBy: auth.currentUser.uid,
        });

        textRef.current.value = '';
    };

    async function getMoreMessages() {
        const last = messages[messages.length - 1];
        let newMessages = [];
        const cursor = last.sentAt;
        const messageRef = collection(db, 'chat', `${chat.chatId}`, 'messages');
        const q = query(
            messageRef,
            orderBy('sentAt', 'desc'),
            startAfter(cursor),
            limit(LIMIT)
        );
        const docSnap = await getDocs(q);
        docSnap.forEach((doc) => {
            if (doc.exists) {
                newMessages.push({ id: doc.id, ...doc.data() });
            }
        });
        setMessages(messages.concat(newMessages));
    }
    useEffect(() => {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (
        <>
            <ul className="no-scrollbar relative flex h-5/6 w-full flex-col-reverse overflow-y-auto px-3 pt-3">
                {messages &&
                    messages.map((msg) => (
                        <ChatMessage
                            key={msg.id}
                            message={msg}
                            photo={chat.photo}
                            name={chat.name}
                        />
                    ))}
                {messages && messages.length === LIMIT && (
                    <button
                        onClick={getMoreMessages}
                        className="text-blue-500 underline"
                    >
                        Load More
                    </button>
                )}
                <span ref={dummy}></span>
            </ul>

            <form onSubmit={sendMessage} className="absolute bottom-1 w-full">
                <div className="flex w-full items-center justify-between border-t border-gray-300 p-3">
                    <input
                        ref={textRef}
                        type="text"
                        placeholder="Type message here..."
                        className="mx-3 block w-full rounded-full border bg-gray-100 py-2 pl-4 outline-none drop-shadow-sm focus:text-gray-700"
                        required
                    />
                    <button
                        type="submit"
                        disabled={textRef.current?.value === null}
                        className="rounded-full bg-blue-500/90 p-2"
                    >
                        <Plane className="h-6 w-6" fill="white" />
                    </button>
                </div>
            </form>
        </>
    );
};

export default Room;

function ChatMessage(props) {
    const { text, sentBy } = props.message;
    const url = props.photo;
    const name = props.name;
    const messageClass = sentBy === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <>
            {messageClass === 'sent' ? (
                <li className="mt-1 flex justify-end">
                    <div className="relative flex max-w-xl items-center space-x-2">
                        <span className="rounded-t-3xl rounded-bl-3xl bg-blue-500/90 px-4 py-2 text-white shadow">
                            {text}
                        </span>
                    </div>
                </li>
            ) : (
                <li className="mt-1 flex justify-start">
                    <div className="relative flex max-w-xl items-center space-x-2">
                        {url ? (
                            <Avatar size="lg" src={url} />
                        ) : (
                            <Avatar size="lg" text={name} />
                        )}
                        <span className="rounded-t-3xl rounded-br-3xl bg-slate-100 px-4 py-2  text-gray-700 shadow">
                            {text}
                        </span>
                    </div>
                </li>
            )}
        </>
    );
}
