import Image from 'next/future/image';
import React from 'react';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

import { formatCurrency } from '@/commoncomponents/functions';

function Card({
    artist,
    title,
    mediums,
    surfaces,
    image,
    height,
    width,
    unit,
    price,
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <div
            ref={ref}
            className="mb-8 inline-block h-auto w-fit min-w-[200px] max-w-full text-left sm:min-w-[230px] md:min-w-[220px] md:max-w-[300px] lg:min-w-[200px] lg:max-w-[320px] 2xl:min-w-[300px] 2xl:max-w-[420px]"
            style={{
                transform: isInView ? 'none' : 'translateY(10px)',
                opacity: isInView ? 1 : 0,
                transition: 'all 0.3s 0.5s',
            }}
        >
            <div className="mb-3 drop-shadow-xl">
                <Image
                    src={image}
                    height={400}
                    width={400}
                    alt={title}
                    className="object-cover delay-75 duration-200 hover:scale-105 active:scale-95"
                />
            </div>
            <h3 className="border-t-2 pt-3 text-base font-medium capitalize text-gray-700 md:text-xl 2xl:text-2xl">
                {artist}
            </h3>
            <h4 className="text-sm capitalize italic text-gray-700 sm:text-base md:text-lg 2xl:text-xl">
                {title}
            </h4>
            <p className="hidden text-base text-gray-700 md:block 2xl:text-lg">
                <span className="mr-1 capitalize">
                    {mediums && mediums.join(' and ')}
                </span>
                on <span className="ml-1 capitalize">{surfaces}</span>
                <br />
                {height} H x {width} W {unit}
            </p>
            <p className="text-base text-gray-700 md:text-lg 2xl:text-xl">
                {formatCurrency(price)}
            </p>
        </div>
    );
}

export default Card;
