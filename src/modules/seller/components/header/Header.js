import Link from 'next/link';

import { auth } from '@/firebase/firebase-config';

import { User } from '@nextui-org/react';

import Logo from '@/icons/Logo';
import Notification from '../notifications/Notification';

function Header() {
    return (
        <>
            <div className="container mx-auto flex w-full items-center justify-between px-3 py-3 md:px-0 md:py-5">
                <Link href="/seller/">
                    <a>
                        <span className="hidden font-garamond text-lg font-bold sm:text-xl md:block md:text-2xl">
                            AESTHETICS
                        </span>
                        <span className="block md:hidden">
                            <Logo />
                        </span>
                    </a>
                </Link>
                <div className="inline-flex space-x-10">
                    <button className="hidden h-10 w-24 rounded-sm border border-[#2d2d2d] bg-none text-base transition-all hover:bg-[#2d2d2d] hover:text-white md:block">
                        <Link href="/">
                            <a>Buy Art</a>
                        </Link>
                    </button>
                    <div className="inline-flex items-center ">
                        <div className="relative inline-block border-gray-400 md:border-r-2">
                            <Notification />
                        </div>

                        <User
                            bordered
                            size="md"
                            name={auth.currentUser.displayName}
                            text={auth.currentUser.displayName.toUpperCase()[0]}
                            className="hidden capitalize md:flex"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
