import { useRef, useState } from 'react';

import Image from 'next/image';

import { db, auth, storage } from '@/firebase/firebase-config';
import {
    addDoc,
    doc,
    Timestamp,
    query,
    orderBy,
    getDocs,
    collection,
    deleteDoc,
} from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import { Avatar, Modal } from '@nextui-org/react';
import useSWR from 'swr';

import CustomModal from '@/commoncomponents/modal/Modal';

import Artwork from '@/icons/Artwork';
import Ellipsis from '@/icons/Ellipsis';
import Plane from '@/icons/Plane';

const Room = ({ chat, setChat }) => {
    if (chat === undefined || chat === null) {
        return (
            <p className="absolute top-1/2 left-1/2 w-56 -translate-x-1/2 -translate-y-1/2 transform text-center text-2xl font-medium">
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
            const q = query(messageRef, orderBy('sentAt', 'desc'));
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
    const textRef = useRef(null);
    const imageRef = useRef(null);
    const dropdownRef = useRef(null);

    const addMessage = async (message, type) => {
        try {
            await addDoc(collection(db, 'chat', `${chat.chatId}`, 'messages'), {
                message: message,
                sentAt: Timestamp.fromDate(new Date()),
                sentBy: auth.currentUser.uid,
                type: type,
            });
            textRef.current.value = '';
        } catch (error) {
            console.log(error);
        }
    };
    const sendTextMessage = () => {
        if (
            textRef.current.value === undefined ||
            textRef.current.value === null
        )
            return;
        addMessage(textRef.current.value, 'text');
    };

    const sendImageMessage = (e) => {
        const image = e.target.files[0];
        const fileType = image.type.split('/')[1];
        const storageRef = ref(storage, `image-${Date.now()}.${fileType}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    addMessage(downloadURL, 'image');
                });
            }
        );
    };

    async function handleDelete() {
        try {
            const ref = await getDocs(
                collection(db, 'chat', `${chat.chatId}`, 'messages')
            );
            ref.forEach((document) => {
                deleteDoc(
                    doc(
                        db,
                        'chat',
                        `${chat.chatId}`,
                        'messages',
                        `${document.id}`
                    )
                );
            });
            await deleteDoc(doc(db, 'chat', `${chat.chatId}`));
            setChat(null);
        } catch (error) {
            console(error);
        }
    }
    return (
        <>
            <div className="relative flex w-full items-center space-x-3 border-b py-3 px-4">
                <Avatar size="sm" text={chat.name.toUpperCase()[0]} />
                <span className="text-xs capitalize md:text-base">
                    {chat.name}
                </span>
                <button
                    onClick={() => dropdownRef.current.handler()}
                    className="absolute right-3 top-4"
                >
                    <Ellipsis className="h-6 w-6 rotate-90" />
                </button>
                <CustomModal ref={dropdownRef}>
                    <div className="absolute right-4 top-12 z-10 w-36 overflow-hidden rounded-md border-2 bg-white p-1 drop-shadow-md delay-75 duration-500 ease-in-out">
                        <button
                            onClick={handleDelete}
                            className="w-full rounded-md py-2 text-red-500 hover:bg-red-100"
                        >
                            Delete Chat
                        </button>
                    </div>
                </CustomModal>
            </div>
            <ul className="no-scrollbar relative flex h-[450px] w-full flex-col-reverse overflow-y-auto px-3 pt-3">
                {list &&
                    list.map((msg) => {
                        return (
                            <ChatMessage
                                key={msg.id}
                                chatId={chat.chatId}
                                id={msg.id}
                                message={msg}
                                photo={chat.photo}
                                name={chat.name}
                            />
                        );
                    })}
            </ul>

            <div className="flex w-full items-center justify-between border-t border-gray-300 px-1 py-3 md:p-3">
                <input
                    ref={textRef}
                    type="text"
                    placeholder="Type message here..."
                    className="mx-1.5 block w-full rounded-full border bg-gray-100 py-2 pl-4 outline-none drop-shadow-sm focus:text-gray-700 md:mx-3"
                    required
                />
                <div className="mr-2">
                    <label htmlFor="file-input">
                        <Artwork
                            className="h-6 w-6 cursor-pointer"
                            fill="#2d2d2d"
                        />
                    </label>

                    <input
                        id="file-input"
                        ref={imageRef}
                        accept="image/*"
                        className="hidden"
                        type="file"
                        onChange={sendImageMessage}
                    />
                </div>
                <button
                    onClick={sendTextMessage}
                    disabled={textRef.current?.value === null}
                    className="rounded-full bg-blue-100 p-2.5 hover:bg-blue-200"
                >
                    <Plane className="h-6 w-6" fill="#3b82f6" />
                </button>
            </div>
        </>
    );
};

export default Room;

function ChatMessage(props) {
    const dropdownRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const { message, sentBy, sentAt, type } = props.message;
    const name = props.name;
    const messageClass = sentBy === auth.currentUser.uid ? 'sent' : 'received';

    async function handleDelete(id) {
        try {
            await deleteDoc(
                doc(db, 'chat', `${props.chatId}`, 'messages', `${id}`)
            );
        } catch (error) {
            alert(error);
        }
    }
    return (
        <>
            {messageClass === 'sent' ? (
                <li className="group flex justify-end">
                    <div className="relative rounded-t-3xl rounded-br-3xl">
                        <button
                            onClick={() => dropdownRef.current.handler()}
                            className="absolute right-0 top-3 z-10 group-hover:block lg:hidden"
                        >
                            <Ellipsis className="h-6 w-6 rotate-90 text-white" />
                        </button>
                        <CustomModal ref={dropdownRef}>
                            <div className="absolute right-5 top-0 z-20 w-32 overflow-hidden rounded-md border-2 bg-white p-1 drop-shadow-md delay-75 duration-500 ease-in-out">
                                <button
                                    onClick={() => handleDelete(props.id)}
                                    className="w-full rounded-md py-1 text-sm text-red-500 hover:bg-red-100"
                                >
                                    Delete Message
                                </button>
                            </div>
                        </CustomModal>
                        {type === 'text' ? (
                            <p className="max-w-[350px] break-all rounded-t-3xl rounded-bl-3xl bg-blue-500/90 py-2 pl-3 pr-5 text-white shadow">
                                {message}
                            </p>
                        ) : (
                            <button
                                onClick={() => setVisible(true)}
                                className="h-32 w-32 overflow-hidden rounded-xl md:h-40 md:w-40"
                            >
                                <Image
                                    src={message}
                                    height={400}
                                    width={400}
                                    className="object-cover"
                                />
                            </button>
                        )}
                        <p className="mt-1 text-right text-xs font-medium text-gray-800 md:text-sm">
                            {new Date(sentAt.seconds * 1000).toLocaleTimeString(
                                'en-US',
                                {
                                    hour12: true,
                                    hour: 'numeric',
                                    minute: 'numeric',
                                }
                            )}
                        </p>
                    </div>
                </li>
            ) : (
                <li className="flex justify-start space-x-2">
                    <Avatar size="lg" text={name.toUpperCase()[0]} />
                    <div>
                        {type === 'text' ? (
                            <p className="max-w-[350px] break-all rounded-t-3xl rounded-br-3xl bg-slate-100 px-4 py-2  text-gray-700 shadow">
                                {message}
                            </p>
                        ) : (
                            <div className="h-40 w-40 rounded-lg">
                                <Image
                                    src={message}
                                    height={400}
                                    width={400}
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <p className="mt-1 text-left text-xs font-medium text-gray-800 md:text-sm">
                            {new Date(sentAt.seconds * 1000).toLocaleTimeString(
                                'en-US',
                                {
                                    hour12: true,
                                    hour: 'numeric',
                                    minute: 'numeric',
                                }
                            )}
                        </p>
                    </div>
                </li>
            )}
            <Modal
                closeButton
                aria-labelledby="image-preview"
                open={visible}
                onClose={() => setVisible(false)}
            >
                <Modal.Body>
                    <Image
                        src={message}
                        height={600}
                        width={600}
                        className="object-contain"
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}
