import Image from 'next/image';

import { formatCurrency } from '@/commoncomponents/functions';

import Delete from '@/icons/Delete';

const ItemBlock = ({ item, remove }) => {
    return (
        <div className="flex h-96 w-full flex-col items-start justify-start space-y-4 pr-4 md:mt-0 md:h-36 md:w-[750px] md:flex-row md:items-center md:space-x-6 xl:space-x-8 ">
            <div className="relative h-40 w-[40vh] sm:w-[45vh] md:h-full md:w-40">
                <Image
                    src={item.images[0]}
                    alt="hero"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    priority
                />
            </div>
            <div className="flex w-full flex-col items-start justify-between space-y-4 pb-5 md:flex-row md:justify-between md:space-y-0">
                <div className="flex w-full flex-col items-start justify-start space-y-4 md:space-y-8">
                    <h3 className="text-2xl font-medium capitalize text-gray-800">
                        {item.title}
                    </h3>
                    <div className="flex flex-col items-start justify-start space-y-2">
                        <p className="text-base capitalize leading-none text-gray-800">
                            <span className=" mr-1 text-gray-500">Artist:</span>
                            {item.artist}
                        </p>
                        <p className="text-base leading-none text-gray-800">
                            <span className="text-gray-500">Size: </span>
                            {item.dimensions.height} H x {item.dimensions.width}{' '}
                            W {item.dimensions.unit}
                        </p>
                    </div>
                </div>
                <div className="flex w-full flex-row items-center justify-between md:flex-col md:space-y-10">
                    <div className="text-lg font-medium text-gray-800 md:self-end">
                        {formatCurrency(parseInt(item.price))}
                    </div>
                    <button
                        onClick={() => remove(item.id)}
                        className="md:self-end"
                    >
                        <Delete
                            className="stroke-red h-6 w-6 transition-colors hover:fill-red-200 md:h-8 md:w-8"
                            fill="none"
                            stroke="red"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemBlock;
