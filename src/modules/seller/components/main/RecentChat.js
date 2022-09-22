import Link from 'next/link';
import { Avatar } from '@nextui-org/react';

export default function Chat() {
    return (
        <div className="min-h-fit w-full space-y-3 overflow-hidden rounded-2xl border-2 bg-white p-4 drop-shadow-lg md:h-full">
            <div className="flex justify-between">
                <h3 className="text-lg font-medium">Recent Messages</h3>
                <Link href="/seller/chat">
                    <a className="text-sky-500 underline underline-offset-2">
                        View All
                    </a>
                </Link>
            </div>
            <div className="section-scrollbar h-[280px] space-y-3 overflow-y-auto md:h-full ">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
}

export const Card = () => {
    return (
        <div className="flex rounded-2xl bg-gray-50 p-2 drop-shadow">
            <Avatar
                size="md"
                bordered
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
            <span className="flex flex-col px-2.5">
                <h3 className="font-medium">User name</h3>
                <p className="truncate whitespace-pre-wrap break-all text-sm md:text-base">
                    Lorem ipsum what to de nier erfcnier rceicr creicr creincerc
                    rifnrfc rifcnerc
                </p>
                <span className="self-end text-sm">April, 2020</span>
            </span>
        </div>
    );
};
