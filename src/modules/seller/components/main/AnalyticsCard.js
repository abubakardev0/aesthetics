import { numberWithCommas } from '@/commoncomponents/functions';
const Analytics = ({ title, numbers, icon, duration, type, percent }) => {
    return (
        <div className="group h-full w-full cursor-pointer rounded-2xl border-2 bg-white p-4 drop-shadow-lg">
            <h4 className="border-b pb-2 text-base tracking-wide text-gray-500">
                {title}
            </h4>
            <div className="flex justify-between space-x-2 pt-5">
                <div className="flex flex-col space-y-1">
                    <h3 className="text-xl font-bold md:text-3xl">
                        {numberWithCommas(numbers)}
                    </h3>
                    <div className="text-sm">
                        {type === 'positive' ? (
                            <>
                                <span className="mr-1 text-lg text-green-500 md:text-xl">
                                    +{percent}%
                                </span>
                                from last {duration}
                            </>
                        ) : (
                            <>
                                <span className="mr-1 text-lg text-red-500">
                                    -{percent}%
                                </span>
                                from last {duration}
                            </>
                        )}
                    </div>
                </div>
                <div className="relative flex items-start text-sky-500">
                    <div className="absolute top-1 right-0 z-0 h-8 w-8 transform rounded-full bg-sky-100 duration-200 group-hover:top-2 group-hover:right-2 md:h-10 md:w-10"></div>
                    {icon}
                </div>
            </div>
        </div>
    );
};
export default Analytics;
