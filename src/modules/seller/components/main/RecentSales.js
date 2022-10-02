import Link from 'next/link';
import { User } from '@nextui-org/react';

import { formatCurrency } from '@/commoncomponents/functions';

export default function RecentSales({ recentSales }) {
    return (
        <div className=" min-h-fit w-full space-y-3 overflow-hidden rounded-2xl border-2 bg-white p-4 drop-shadow-lg md:h-full">
            <div className="flex justify-between">
                <h3 className="text-lg font-medium">Recent Sales</h3>
                <Link href="/seller/orders">
                    <a className="text-sky-500 underline underline-offset-2">
                        View All
                    </a>
                </Link>
            </div>
            <ul className="section-scrollbar h-[300px] space-y-3 overflow-y-auto md:h-full ">
                {recentSales ? (
                    recentSales.map((order) => {
                        return (
                            <Link href={`/orders/${order.id}`} key={order.id}>
                                <Card
                                    amount={order.amount}
                                    time={order.time}
                                    name={order.name}
                                />
                            </Link>
                        );
                    })
                ) : (
                    <p className="py-2 text-center">No Orders</p>
                )}
            </ul>
        </div>
    );
}

const Card = ({ amount, time, name }) => {
    return (
        <li className="flex items-center justify-between rounded-md py-2 pr-2 odd:bg-slate-100/90">
            <User
                size="lg"
                bordered
                name={name.split(' ')[0]}
                description={new Date(time.seconds * 1000).toLocaleTimeString()}
                text={name.toUpperCase()}
            />
            <span className="text-sm uppercase">{formatCurrency(amount)}</span>
        </li>
    );
};
