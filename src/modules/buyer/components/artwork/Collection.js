import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import { myLoader } from '@/commoncomponents/functions';
import Arrow from '@/icons/Arrow';

function Collection({ category }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <>
            <Link href={`/collections/${category}`}>
                <motion.div
                    style={{
                        transform: isInView ? 'none' : 'translateX(15px)',
                        opacity: isInView ? 1 : 0,
                        transition: 'all 0.1s 0.5s',
                    }}
                    ref={ref}
                    className="relative snap-center overflow-hidden drop-shadow-md"
                >
                    <div className="h-[400px] w-[250px] overflow-hidden md:h-[550px] md:w-[350px] 2xl:h-[700px] 2xl:w-[400px]">
                        <Image
                            src={myLoader(category)}
                            height={1280}
                            width={720}
                            objectPosition="center"
                            className="object-cover"
                        />
                    </div>
                    <span className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/0 to-black/30 backdrop-blur-[0.6px]" />
                    <div className="absolute inset-0 h-full w-full">
                        <h1 className="mt-10 text-center font-garamond text-3xl font-medium capitalize text-white md:mt-14 md:text-4xl">
                            {category}
                        </h1>
                        <button className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-x-2 rounded-full border-[3px] border-dotted border-white px-4 py-1.5 text-base capitalize text-white transition-transform delay-75 duration-300 ease-in-out hover:bg-white hover:text-black md:px-6 md:text-xl 2xl:text-2xl">
                            Explore
                            <Arrow className="h-6 w-6 md:h-8 md:w-8" />
                        </button>
                    </div>
                </motion.div>
            </Link>
        </>
    );
}

export default Collection;
