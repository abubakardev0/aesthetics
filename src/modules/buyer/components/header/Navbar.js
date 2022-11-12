import { memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Navbar() {
    return (
        <>
            <ul className="mt-2 hidden space-x-4 text-current md:flex lg:space-x-6">
                <NavLink text="Home" refrence="/" />
                <NavLink text="Artworks" refrence="/artworks" />
                <NavLink text="Collections" refrence="/collections" />
                <NavLink text="Auction" refrence="/auction" />
                <NavLink text="Competitions" refrence="/competitions" />
            </ul>
            <button className="hidden h-10 w-24 rounded-sm border border-current bg-none text-base text-current md:block">
                <Link href="/sellart">
                    <a>Sell Art</a>
                </Link>
            </button>
        </>
    );
}

export default memo(Navbar);

function NavLink(props) {
    const router = useRouter();
    return (
        <li className="w-fit cursor-pointer text-sm uppercase">
            <Link href={props.refrence}>
                <a
                    className={`${
                        router.pathname == props.refrence
                            ? 'border-b border-current font-medium opacity-100 delay-100'
                            : 'border-current font-normal opacity-90 hover:border-b'
                    }`}
                >
                    {props.text}
                </a>
            </Link>
        </li>
    );
}
