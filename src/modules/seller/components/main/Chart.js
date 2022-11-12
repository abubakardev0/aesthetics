import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import useSWR from 'swr';

import { formatCurrency } from '@/commoncomponents/functions';

const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

export default function Chart() {
    const { data: getData, error } = useSWR('sales', async () => {
        let data = [];
        const docSnap = await getDocs(
            query(
                collection(db, 'orders'),
                where('sellers', 'array-contains', `${auth.currentUser.uid}`)
            )
        );
        docSnap.forEach((e) => {
            if (e.exists()) {
                data.push({ items: e.data().items, date: e.data().placedAt });
            }
        });
        return data;
    });
    if (error) {
        console.log(error);
    }
    const formatter = new Intl.DateTimeFormat('en-US', {
        month: 'short',
    });
    function getMonthData(month) {
        let thisMonth = 0;
        getData &&
            getData.forEach((e) => {
                const orderMonth = formatter.format(
                    new Date(e.date.seconds * 1000)
                );
                if (orderMonth === month) {
                    e.items.map((item) => {
                        if (item.sellerId === auth.currentUser.uid) {
                            thisMonth += parseInt(item.price);
                        }
                    });
                }
            });
        return thisMonth;
    }
    function getSalesDataYearly() {
        const data = [];
        labels.map((month) => {
            const sale = getMonthData(month);
            data.push({ month, sale });
        });
        return data;
    }
    return (
        <div className="h-full w-full rounded-2xl border-2 bg-white pb-5 drop-shadow-lg">
            <h2 className="w-full py-3 text-center text-sm font-medium text-gray-600 md:text-base lg:text-lg">
                Your Monthly Sales
            </h2>
            <ResponsiveContainer width="100%" height="90%">
                <AreaChart
                    width={500}
                    height={300}
                    data={getSalesDataYearly()}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <defs>
                        <linearGradient id="sale" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="#8884d8"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="#8884d8"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        horizontal={false}
                        strokeWidth="6"
                        stroke="#f3f4f6"
                    />
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tickMargin={10}
                    />
                    <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    <Area
                        type="monotone"
                        dataKey="sale"
                        fill="#7dd3fc"
                        stroke="#0ea5e9"
                        strokeWidth="4"
                        fillOpacity={0.7}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        return (
            <div className="rounded-xl border-2 bg-slate-100 px-4 py-2.5 text-center drop-shadow-sm">
                <h4 className="border-b-2 px-2 py-1 font-medium">
                    {label} revenue
                </h4>
                <p className="text-gray-600">
                    {formatCurrency(parseInt(payload[0].value))}
                </p>
            </div>
        );
    }
    return null;
};
