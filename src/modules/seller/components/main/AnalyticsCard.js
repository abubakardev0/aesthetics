import { numberWithCommas } from '@/commoncomponents/functions';
const Analytics = ({ title, numbers, icon }) => {
    return (
        <div className="group h-full w-full cursor-pointer rounded-lg border-2 bg-[#FFFFF0] p-4 drop-shadow-sm">
            <h4 className="border-b pb-2 text-base tracking-wide text-gray-500">
                {title}
            </h4>
            <div className="flex items-center justify-between space-x-2 pt-5">
                <h3 className="border-b-4 border-sky-500 pb-2 text-xl font-bold md:text-3xl">
                    {numberWithCommas(numbers)}
                </h3>
                <div className="relative flex items-start text-sky-500">
                    <div className="absolute top-1 right-0 z-0 h-8 w-8 transform rounded-full bg-sky-100 duration-200 group-hover:top-2 group-hover:right-2 md:h-10 md:w-10"></div>
                    {icon}
                </div>
            </div>
        </div>
    );
};
export default Analytics;
