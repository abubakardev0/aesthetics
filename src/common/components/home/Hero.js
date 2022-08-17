import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import image1 from './image6.jpg';
import image2 from './image7.jpg';
import image3 from './image8.jpg';
import Arrow from '@/icons/Arrow';

const Hero = () => {
    const images = [image1, image2, image3];
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
        <>
            <section className="flex h-full w-full flex-col-reverse md:h-screen md:flex-row">
                <div className="z-10 flex h-auto w-full flex-col items-center justify-center pt-1  md:h-full md:w-1/2 md:flex-row md:justify-start md:pt-0">
                    <div className="mt-2 flex h-fit w-full items-center justify-center gap-5 self-center md:mt-0 md:h-4/6 md:w-20 md:flex-col ">
                        {images.map((img, index) => {
                            return (
                                <div
                                    key={new Date().getTime() + index}
                                    className={`${
                                        currentIndex === index
                                            ? ' bg-gray-400'
                                            : 'bg-none'
                                    } h-2 w-2 rounded-full border-2 border-gray-400 transition-transform delay-200 duration-75 md:h-3 md:w-3 md:border-4`}
                                />
                            );
                        })}
                    </div>
                    <div className="space-y-5 px-10 pt-2 text-center md:space-y-8 md:px-4 md:text-left">
                        <div className="space-y-1 md:space-y-3">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: {
                                        duration: 1,
                                        ease: 'easeInOut',
                                        delay: 1,
                                    },
                                }}
                                className="pl-1 text-xs font-medium capitalize
                                text-gray-600 md:text-base"
                            >
                                Contemporary Collection
                            </motion.span>
                            <motion.h1
                                initial={{
                                    y: '-50',
                                    opacity: 0,
                                }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        duration: 1,
                                        ease: 'easeInOut',
                                    },
                                }}
                                className="font-garamond text-xl font-semibold uppercase tracking-wide md:text-5xl"
                            >
                                Color Outside the Lines
                            </motion.h1>
                        </div>
                        <motion.p
                            initial={{
                                y: '50',
                                opacity: 0,
                            }}
                            animate={{
                                y: 0,
                                opacity: 1,
                                transition: {
                                    duration: 1,
                                    ease: 'easeInOut',
                                    delay: 0.3,
                                },
                            }}
                            className="w-full text-sm tracking-wide text-gray-600 md:w-5/6 md:text-xl"
                        >
                            Every artist dips his brush in his own soul, and
                            paints his own nature into his pictures.
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: 1,
                                    ease: 'easeInOut',
                                    delay: 1,
                                },
                            }}
                            className="h-10 w-32 rounded-sm border border-black bg-none text-base transition-all hover:bg-black hover:text-white md:block md:h-12 md:w-36"
                        >
                            <Link href="/artworks">
                                <a className="text-sm md:text-base">
                                    View Collection
                                </a>
                            </Link>
                        </motion.button>
                    </div>
                </div>
                <motion.div className="relative h-[420px] w-full md:h-full md:w-1/2">
                    <motion.div
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        className="absolute h-full w-full"
                    >
                        <Image
                            src={images[currentIndex]}
                            alt="hero"
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            priority
                            className="animate-hero"
                        />
                    </motion.div>
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 1,
                                ease: 'easeIn',
                                delay: 1,
                            },
                        }}
                        className="absolute bottom-2 -left-10 z-10 hidden gap-4 md:flex"
                    >
                        <button onClick={prev}>
                            <Arrow className="h-10 w-10 rotate-180 stroke-black" />
                        </button>
                        <button onClick={next}>
                            <Arrow className="h-10 w-10 stroke-black" />
                        </button>
                    </motion.div>
                </motion.div>
            </section>
        </>
    );
};

export default Hero;
