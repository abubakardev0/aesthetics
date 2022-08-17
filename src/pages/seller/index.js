import Bag from '../../common/utils/icons/Bag';
import Card from '../../common/utils/icons/Card';
import Group from '../../common/utils/icons/Group';
import AnalyticsCard from '../../modules/seller/components/main/AnalyticsCard';
import SellerLayout from '../../layouts/SellerLayout';
import Chart from '../../modules/seller/components/main/BarChart';
import RecentChat from '../../modules/seller/components/main/RecentChat';
import RecentSales from '../../modules/seller/components/main/RecentSales';

function Dashboard() {
    return (
        <>
            <main className="md:grid-row-4 grid h-fit grid-flow-row gap-y-4 md:grid-cols-9 md:gap-y-8 md:gap-x-0">
                <div className="w-full px-5 md:col-span-2 md:col-start-1 md:row-span-1 md:row-start-1">
                    <AnalyticsCard
                        title="Total Sales"
                        numbers={158956}
                        icon={
                            <Card className="z-10 m-2 h-8 w-8" fill="#1B98F5" />
                        }
                        type="positive"
                        percent={5}
                        duration="week"
                    />
                </div>
                <div className="w-full px-5 md:col-span-2 md:col-start-3 md:row-span-1 md:row-start-1">
                    <AnalyticsCard
                        title="Total Orders"
                        numbers={15896}
                        icon={
                            <Bag
                                className="z-10 m-2 h-8 w-8 stroke-2"
                                stroke="#1B98F5"
                            />
                        }
                        type="positive"
                        percent={8}
                        duration="week"
                    />
                </div>
                <div className="w-full px-5 md:col-span-2 md:col-start-5 md:row-span-1 md:row-start-1">
                    <AnalyticsCard
                        title="Total Followers"
                        numbers={156}
                        icon={
                            <Group
                                className="z-10 m-2 h-8 w-8 stroke-2"
                                stroke="#1B98F5"
                                fill="none"
                            />
                        }
                        type="negative"
                        percent={5}
                        duration="week"
                    />
                </div>
                <section className="w-full px-4 md:col-span-6 md:col-start-1 md:row-span-3 md:row-start-2">
                    <Chart />
                </section>
                <section className="w-full px-4 md:col-span-3 md:col-start-7 md:row-span-2 md:row-start-1">
                    <RecentChat />
                </section>
                <section className="w-full px-4 md:col-span-3 md:col-start-7 md:row-span-2 md:row-start-3 ">
                    <RecentSales />
                </section>
            </main>
        </>
    );
}

Dashboard.Layout = SellerLayout;

export default Dashboard;
