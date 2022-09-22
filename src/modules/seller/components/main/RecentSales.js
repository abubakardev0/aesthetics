import Link from 'next/link';
import { User } from '@nextui-org/react';

export default function RecentSales() {
    return (
        <div className=" min-h-fit w-full space-y-3 overflow-hidden rounded-2xl border-2 bg-white p-4 drop-shadow-lg md:h-full">
            <div className="flex justify-between">
                <h3 className="text-lg font-medium">Recent Buy</h3>
                <Link href="/seller/artworks">
                    <a className="text-sky-500 underline underline-offset-2">
                        View All
                    </a>
                </Link>
            </div>
            <div className="section-scrollbar h-[300px] space-y-3 overflow-y-auto md:h-full ">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
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
        <div className="flex items-center justify-between py-2 pr-2 odd:bg-slate-100/80">
            <User
                size="lg"
                bordered
                name="Abu Bakar"
                description="10 minutes ago"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
            <div className="text-sm uppercase">
                pkr.<span className="ml-1 text-xl font-medium">15,986</span>
            </div>
        </div>
    );
};
