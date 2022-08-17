import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Navbar() {
    return (
        <>
            <ul className="mt-2 hidden space-x-4 font-medium uppercase md:flex lg:space-x-6">
                <NavLink text="Home" refrence="/" />
                <NavLink text="Artworks" refrence="/artworks" />
                <NavLink text="Artists" refrence="/artists" />
                <NavLink text="Auction" refrence="/auction" />
                <NavLink text="Competitions" refrence="/competitions" />
            </ul>
            <button className="hidden h-10 w-24 rounded-sm border border-black bg-none text-base transition-all hover:bg-black hover:text-white md:block">
                <Link href="/sellart">
                    <a>Sell Art</a>
                </Link>
            </button>
        </>
    );
}

export default Navbar;

function NavLink(props) {
    const router = useRouter();
    return (
        <li className="w-fit cursor-pointer sm:text-xs lg:text-sm">
            <Link href={props.refrence}>
                <a
                    className={`${
                        router.pathname == props.refrence
                            ? 'border-b border-black font-medium'
                            : 'border-black font-normal transition duration-300 hover:border-b'
                    }`}
                >
                    {props.text}
                </a>
            </Link>
        </li>
    );
}
