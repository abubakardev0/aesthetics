const Analytics = ({ title, numbers, icon, duration, type, percent }) => {
    return (
        <div class="group w-full cursor-pointer rounded-2xl border-2 bg-white p-4 drop-shadow-lg">
            <h4 class="border-b pb-2 text-base tracking-wide text-gray-500">
                {title}
            </h4>
            <div class="mt-4 flex justify-between space-x-2">
                <div class="flex flex-col space-y-1">
                    <h3 class="text-xl font-bold">{numbers}</h3>
                    <div class="text-sm">
                        {type === 'positive' ? (
                            <>
                                <span class="mr-1 text-lg text-green-500">
                                    +{percent}%
                                </span>
                                from last {duration}
                            </>
                        ) : (
                            <>
                                <span class="mr-1 text-lg text-red-500">
                                    -{percent}%
                                </span>
                                from last {duration}
                            </>
                        )}
                    </div>
                </div>
                <div class="relative flex items-start text-sky-500">
                    <div class="absolute top-1 right-0 z-0 h-8 w-8 transform rounded-full bg-sky-100 duration-200 group-hover:top-2 group-hover:right-2"></div>
                    {icon}
                </div>
            </div>
        </div>
    );
};
export default Analytics;
