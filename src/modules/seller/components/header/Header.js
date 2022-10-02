import Link from 'next/link';

import { auth } from '@/firebase/firebase-config';

import Logo from '@/icons/Logo';
import Bell from '@/icons//Bell';

import { User } from '@nextui-org/react';

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
                    <button className="hidden h-10 w-24 rounded-sm border border-black bg-none text-base transition-all hover:bg-black hover:text-white md:block">
                        <Link href="/">
                            <a>Buy Art</a>
                        </Link>
                    </button>
                    <div className="inline-flex items-center ">
                        <span className="border-gray-400 md:border-r-2">
                            <Bell className="mr-1 h-6 w-6 fill-transparent stroke-current md:mr-2 md:h-8 md:w-8" />
                        </span>

                        <User
                            bordered
                            size="md"
                            name={auth.currentUser.displayName}
                            text={auth.currentUser.displayName}
                            className="hidden md:flex"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
