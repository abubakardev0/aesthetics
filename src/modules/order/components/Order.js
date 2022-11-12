import Image from 'next/image';

import { formatCurrency } from '@/commoncomponents/functions';

const Order = ({ items }) => {
    return (
        <div className="flex w-full flex-col items-start justify-start rounded-md bg-white px-4 py-4 drop-shadow-md md:p-6 md:py-6 xl:p-8">
            <p className="text-lg font-semibold leading-6 text-gray-800 md:text-xl xl:leading-5">
                Your Order
            </p>
            <div className="mt-4 flex w-full  flex-col items-start justify-start md:mt-6 md:flex-row md:items-center md:space-x-6 xl:space-x-8 ">
                {items.map((item) => {
                    return (
                        <>
                            <div className="flex h-96 w-full flex-col items-start justify-start space-y-4  md:mt-0 md:h-36 md:flex-row  md:items-center md:space-x-6 xl:space-x-8 ">
                                <div className="relative h-full w-full md:w-40">
                                    <Image
                                        src={item.image}
                                        layout="fill"
                                        objectFit="cover"
                                        objectPosition="center"
                                        priority
                                    />
                                </div>
                                <div className="flex w-full flex-col items-start justify-between space-y-4 pb-5 md:flex-row md:justify-between md:space-y-0">
                                    <div className="flex w-full flex-col leading-loose">
                                        <h3 className="text-2xl font-medium capitalize text-gray-800">
                                            {item.title}
                                        </h3>
                                        <p className="text-base capitalize text-gray-700 first-letter:lowercase">
                                            by {item.artist}
                                        </p>
                                    </div>
                                    <p className="text-xl font-medium">
                                        {formatCurrency(item.price)}
                                    </p>
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default Order;
