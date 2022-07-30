import React from 'react';
import { Avatar } from '@nextui-org/react';
import { auth } from '../../../common/utils/firebase/firebase-config';
import User from '../../utils/icons/User';
import Bookmark from '../../utils/icons/Bookmark';
import Details from '../../utils/icons/Details';
import Card from '../../utils/icons/Card';
import Auction from '../../utils/icons/Auction';
import Logout from '../../utils/icons/Logout';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Sidebar() {
    const profile = auth.currentUser.photoURL;
    const name = auth.currentUser.displayName;
    return (
        <>
            <div className="overflow-y-auto rounded bg-gray-50 px-3 pt-10 pb-4 ">
                <div className="mb-3 grid place-content-center space-y-4">
                    {profile ? (
                        <Avatar
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            className="mx-auto h-24 w-24 p-2 ring ring-blue-500 ring-offset-4"
                        />
                    ) : (
                        <Avatar
                            text={name}
                            className="mx-auto h-24 w-24 p-2 ring ring-blue-500 ring-offset-4"
                        />
                    )}
                    <span className="text-lg font-semibold">{name}</span>
                </div>
                <ul className="space-y-2 border-t border-gray-200 pt-3">
                    <li>
                        <NavLink
                            hhref="/profile"
                            title={'Edit Profile'}
                            icon={<User className="h-6 w-6 text-gray-700" />}
                        />
                    </li>
                    <li>
                        <NavLink
                            hhref="/orders"
                            title={'Order History'}
                            icon={<Details className="h-6 w-6 text-gray-700" />}
                        />
                    </li>
                    <li>
                        <NavLink
                            hhref="/bids"
                            title={'Your Bids'}
                            icon={<Auction className="h-6 w-6 text-gray-700" />}
                        />
                    </li>
                    <li>
                        <NavLink
                            hhref="/saves"
                            title={'Save & Follows'}
                            icon={
                                <Bookmark className="h-6 w-6 text-gray-700" />
                            }
                        />
                    </li>
                    <li>
                        <NavLink
                            hhref="/payment-details"
                            title={'Payment Details'}
                            icon={<Card className="h-6 w-6 text-gray-700" />}
                        />
                    </li>
                    <li>
                        <NavLink
                            hhref="/see-you-later"
                            title={'Logout'}
                            icon={<Logout className="h-6 w-6 text-gray-700" />}
                        />
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;

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
