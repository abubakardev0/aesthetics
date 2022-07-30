import Image from 'next/image';
import React from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import image1 from './image6.jpg';
import image2 from './image7.jpg';
import image3 from './image8.jpg';
import Arrow from '../../utils/icons/Arrow';
import Link from 'next/link';

const Hero = () => {
    const images = [image1, image2, image3];
    const [currentIndex, setIndex] = React.useState(0);
    const [touchPosition, setTouchPosition] = React.useState(null);
    const ref = React.useRef(null);

    // useAnimationFrame((t) => {
    //     const rotate = Math.sin(t / 10000) * 200;
    //     const x = (1 + Math.sin(t / 1000)) * -50;
    //     ref.current.style.transform = `translate3d(${x}px , 0, 0)`;
    // });

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    };
    const handleTouchMove = (e) => {
        const touchDown = touchPosition;

        if (touchDown === null) {
            return;
        }

        const currentTouch = e.touches[0].clientX;
        const diff = touchDown - currentTouch;

        if (diff > 5) {
            next();
        }

        if (diff < -5) {
            prev();
        }
        setTouchPosition(null);
    };
    const prev = () => {
        currentIndex == images.length - 1
            ? setIndex(0)
            : setIndex(currentIndex + 1);
    };
    const next = () => {
        currentIndex === 0
            ? setIndex(images.length - 1)
            : setIndex(currentIndex - 1);
    };

    return (
        <section className="flex h-screen w-full flex-col-reverse md:flex-row">
            <div className="z-10 flex h-2/6 w-full items-center md:h-full md:w-1/2">
                <div className="ml-4 flex w-10 flex-col items-end justify-center space-y-10">
                    <button className="h-fit w-full font-medium text-gray-600 hover:text-blue-600 focus:text-black">
                        01
                    </button>
                    <button className="h-fit w-full font-medium text-gray-600 hover:text-blue-600 focus:text-black">
                        02
                    </button>
                    <button className="h-fit w-full font-medium text-gray-600 hover:text-blue-600 focus:text-black">
                        03
                    </button>
                    <button className="h-fit w-full font-medium text-gray-600 hover:text-blue-600 focus:text-black">
                        04
                    </button>
                    <button className="h-fit w-full font-medium text-gray-600 hover:text-blue-600 focus:text-black">
                        05
                    </button>
                    <button className="h-fit w-full">
                        <Arrow className="h-8 w-8 -rotate-90" />
                    </button>
                    <button className="h-fit w-full">
                        <Arrow className="h-8 w-8 rotate-90" />
                    </button>
                </div>
                <div className="px-8">
                    <motion.h1
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        variants={{
                            visible: { opacity: 1, scale: 1 },
                            hidden: { opacity: 0, scale: 0 },
                        }}
                        className="mb-4 text-xl font-medium uppercase md:text-7xl md:font-semibold"
                    >
                        Machine of Desire
                    </motion.h1>
                    <Link href="/artworks">
                        <a className="border-blue-500/90  text-sm font-bold text-blue-500 hover:border-b-2 md:text-lg ">
                            View Works
                        </a>
                    </Link>
                </div>
            </div>
            <motion.div className="relative h-4/6 w-full bg-slate-300 md:h-full md:w-1/2">
                <Image
                    // ref={ref}
                    src={images[currentIndex]}
                    alt="hero"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    priority
                    className="absolute z-0 h-full w-full"
                />
            </motion.div>
        </section>
    );
};
export default Hero;

/*
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import image1 from './image6.jpg';
import image2 from './image7.jpg';
import image3 from './image8.jpg';
import Arrow from '../../utils/icons/Arrow';
import Link from 'next/link';

const Hero = () => {
    const images = [image1, image2, image3];
    const [currentIndex, setIndex] = React.useState(0);
    const [touchPosition, setTouchPosition] = React.useState(null);
    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    };
    const handleTouchMove = (e) => {
        const touchDown = touchPosition;

        if (touchDown === null) {
            return;
        }

        const currentTouch = e.touches[0].clientX;
        const diff = touchDown - currentTouch;

        if (diff > 5) {
            next();
        }

        if (diff < -5) {
            prev();
        }

        setTouchPosition(null);
    };
    const prev = () => {
        setIndex((e) => (e > 0 ? e - 1 : images.length - 1));
    };
    const next = () => {
        setIndex((e) => (e < images.length - 1 ? e + 1 : 0));
    };
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.6,
                duration: 1,
                ease: [0.6, 0.05, -0.01, 0.9],
            },
        },
    };

    const item = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                delay: 0.4,
                duration: 1,
                easeIn: [0.6, 0.05, -0.01, 0.9],
            },
        },
    };
    return (
        <>
            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="space-y-7"
            >
                <div className="grid-col-1 grid grid-flow-col grid-rows-6 place-items-center md:grid-cols-8 ">
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 60,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="col-start-1 row-span-1 row-start-1 flex flex-col items-center justify-center space-y-3 md:col-span-3 md:col-start-1 md:row-span-3 md:row-start-2 md:items-start md:gap-3 md:space-y-8 md:pl-16 md:text-left"
                    >
                        <h1 className="font-garamond text-xl font-semibold uppercase md:text-5xl md:font-extrabold">
                            Get your Supreme Art
                        </h1>
                        <p className="mx-6 mb-5 text-center text-sm text-slate-700 md:mx-0 md:text-left md:text-2xl md:font-medium">
                            Every artist dips his brush in his own soul, and
                            paints his own nature into his pictures.
                        </p>
                        <Link href="/artworks">
                            <a className="group flex w-fit items-center border-y-2 border-l-2 border-black/90 p-1.5 text-sm font-semibold text-black transition duration-150 hover:bg-black hover:text-white md:p-3 md:text-base ">
                                View Works
                                <span className="pl-3">
                                    <Arrow className="h-6 w-6" />
                                </span>
                            </a>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{
                            opacity: 0,
                            rotate: 0,
                            x: '50%',
                        }}
                        animate={{
                            opacity: 1,
                            rotate: -8,
                            x: 0,
                            transition: {
                                delay: 0.6,
                                duration: 1,
                                easeIn: [0.6, 0.05, -0.01, 0.9],
                            },
                        }}
                        className="col-span-2 col-start-5 row-span-4 row-start-1 ml-10 hidden p-5 drop-shadow-lg md:block"
                    >
                        <Image
                            className="object-cover"
                            src={
                                images[
                                    currentIndex >= images.length - 1
                                        ? 0
                                        : currentIndex + 1
                                ]
                            }
                            alt="aesthetics"
                            width={230}
                            height={280}
                        />
                    </motion.div>
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.2,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{
                            delay: 0.6,
                            duration: 1,
                            easeIn: [0.6, 0.05, -0.01, 0.9],
                        }}
                        className="z-10 col-span-2 col-start-1 row-span-4 row-start-2 drop-shadow-lg transition-opacity duration-300 md:col-start-6 md:row-start-1"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                    >
                        <Image
                            className="object-cover "
                            src={images[currentIndex]}
                            alt="aesthetics"
                            width={320}
                            height={380}
                        />
                    </motion.div>
                    <motion.div
                        initial={{
                            opacity: 0,
                            rotate: 0,
                            x: '-50%',
                        }}
                        animate={{
                            opacity: 1,
                            rotate: 8,
                            x: 0,
                            transition: {
                                delay: 0.6,
                                duration: 1,
                                easeIn: [0.6, 0.05, -0.01, 0.9],
                            },
                        }}
                        className="col-span-2 col-start-7 row-span-4 row-start-1 hidden drop-shadow-lg md:block"
                    >
                        <Image
                            className="object-cover"
                            src={
                                images[
                                    currentIndex >= images.length - 2
                                        ? currentIndex === images.length - 1
                                            ? 1
                                            : 0
                                        : currentIndex + 2
                                ]
                            }
                            alt="aesthetics"
                            width={230}
                            height={280}
                        />
                    </motion.div>
                    <div className="col-start-1 row-start-6 grid w-36 md:col-start-7 md:row-start-5">
                        <button
                            className="place-self-center md:place-self-start"
                            onClick={prev}
                        >
                            <Arrow className="h-6 w-6 rotate-180" />
                        </button>
                        <span className="place-self-center font-garamond">
                            <span className="mr-2 text-xl font-bold">
                                {currentIndex + 1}
                            </span>
                            &#47;
                            {images.length}
                        </span>
                        <button
                            className="place-self-center md:place-self-end"
                            onClick={next}
                        >
                            <Arrow className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Hero;

*/
