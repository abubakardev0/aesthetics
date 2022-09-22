import { memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Navbar() {
    return (
        <>
            <ul className="mt-2 hidden space-x-4 md:flex lg:space-x-6">
                <NavLink text="Home" refrence="/" />
                <NavLink text="Artworks" refrence="/artworks" />
                <NavLink text="Collections" refrence="/collections" />
                <NavLink text="Auction" refrence="/auction" />
                <NavLink text="Competitions" refrence="/competitions" />
            </ul>
            <button className="hidden h-10 w-24 rounded-sm border border-[#2D2D2D] bg-none text-base transition-all hover:bg-[#2D2D2D] hover:text-white md:block">
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
        <li className="w-fit cursor-pointer text-xs uppercase md:text-sm lg:text-base">
            <Link href={props.refrence}>
                <a
                    className={`${
                        router.pathname == props.refrence
                            ? 'border-b border-black font-medium opacity-100 delay-100'
                            : 'border-black font-normal opacity-90 hover:border-b'
                    }`}
                >
                    {props.text}
                </a>
            </Link>
        </li>
    );
}
