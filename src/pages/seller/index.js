import useSWR from 'swr';

import {
    doc,
    getDoc,
    getDocs,
    collection,
    where,
    query,
} from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import Bag from '@/icons/Bag';
import Card from '@/icons/Card';
import Artwork from '@/icons/Artwork';

import AnalyticsCard from '@/seller/components/main/AnalyticsCard';
import SellerLayout from '@/layouts/SellerLayout';
import Chart from '@/seller/components/main/BarChart';
import RecentChat from '@/seller/components/main/RecentChat';
import RecentSales from '@/seller/components/main/RecentSales';
import Error from '@/commoncomponents/Error';

function Dashboard() {
    const { data: analytics, error } = useSWR('dashboard', async () => {
        let recentSales = [];
        let totalSales = 0;
        let totalWorks = 0;
        let totalOrders = 0;
        const docSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (docSnap.exists()) {
            const artworks = docSnap.data().uploadedWorks;
            totalWorks = artworks;
        }
        const orderSnap = await getDocs(
            query(
                collection(db, 'orders'),
                where('sellers', 'array-contains', `${auth.currentUser.uid}`)
            )
        );
        orderSnap.forEach((order) => {
            if (order.exists()) {
                totalOrders++;
                recentSales.push({
                    id: order.id,
                    name: order.data().shippingDetails.name,
                    amount: order.data().totalAmount,
                    time: order.data().placedAt,
                });
                order.data().items.map((item) => {
                    if (item.sellerId === auth.currentUser.uid) {
                        totalSales += parseInt(item.price);
                    }
                });
            }
        });
        return {
            totalSales,
            totalWorks,
            totalOrders,
            recentSales,
        };
    });
    if (error) {
        return <Error />;
    }
    return (
        <>
            <main className="md:grid-row-4 grid h-screen grid-flow-row gap-3 md:grid-cols-9 md:gap-5">
                <div className="w-screen px-2 md:col-span-2 md:col-start-1 md:row-span-1 md:row-start-1 md:h-full md:w-full md:px-0">
                    <AnalyticsCard
                        title="Total Artworks"
                        numbers={analytics ? analytics.totalWorks : 0}
                        icon={
                            <Artwork
                                className="z-10 m-2 h-8 w-8 md:h-10 md:w-10"
                                fill="#1B98F5"
                                strokeWidth={2}
                            />
                        }
                    />
                </div>
                <div className="w-screen px-2 md:col-span-2 md:col-start-3 md:row-span-1 md:row-start-1 md:h-full md:w-full md:px-0 ">
                    <AnalyticsCard
                        title="Total Orders"
                        numbers={analytics ? analytics.totalOrders : 0}
                        icon={
                            <Bag
                                className="z-10 m-2 h-8 w-8 stroke-2 md:h-10 md:w-10"
                                stroke="#1B98F5"
                                strokeWidth={2}
                            />
                        }
                    />
                </div>
                <div className="w-screen px-2 md:col-span-2 md:col-start-5 md:row-span-1 md:row-start-1 md:h-full md:w-full md:px-0">
                    <AnalyticsCard
                        title="Total Sales"
                        numbers={analytics ? analytics.totalSales : 0}
                        icon={
                            <Card
                                className="z-10 m-2 h-8 w-8 md:h-10 md:w-10"
                                fill="#1B98F5"
                                strokeWidth={2}
                            />
                        }
                    />
                </div>
                <section className="h-full max-h-[600px] min-h-[400px] w-screen px-2 md:col-span-6 md:col-start-1 md:row-span-3 md:row-start-2 md:w-full">
                    <Chart />
                </section>
                <section className="h-[350px] w-screen px-2 md:col-span-3 md:col-start-7 md:row-span-2 md:row-start-1 md:w-full md:px-0">
                    <RecentChat />
                </section>
                <section className="h-[350px] w-screen px-2 md:col-span-3 md:col-start-7 md:row-span-2 md:row-start-3 md:w-full md:px-0 ">
                    <RecentSales
                        recentSales={analytics && analytics.recentSales}
                    />
                </section>
            </main>
        </>
    );
}

Dashboard.title = 'Dashboard';
Dashboard.Layout = SellerLayout;

export default Dashboard;
