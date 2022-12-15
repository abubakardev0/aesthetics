import { useRef } from 'react';

import Image from 'next/future/image';
import {
    AnimatePresence,
    motion,
    useScroll,
    useTransform,
} from 'framer-motion';
import asset1 from '@/assets/asset1.jpg';
import asset2 from '@/assets/asset2.jpg';

function About() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

    return (
        <AnimatePresence>
            <p className="text-sm font-medium uppercase md:text-base">
                What makes us different
            </p>
            <h2 className="mt-2 font-garamond text-4xl font-semibold md:text-5xl ">
                Why Aesthetics
            </h2>
            <motion.div className="mt-6 flex flex-col justify-around px-2 md:mt-20 md:flex-row ">
                <div ref={ref} className="relative mx-auto w-fit md:mx-0">
                    <div className="h-56 w-44 -rotate-3 overflow-hidden drop-shadow-lg md:h-96 md:w-64 2xl:h-[400px] 2xl:w-80">
                        <Image
                            src={asset1}
                            layout="fill"
                            alt="Aesthetics-artwork"
                            objectPosition="center"
                        />
                    </div>
                    <motion.div
                        style={{ y }}
                        className="absolute -bottom-14 -left-4 h-28 w-56 rotate-1 overflow-hidden drop-shadow-md md:bottom-0 md:left-28 md:h-40 md:w-80 2xl:h-48 2xl:w-[350px]"
                    >
                        <Image
                            src={asset2}
                            layout="fill"
                            alt="Aesthetics-artwork"
                            objectPosition="center"
                        />
                    </motion.div>
                </div>
                <div className="mt-20 w-full space-y-5 px-2 text-left text-base md:mt-0 md:w-96 md:px-0 md:text-lg 2xl:w-[500px] 2xl:space-y-6">
                    <p className="text-lg font-medium md:text-2xl 2xl:text-3xl">
                        Aesthetics is an online gallery that lets you interact
                        with amazing artworks in AR. It's like stepping inside
                        an artwork and exploring its every detail, but better!
                    </p>
                    <p className="2xl:text-2xl">
                        We serve as a platform that connects artists,
                        collectors, and art lovers. We are a place where you can
                        collect your favorite pieces of art in one place and use
                        our AR technology to have an interactive experience with
                        it. You can even have the artwork hung on your wall
                        straight from the app. Step inside a painting, explore
                        from every angle, or find out what a painting would look
                        like before buying. You can also buy them instantly with
                        our art marketplace.
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default About;
