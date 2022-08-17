import React from 'react';
import Link from 'next/link';
import Plane from '../../../../common/utils/icons/Plane';
import Insta from '../../../../common/utils/icons/Insta';
import Twitter from '../../../../common/utils/icons/Twitter';
import Behance from '../../../../common/utils/icons/Behance';
import { Input } from '@nextui-org/react';

function Footer() {
    return (
        <>
            <div className='before:content[""] after:content[""] flex px-2 font-semibold tracking-wide text-gray-700 before:m-auto before:mr-2 before:flex-1 before:border-b-2 after:m-auto after:ml-2 after:flex-1 after:border-b-2'>
                Aesthetics
            </div>
            <nav className="mt-10 flex justify-around text-gray-700">
                <ul className="space-y-4">
                    <li className="text-xs md:text-lg">
                        Terms &amp; Conditions
                    </li>
                    <li className="text-xs md:text-lg">Privacy Policy</li>
                    <li className="text-xs md:text-lg">About Us</li>
                </ul>
                <ul className="mr-5 flex flex-col space-y-2 md:flex-row md:space-x-12 md:space-y-0">
                    <Link href="https://www.instagram.com/" passHref={true}>
                        <a>
                            <Insta width={24} height={24} />
                        </a>
                    </Link>
                    <Link href="https://www.behance.net/" passHref={true}>
                        <a>
                            <Behance width={24} height={24} />
                        </a>
                    </Link>
                    <Link href="https://www.twitter.com/" passHref={true}>
                        <a>
                            <Twitter width={24} height={24} />
                        </a>
                    </Link>
                </ul>
                <ul className="space-y-4">
                    <li className="text-xs md:text-lg">Shipping Info</li>
                    <li className="text-xs md:text-lg">Returns</li>
                    <li className="text-xs md:text-lg">Contact</li>
                </ul>
            </nav>
            <div className="mt-10 grid w-full place-items-center">
                <h3 className="mb-3 text-base tracking-wide text-gray-700 md:text-xl">
                    Weekly News Letter
                </h3>
                <Input
                    clearable
                    contentRightStyling={false}
                    type="email"
                    placeholder="Enter E-mail"
                    aria-label="weekly newsletter subscription"
                    contentLeft={<Plane />}
                    contentRight={
                        <button className="mx-2 my-3 rounded-full bg-blue-200 px-3 py-1 text-sm text-blue-500 hover:bg-blue-300 md:text-base">
                            Subscribe
                        </button>
                    }
                />
                <h4 className="my-4 text-gray-500">
                    &copy;2023 All rights reserved
                </h4>
            </div>
        </>
    );
}

export default Footer;
