import Bag from '@/icons/Bag';
import Card from '@/icons/Card';
import Group from '@/icons/Group';
import AnalyticsCard from '../../modules/seller/components/main/AnalyticsCard';
import SellerLayout from '@/layouts/SellerLayout';
import Chart from '../../modules/seller/components/main/BarChart';
import RecentChat from '../../modules/seller/components/main/RecentChat';
import RecentSales from '../../modules/seller/components/main/RecentSales';

function Dashboard() {
    return (
        <>
            <main className="md:grid-row-4 grid h-screen grid-flow-row gap-3 md:grid-cols-9 md:gap-5">
                <div className="w-screen px-2 md:col-span-2 md:col-start-1 md:row-span-1 md:row-start-1 md:h-full md:w-full md:px-0">
                    <AnalyticsCard
                        title="Total Sales"
                        numbers={158956}
                        icon={
                            <Card
                                className="z-10 m-2 h-8 w-8 md:h-10 md:w-10"
                                fill="#1B98F5"
                            />
                        }
                        type="positive"
                        percent={5}
                        duration="week"
                    />
                </div>
                <div className="w-screen px-2 md:col-span-2 md:col-start-3 md:row-span-1 md:row-start-1 md:h-full md:w-full md:px-0 ">
                    <AnalyticsCard
                        title="Total Orders"
                        numbers={15896}
                        icon={
                            <Bag
                                className="z-10 m-2 h-8 w-8 stroke-2 md:h-10 md:w-10"
                                stroke="#1B98F5"
                            />
                        }
                        type="positive"
                        percent={8}
                        duration="week"
                    />
                </div>
                <div className="w-screen px-2 md:col-span-2 md:col-start-5 md:row-span-1 md:row-start-1 md:h-full md:w-full md:px-0">
                    <AnalyticsCard
                        title="Total Followers"
                        numbers={156}
                        icon={
                            <Group
                                className="z-10 m-2 h-8 w-8 stroke-2 md:h-10 md:w-10"
                                stroke="#1B98F5"
                                fill="none"
                            />
                        }
                        type="negative"
                        percent={5}
                        duration="week"
                    />
                </div>
                <section className="h-full max-h-[600px] min-h-[400px] w-screen md:col-span-6 md:col-start-1 md:row-span-3 md:row-start-2 md:w-full">
                    <Chart />
                </section>
                <section className="h-[350px] w-screen px-2 md:col-span-3 md:col-start-7 md:row-span-2 md:row-start-1 md:w-full md:px-0">
                    <RecentChat />
                </section>
                <section className="h-[350px] w-screen px-2 md:col-span-3 md:col-start-7 md:row-span-2 md:row-start-3 md:w-full md:px-0 ">
                    <RecentSales />
                </section>
            </main>
        </>
    );
}

Dashboard.Layout = SellerLayout;

export default Dashboard;
