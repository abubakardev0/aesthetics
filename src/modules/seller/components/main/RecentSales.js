import Link from 'next/link';
import { User } from '@nextui-org/react';

export default function RecentSales() {
    return (
        <div className="section-scrollbar max-h-64 min-h-fit w-full space-y-3 overflow-auto rounded-2xl border-2 bg-white p-4 drop-shadow-lg">
            <div className="flex justify-between">
                <h3 className="text-lg font-medium">Recent Buy</h3>
                <Link href="/seller/artworks">
                    <a className="text-sky-500 underline underline-offset-2">
                        View All
                    </a>
                </Link>
            </div>
            <Card />
        </div>
    );
}

export const Card = () => {
    return (
        <div className="mt-3 flex items-center justify-between pr-2">
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
