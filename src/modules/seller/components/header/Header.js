import Link from 'next/link';

import Logo from '../../../../common/utils/icons/Logo';
import { Input, Dropdown, User, Text, Avatar } from '@nextui-org/react';
import Search from '../../../../common/utils/icons/Search';
import Bell from '../../../../common/utils/icons//Bell';
function Header() {
    return (
        <>
            <div className="flex items-center justify-between py-3 pl-2 md:justify-around md:px-5 md:py-5">
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
                <div className="mx-2 inline-flex w-full md:w-5/12">
                    <Input
                        type="search"
                        aria-label="search"
                        placeholder="Search"
                        rounded
                        width="100%"
                        contentLeft={<Search className="h-8 w-8" />}
                        autoComplete="on"
                    />
                </div>
                <button className="hidden h-10 w-24 rounded-sm border border-black bg-none text-base transition-all hover:bg-black hover:text-white md:block">
                    <Link href="/">
                        <a>Buy Art</a>
                    </Link>
                </button>
                <div className="inline-flex items-center space-x-2 md:space-x-3">
                    <span className="border-r-2 border-gray-400">
                        <Bell className="mr-1 h-6 w-6 fill-transparent stroke-current md:mr-2 md:h-8 md:w-8" />
                    </span>
                    <Dropdown placement="bottom-left">
                        <Dropdown.Trigger>
                            <User
                                bordered
                                as="button"
                                size="md"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            />
                        </Dropdown.Trigger>
                        <Dropdown.Menu
                            color="primary"
                            aria-label="User Actions"
                        >
                            <Dropdown.Item
                                key="profile"
                                css={{ height: '$18' }}
                            >
                                <Text b color="inherit" css={{ d: 'flex' }}>
                                    Signed in as
                                </Text>
                                <Text b color="inherit" css={{ d: 'flex' }}>
                                    zoey@example.com
                                </Text>
                            </Dropdown.Item>
                            <Dropdown.Item key="settings" withDivider>
                                Profile Settings
                            </Dropdown.Item>
                            <Dropdown.Item key="help_and_feedback" withDivider>
                                Help & Feedback
                            </Dropdown.Item>
                            <Dropdown.Item
                                key="logout"
                                color="error"
                                withDivider
                            >
                                Log Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </>
    );
}

export default Header;
