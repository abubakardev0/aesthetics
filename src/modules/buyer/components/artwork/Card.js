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
            className="mb-8 inline-block h-auto w-fit min-w-[140px] max-w-[300px] text-left md:min-w-[180px] lg:min-w-[240px]"
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
            <h3 className="border-t-2 pt-3 text-base font-medium capitalize text-gray-700 md:text-xl">
                {artist}
            </h3>
            <h4 className="text-sm capitalize italic text-gray-700 sm:text-base md:text-lg">
                {title}
            </h4>
            <p className="hidden text-base text-gray-700 md:block">
                <span className="mr-1 capitalize">
                    {mediums && mediums.join(' and ')}
                </span>
                on <span className="ml-1 capitalize">{surfaces}</span>
                <br />
                {height} H x {width} W {unit}
            </p>
            <p className="text-base text-gray-700 md:text-lg">
                {formatCurrency(price)}
            </p>
        </div>
    );
}

export default Card;
