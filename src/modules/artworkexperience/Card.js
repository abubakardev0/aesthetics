import Image from 'next/future/image';
import React from 'react';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

function Card(props) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <div
            ref={ref}
            className="mb-8 inline-block h-auto w-72"
            style={{
                transform: isInView ? 'none' : 'translateY(10px)',
                opacity: isInView ? 1 : 0,
                transition: 'all 0.3s 0.5s',
            }}
        >
            <div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mb-3 drop-shadow-xl"
            >
                <Image
                    src={props.image}
                    height={300}
                    width={300}
                    alt={props.title}
                    className="object-cover"
                />
            </div>
            <h3 className="border-t-2 py-1 pt-3 text-base font-medium text-gray-700 md:text-lg">
                {props.artist}
            </h3>
            <h4 className="text-base italic text-gray-700 md:text-lg">
                <span className="italic">{props.title}</span>&#44;
                <span className="ml-1 not-italic">{2015}</span>
            </h4>
            <p className="text-gray-700 ">
                {props.medium.join(' and ')} on {props.surface} <br />
                368.3 x 179.1 cm (145 x 70 1/2 in.)
            </p>
            <p className="text-xs">
                PKR.
                <span className="ml-1 text-lg text-gray-700">
                    {props.price}
                </span>
            </p>
        </div>
    );
}

export default Card;
