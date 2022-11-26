import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

import Arrow from '@/icons/Arrow';
import DottedCircle from '@/icons/DottedCircle';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const Hero = ({ list }) => {
    const [currentIndex, setIndex] = useState(0);
    const [touchPosition, setTouchPosition] = useState(null);

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
        currentIndex == list.length - 1
            ? setIndex(0)
            : setIndex(currentIndex + 1);
    };
    const next = () => {
        currentIndex === 0
            ? setIndex(list.length - 1)
            : setIndex(currentIndex - 1);
    };

    const shouldReduceMotion = useReducedMotion();

    const variants = {
        scaleDown: {
            scale: 0.8,
            y: 100,
            transition: {
                duration: 0.8,
            },
        },
        in: {
            scale: 0.8,
            y: 100,
            x: '100%',
            transition: {
                duration: 0.8,
            },
        },
        out: {
            x: '-100%',
            transition: {
                duration: 0.8,
                delay: 0.5,
            },
        },
        center: {
            x: 0,
            scale: 0.8,
            transformOrigin: 'top',
            transition: {
                duration: 0.4,
            },
        },
        scaleUp: {
            scale: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: 0.5,
                type: 'easeInOut',
            },
        },
    };

    return (
        <AnimatePresence initial={false} exitBeforeEnter>
            <motion.section className="relative flex h-full w-full flex-col-reverse overflow-hidden md:h-screen md:max-h-[900px] md:flex-row">
                <div className="flex h-auto w-full flex-col items-center justify-center pt-1  md:h-full md:w-1/2 md:flex-row md:justify-start md:pt-0">
                    <div className="z-10 mt-2 flex h-fit w-full items-center justify-center gap-5 self-center md:mt-0 md:h-4/6 md:w-1/12 md:flex-col ">
                        {list.map((img, index) => {
                            return (
                                <div
                                    key={new Date().getTime() + index}
                                    className={`${
                                        currentIndex === index
                                            ? ' h-2 w-6 bg-gray-300 md:h-6 md:w-2'
                                            : 'h-2 w-2 bg-none'
                                    } rounded-full border border-gray-300 md:border-4`}
                                />
                            );
                        })}
                    </div>
                    <div className="space-y-3 px-10 pt-2 text-center md:w-11/12 md:space-y-8 md:px-4 md:text-left">
                        <div className="space-y-1 md:space-y-3">
                            <h6
                                className="animate-opacity text-xs font-medium
                                capitalize text-gray-600 md:text-base 2xl:text-lg"
                            >
                                {list[currentIndex].subtitle}
                            </h6>
                            <div className="block h-fit overflow-y-hidden">
                                <h1 className="animate-text font-garamond text-xl font-semibold uppercase tracking-wide md:text-5xl 2xl:text-6xl">
                                    {list[currentIndex].title}
                                </h1>
                            </div>
                        </div>
                        <p className="w-full animate-opacity text-sm tracking-wide text-gray-600 md:w-5/6 md:text-xl 2xl:text-2xl">
                            {list[currentIndex].description}
                        </p>
                        <button className="w-32 animate-opacity rounded-sm border border-black bg-none py-2.5 text-base  transition-all hover:bg-black hover:text-white md:block md:w-36">
                            <Link href={`/${list[currentIndex].reference}`}>
                                <a className="text-sm md:text-base 2xl:text-lg">
                                    {list[currentIndex].refText}
                                </a>
                            </Link>
                        </button>
                    </div>
                </div>
                <motion.div
                    key={currentIndex}
                    variants={!shouldReduceMotion ? variants : null}
                    initial="in"
                    animate={['center', 'scaleUp']}
                    exit={['scaleDown', 'out']}
                    className="relative h-[420px] w-full overflow-hidden md:h-full md:w-1/2"
                >
                    <Image
                        src={list[currentIndex].image}
                        alt="hero"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        priority
                        className="animate-hero"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                    />
                </motion.div>
                <div className="absolute bottom-16 left-1/2 z-10 hidden -translate-x-1/2 md:block">
                    <button
                        onClick={prev}
                        className="group absolute right-1 h-14 w-14 rounded-full bg-neutral-50 transition-all duration-300 ease-in-out hover:scale-125"
                    >
                        <DottedCircle className="absolute inset-0 m-auto h-12 w-12 group-hover:animate-spinning" />
                        <Arrow className="absolute inset-0 m-auto h-6 w-6 rotate-180 stroke-current" />
                    </button>
                    <button
                        onClick={next}
                        className="group absolute left-1 h-14 w-14 rounded-full bg-neutral-50 transition-all duration-300 ease-in-out hover:scale-125"
                    >
                        <DottedCircle className="absolute inset-0 m-auto h-12 w-12 group-hover:animate-spinning" />

                        <Arrow className="absolute inset-0 m-auto h-6 w-6  stroke-current" />
                    </button>
                </div>
            </motion.section>
        </AnimatePresence>
    );
};

export default Hero;
