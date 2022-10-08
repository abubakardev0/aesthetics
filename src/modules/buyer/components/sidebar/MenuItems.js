import Link from 'next/link';

import { Avatar } from '@nextui-org/react';
import { useRouter } from 'next/router';

import { auth } from '@/firebase/firebase-config';
import useAuth from '@/hooks/useAuth';

import User from '@/icons/User';
import Arrow from '@/icons/Arrow';
import Bookmark from '@/icons/Bookmark';
import Details from '@/icons/Details';
import Card from '@/icons/Card';
import Auction from '@/icons/Auction';
import Logout from '@/icons/Logout';
import Address from '@/icons/Address';

export default function MenuItems() {
    const router = useRouter();
    const { logout } = useAuth();

    return (
        <>
            <div className="relative h-full w-full overflow-y-auto bg-gray-50 px-3 pt-10 pb-4">
                <button
                    onClick={() => router.back()}
                    className="absolute right-3 top-5 inline-flex gap-1 underline-offset-2 hover:font-medium hover:underline active:font-medium active:underline md:left-3"
                >
                    <Arrow className="hidden h-6 w-6 rotate-180 text-gray-700 md:block" />
                    Back
                </button>
                <div className="mt-10 mb-5 grid place-content-center space-y-4">
                    <Avatar
                        text={auth.currentUser?.displayName}
                        className="mx-auto h-24 w-24 p-2 ring ring-blue-500 ring-offset-4"
                    />
                    <span className="text-lg font-semibold">{name}</span>
                </div>
                <ul className="space-y-4 border-t border-gray-200 pt-3">
                    <li>
                        <NavLink
                            hhref="/profile"
                            title={'Edit Profile'}
                            icon={<User className="h-6 w-6 text-gray-700" />}
                        />
                    </li>
                    <li>
                        <NavLink
                            hhref="/profile/orders/"
                            title={'Order History'}
                            icon={<Details className="h-6 w-6 text-gray-700" />}
                        />
                    </li>
                    <li>
                        <NavLink
                            hhref="/profile/bids"
                            title={'Your Bids'}
                            icon={<Auction className="h-6 w-6 text-gray-700" />}
                        />
                    </li>
                    <li>
                        <NavLink
                            hhref="/profile/saves"
                            title={'Save Artworks'}
                            icon={
                                <Bookmark
                                    className="h-6 w-6 text-gray-700"
                                    fill="none"
                                    stroke="currentcolor"
                                    strokeWidth={1.5}
                                />
                            }
                        />
                    </li>
                    <li>
                        <NavLink
                            hhref="/profile/address-details"
                            title={'Address Details'}
                            icon={
                                <Address
                                    className="h-6 w-6 text-gray-700"
                                    fill="none"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                />
                            }
                        />
                    </li>
                    <li>
                        <NavLink
                            hhref="/profile/payment-details"
                            title={'Payment Details'}
                            icon={
                                <Card
                                    className="h-6 w-6 text-gray-700"
                                    fill="currentcolor"
                                />
                            }
                        />
                    </li>
                </ul>
                <button onClick={logout} className="absolute bottom-5">
                    <NavLink
                        hhref="/auth/login"
                        title={'Logout'}
                        icon={<Logout className="h-6 w-6 text-gray-700" />}
                    />
                </button>
            </div>
        </>
    );
}

function NavLink({ icon, hhref, title }) {
    const router = useRouter();
    return (
        <Link href={hhref}>
            <a
                className={`${
                    router.pathname == hhref
                        ? 'bg-gray-200 stroke-2 font-medium text-black'
                        : 'bg-none font-normal text-gray-700'
                } flex items-center rounded-lg p-2`}
            >
                {icon}
                <span className="ml-3 flex-1 whitespace-nowrap">{title}</span>
            </a>
        </Link>
    );
}
