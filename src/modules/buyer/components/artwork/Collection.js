import { motion, useTransform, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { myLoader } from '@/commoncomponents/functions';
import Arrow from '@/icons/Arrow';

function Collection({ category }) {
    const y = useMotionValue(0.5);
    const x = useMotionValue(0.5);

    const rotateY = useTransform(x, [0, 1], [-8, 8], {
        clamp: true,
    });
    const rotateX = useTransform(y, [0, 1], [8, -8], {
        clamp: true,
    });

    const onMove = (e) => {
        const bounds = e.currentTarget.getBoundingClientRect();

        const xValue = (e.clientX - bounds.x) / e.currentTarget.clientWidth;
        const yValue = (e.clientY - bounds.y) / e.currentTarget.clientHeight;

        x.set(xValue, true);
        y.set(yValue, true);
    };
    return (
        <>
            <Link href={`/collections/${category}`}>
                <motion.div
                    onPointerMove={onMove}
                    style={{
                        rotateY,
                        rotateX,
                    }}
                    className="relative snap-center drop-shadow-md"
                >
                    <div className="h-[400px] w-[250px] overflow-hidden md:h-[500px] md:w-[300px] 2xl:h-[600px] 2xl:w-[350px]">
                        <Image
                            src={myLoader(category)}
                            height={1280}
                            width={720}
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
