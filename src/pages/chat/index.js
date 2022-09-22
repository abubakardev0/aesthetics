import { useState } from 'react';

import { useRouter } from 'next/router';

import { auth } from '@/firebase/firebase-config';

import Loader from '@/commoncomponents/Loader';
import Chats from '@/chat/Chats';
import Room from '@/chat/Room';
import EmptyLayout from '@/layouts/EmptyLayout';
import Arrow from '@/icons/Arrow';

function Chat() {
    const router = useRouter();
    if (!auth.currentUser) {
        router.replace('/auth/login');
        return <Loader />;
    }
    const [currentChat, setChat] = useState(null);
    return (
        <>
            <section className="relative h-screen w-screen bg-gray-100">
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
                        <Room chat={currentChat} />
                    </div>
                </div>
            </section>
        </>
    );
}
Chat.Layout = EmptyLayout;

export default Chat;
