import Image from 'next/image';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

function Card({ image, title }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <div
            ref={ref}
            className="mb-8 inline-block h-auto w-fit min-w-[200px] max-w-full text-left sm:min-w-[230px] md:min-w-[220px] md:max-w-[300px] lg:min-w-[220px] lg:max-w-[320px] 2xl:min-w-[300px] 2xl:max-w-[420px]"
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
                    alt="competiton"
                    className="object-cover delay-75 duration-200 hover:scale-105 active:scale-95"
                />
            </div>
            <h3 className="border-t-2 pt-3 text-base font-medium capitalize text-gray-700 md:text-xl">
                {title}
            </h3>
        </div>
    );
}

export default Card;
