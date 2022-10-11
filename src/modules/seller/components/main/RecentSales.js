import Link from 'next/link';
import { User, Loading } from '@nextui-org/react';

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
                {!recentSales && (
                    <div className="grid h-full w-full place-content-center">
                        <Loading />
                    </div>
                )}
                {recentSales &&
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
                    })}
                {recentSales && recentSales.length === 0 && (
                    <p className="py-[25%] text-center">No Recent Orders</p>
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
                description={new Date(time.seconds * 1000).toLocaleDateString(
                    'en-US',
                    {
                        hour12: true,
                        hour: 'numeric',
                        minute: 'numeric',
                    }
                )}
                text={name.toUpperCase()[0]}
            />
            <span className="text-sm uppercase">{formatCurrency(amount)}</span>
        </li>
    );
};
