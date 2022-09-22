import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

import Arrow from '@/icons/Arrow';

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

    return (
        <>
            <section className="flex h-full w-full flex-col-reverse md:h-screen md:max-h-[700px] md:flex-row">
                <div className="flex h-auto w-full flex-col items-center justify-center pt-1  md:h-full md:w-1/2 md:flex-row md:justify-start md:pt-0">
                    <div className="mt-2 flex h-fit w-full items-center justify-center gap-5 self-center md:mt-0 md:h-4/6 md:w-20 md:flex-col ">
                        {list.map((img, index) => {
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
                            <h6
                                className="animate-opacity text-xs font-medium
                                capitalize text-gray-600 md:text-base"
                            >
                                {list[currentIndex].subtitle}
                            </h6>
                            <div className="block h-fit overflow-y-hidden">
                                <h1 className="animate-text font-garamond text-xl font-semibold uppercase tracking-wide md:text-5xl">
                                    {list[currentIndex].title}
                                </h1>
                            </div>
                        </div>
                        <p className="w-full animate-opacity text-sm tracking-wide text-gray-600 md:w-5/6 md:text-xl">
                            {list[currentIndex].description}
                        </p>
                        <button className="w-32 animate-opacity rounded-sm border border-black bg-none py-2.5 text-base  transition-all hover:bg-black hover:text-white md:block md:w-36">
                            <Link href={`/${list[currentIndex].reference}`}>
                                <a className="text-sm md:text-base">
                                    {list[currentIndex].refText}
                                </a>
                            </Link>
                        </button>
                    </div>
                </div>
                <div className="relative h-[420px] w-full md:h-full md:w-1/2">
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
                    <div className="absolute bottom-2 -left-10 z-10 hidden gap-4 md:flex">
                        <button onClick={prev}>
                            <Arrow className="h-10 w-10 rotate-180 stroke-black" />
                        </button>
                        <button onClick={next}>
                            <Arrow className="h-10 w-10 stroke-black" />
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
