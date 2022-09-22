import React from 'react';
import Link from 'next/link';
import EmptyShoppingBag from '../../../common/utils/icons/EmptyShoppingBag';

const EmptyBag = () => {
    return (
        <div className="flex flex-col items-center justify-center py-28 px-5 font-medium md:px-0">
            <EmptyShoppingBag className="h-40 w-40 md:h-56 md:w-56" />
            <h1 className="text-center text-2xl font-semibold md:text-3xl">
                Unfortunately, you bag is empty
            </h1>
            <p className="mt-4 text-sm md:text-base">
                Looks like that you haven`t made your choice yet
            </p>
            <button className="mt-4 h-fit w-fit border-2 border-black px-5 py-3 text-xs transition duration-200 hover:bg-black hover:text-white sm:text-sm md:text-base">
                <Link href="/artworks">
                    <a>Explore artworks</a>
                </Link>
            </button>
        </div>
    );
};

export default EmptyBag;
