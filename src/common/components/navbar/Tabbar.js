import Link from 'next/link';

import Artwork from '../../utils/icons/Artwork';
import Competition from '../../utils/icons/Competition';
import Plus from '../../utils/icons/Plus';
import Group from '../../utils/icons/Group';
import Auction from '../../utils/icons/Auction';

const Tabbar = () => {
    return (
        <div className="fixed bottom-1 left-0 z-50 h-fit w-full rounded-full bg-black px-10 py-4 shadow-lg md:hidden">
            <ul className="flex items-center justify-between ">
                <li>
                    <Link href="/artworks">
                        <a>
                            <Artwork className="h-6 w-6 text-white" />
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/artists">
                        <a>
                            <Group className="h-6 w-6 text-white" />
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/sellart">
                        <a>
                            <Plus className="h-6 w-6 text-white" />
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/auction">
                        <a>
                            <Auction className="h-6 w-6 text-white" />
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/competition">
                        <a>
                            <Competition className="h-6 w-6 text-white" />
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Tabbar;
