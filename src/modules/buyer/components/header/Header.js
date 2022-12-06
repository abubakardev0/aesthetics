import { useState, useRef } from 'react';
import Link from 'next/link';
import { Avatar } from '@nextui-org/react';
import { auth } from '@/firebase/firebase-config';
import useAuth from '@/hooks/useAuth';

import Navbar from './Navbar';

import SearchModel from '@/commoncomponents/navbar/SearchModel';
import Modal from '@/commoncomponents/modal/Modal';

import Logo from '@/icons/Logo';
import Search from '@/icons/Search';
import User from '@/icons/User';
import Bookmark from '@/icons/Bookmark';
import Chat from '@/icons/Chat';
import Logout from '@/icons/Logout';
import Bag from '@/icons/Bag';
import Switch from '@/icons/Switch';

function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const dropdownRef = useRef(null);

    return (
        <>
            <div className="flex items-center justify-between px-3 py-3 text-current md:py-4 lg:container lg:mx-auto">
                <div className="font-garamond text-lg font-bold sm:text-xl md:text-2xl">
                    <Link href="/">
                        <a>
                            <span className="hidden lg:block">AESTHETICS</span>
                            <div className="logo logo-triangle relative inline-block h-9 w-9 lg:hidden">
                                <svg viewBox="0 0 86 80">
                                    <polygon points="43 8 79 72 7 72"></polygon>
                                </svg>
                            </div>
                        </a>
                    </Link>
                </div>
                <Navbar />
                <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 xl:gap-6">
                    <button onClick={() => setIsSearchOpen(true)}>
                        <Search className="h-6 w-6 stroke-current opacity-75 transition hover:opacity-90 active:opacity-100 sm:h-7 sm:w-7" />
                    </button>
                    {isSearchOpen && (
                        <SearchModel openSearchModel={setIsSearchOpen} />
                    )}
                    <Link href="/bag">
                        <a className="flex cursor-pointer opacity-75 transition hover:opacity-90 active:opacity-100">
                            <Bag className="h-6 w-6 text-current sm:h-7 sm:w-7" />
                        </a>
                    </Link>
                    <div className="relative inline-block font-medium ">
                        <button
                            onClick={() => dropdownRef.current.handler()}
                            className="relative z-10 flex items-center rounded-full border border-transparent"
                        >
                            <User className="h-6 w-6 stroke-current text-current opacity-75 transition hover:opacity-90 active:opacity-100 sm:h-7 sm:w-7" />
                        </button>
                        <Modal ref={dropdownRef}>
                            <div className="absolute right-0 z-20 mt-4 w-60 overflow-hidden rounded-md border-2 border-slate-200 bg-white py-2 shadow-xl md:mt-5 lg:w-64">
                                {auth.currentUser ? (
                                    <LoggedIn user={auth.currentUser} />
                                ) : (
                                    <LoggedOut />
                                )}
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;

const LoggedIn = ({ user }) => {
    const { logout } = useAuth();
    return (
        <>
            <div className="-mt-2 flex transform items-center border-b-2 border-slate-200 p-3 text-sm text-slate-600 transition-colors duration-200 hover:bg-slate-100">
                <Avatar text={user.displayName.toUpperCase()[0]} size="md" />
                <div className="mx-2">
                    <h1 className="overflow-hidden text-ellipsis text-sm font-semibold capitalize text-slate-700 ">
                        {user.displayName}
                    </h1>
                    <p className="overflow-hidden text-ellipsis text-sm text-slate-500 ">
                        {user.email}
                    </p>
                </div>
            </div>
            <Link href="/seller">
                <a className="flex transform items-center px-3 py-2 text-sm capitalize text-slate-600 transition-colors duration-200 hover:bg-slate-100">
                    <Switch
                        className="mx-1 h-6 w-6"
                        strokeWidth={1.5}
                        stroke="currentColor"
                    />
                    <span className="mx-1 pt-1">Switch to Seller</span>
                </a>
            </Link>

            <Link href="/profile">
                <a className="flex transform items-center p-3 text-sm capitalize text-slate-600 transition-colors duration-200 hover:bg-slate-100">
                    <User className="mx-1 h-6 w-6" stroke="currentColor" />
                    <span className="mx-1 pt-1">View profile</span>
                </a>
            </Link>

            <Link href="/profile/saves">
                <a className="flex transform items-center p-3 text-sm capitalize text-slate-600 transition-colors duration-200 hover:bg-slate-100">
                    <Bookmark
                        className="mx-1 h-6 w-6"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    />
                    <span className="mx-1 pt-1">Your Saves</span>
                </a>
            </Link>
            <Link href="/chat">
                <a className="flex transform items-center p-3 text-sm capitalize text-slate-600 transition-colors duration-200 hover:bg-slate-100">
                    <Chat className="mx-1 h-6 w-6" />
                    <span className="mx-1 pt-1">Chat</span>
                </a>
            </Link>
            <button
                onClick={logout}
                className="flex w-full transform items-center p-3 text-sm font-medium capitalize text-slate-600 transition-colors duration-200 hover:bg-slate-100 "
            >
                <Logout
                    className="mx-1 h-6 w-6 stroke-current"
                    strokeWidth={1.5}
                    fill="none"
                />
                <span className="mx-1 pt-1">Log out</span>
            </button>
        </>
    );
};

const LoggedOut = () => {
    return (
        <>
            <Link href="/auth/login">
                <button className="w-full p-3 text-left text-sm text-slate-600 hover:bg-slate-100 ">
                    Log In
                </button>
            </Link>
            <Link href="/auth/register">
                <button className="w-full p-3 text-left text-sm text-slate-600 hover:bg-slate-100 ">
                    Register
                </button>
            </Link>
        </>
    );
};
