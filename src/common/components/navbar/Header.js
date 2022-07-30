import { useState, useEffect } from 'react';
import Link from 'next/link';
import Avvvatars from 'avvvatars-react';

import { auth } from '../../utils/firebase/firebase-config';
import useAuth from '../../hooks/useAuth';

import Tabbar from './Tabbar';
import Navbar from './Navbar';
import SearchModel from './SearchModel';

import Logo from '../../utils/icons/Logo';
import Search from '../../utils/icons/Search';
import User from '../../utils/icons/User';
import Heart from '../../utils/icons/Heart';
import Chat from '../../utils/icons/Chat';
import Logout from '../../utils/icons/Logout';
import Bag from '../../utils/icons/Bag';

function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlHeader = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY) {
                setShow(false);
            } else {
                setShow(true);
            }
            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlHeader);
            return () => {
                window.removeEventListener('scroll', controlHeader);
            };
        }
    }, [lastScrollY]);

    return (
        <header
            className={
                show
                    ? 'fixed top-0 z-50 w-full overflow-visible bg-[#ffffffa6] shadow-[0_0_15px_20px_#ffffffa6]'
                    : 'hidden'
            }
        >
            <div className="flex items-center justify-between px-3 py-3 md:justify-evenly md:px-0 md:py-5">
                <div className="font-garamond text-lg font-bold sm:text-xl md:text-2xl">
                    <Link href="/">
                        <a>
                            <span className="hidden md:block">AESTHETICS</span>
                            <span className="block md:hidden">
                                <Logo />
                            </span>
                        </a>
                    </Link>
                </div>
                <Navbar />
                <div className="flex items-center justify-center">
                    <button onClick={() => setIsSearchOpen(true)}>
                        <Search className="h-6 w-6 sm:h-7 sm:w-7" />
                    </button>
                    {isSearchOpen && (
                        <SearchModel openSearchModel={setIsSearchOpen} />
                    )}
                    <div className="mx-1 sm:mx-3">
                        <span className="inline-flex">
                            &#40;
                            <span className="pt-1 text-sm tracking-wide sm:text-base md:pt-0">
                                2
                            </span>
                            &#41;
                            <Link href="/bag">
                                <a>
                                    <Bag className="h-6 w-6 sm:h-7 sm:w-7" />
                                </a>
                            </Link>
                        </span>
                    </div>
                    <div className="relative inline-block font-medium ">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative z-10 flex items-center rounded-full border border-transparent p-2 focus:border-slate-200 focus:outline-none focus:ring focus:ring-slate-200 focus:ring-opacity-40"
                        >
                            <User className="h-6 w-6 sm:h-7 sm:w-7" />
                        </button>
                        {isOpen && (
                            <div className="absolute right-0 z-20 mt-2 w-60 overflow-hidden rounded-md border-2 border-slate-200 bg-white py-2 shadow-xl">
                                {auth.currentUser ? (
                                    <LoggedIn user={auth.currentUser} />
                                ) : (
                                    <LoggedOut />
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <Tabbar />
            </div>
        </header>
    );
}

export default Header;

const LoggedIn = ({ user }) => {
    const { logout } = useAuth();
    return (
        <>
            <div className="-mt-2 flex transform items-center border-b-2 border-slate-200 p-3 text-sm text-slate-600 transition-colors duration-200 hover:bg-slate-100">
                <Avvvatars value={user.displayName} />
                <div className="mx-2">
                    <h1 className="overflow-ellipsis text-sm font-semibold text-slate-700">
                        {user.displayName}
                    </h1>
                    <p className="text-sm text-slate-500 ">{user.email}</p>
                </div>
            </div>

            <Link href="/profile">
                <a className="flex transform items-center p-3 text-sm capitalize text-slate-600 transition-colors duration-200 hover:bg-slate-100">
                    <User className="mx-1 h-6 w-6" stroke="currentColor" />
                    <span className="mx-1 pt-1">View profile</span>
                </a>
            </Link>

            <Link href="/wishlist">
                <a className="flex transform items-center p-3 text-sm capitalize text-slate-600 transition-colors duration-200 hover:bg-slate-100">
                    <Heart className="mx-1 h-6 w-6" />
                    <span className="mx-1 pt-1">Save Artworks</span>
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
                className="flex w-full transform items-center p-3 text-sm capitalize text-slate-600 transition-colors duration-200 hover:bg-slate-100 "
            >
                <Logout className="mx-1 h-6 w-6" />
                <span className="mx-1 pt-1">Log out</span>
            </button>
        </>
    );
};

const LoggedOut = () => {
    return (
        <>
            <button className="w-full p-3 text-left text-sm text-slate-600 hover:bg-slate-100 ">
                <Link href="/auth/login">
                    <a>Log In</a>
                </Link>
            </button>
            <button className="w-full p-3 text-left text-sm text-slate-600 hover:bg-slate-100 ">
                <Link href="/auth/register">
                    <a>Register</a>
                </Link>
            </button>
        </>
    );
};
