import { useState, useRef, useEffect } from 'react';
import Card from '@/buyer/components/artwork/Card';
import Link from 'next/link';
import Arrow from '@/icons/Arrow';
import DottedCircle from '@/icons/DottedCircle';

export default function Carousel({ list }) {
    const maxScrollWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carousel = useRef(null);
    useEffect(() => {
        if (carousel !== null && carousel.current !== null) {
            carousel.current.scrollLeft =
                carousel.current.offsetWidth * currentIndex;
        }
    }, [currentIndex]);

    useEffect(() => {
        maxScrollWidth.current = carousel.current
            ? carousel.current.scrollWidth - carousel.current.offsetWidth
            : 0;
    }, []);

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevState) => prevState - 1);
        }
    };
    const next = () => {
        if (
            carousel.current !== null &&
            carousel.current.offsetWidth * currentIndex <=
                maxScrollWidth.current
        ) {
            setCurrentIndex((prevState) => prevState + 1);
        }
    };
    const isDisabled = (direction) => {
        if (direction === 'prev') {
            return currentIndex <= 0;
        }

        if (direction === 'next' && carousel.current !== null) {
            return (
                carousel.current.offsetWidth * currentIndex >=
                maxScrollWidth.current
            );
        }

        return false;
    };
    return (
        <>
            <div className="relative flex gap-x-4">
                <button
                    onClick={prev}
                    className={
                        isDisabled('prev')
                            ? 'hidden'
                            : 'group absolute left-4 top-40 z-20 hidden h-14 w-14 rounded-full bg-neutral-50 transition-all duration-300 ease-in-out hover:scale-125 disabled:cursor-not-allowed disabled:opacity-25 md:block'
                    }
                >
                    <DottedCircle className="absolute inset-0 m-auto h-12 w-12 group-hover:animate-spinning" />

                    <Arrow className="absolute inset-0 m-auto h-6 w-6 rotate-180 stroke-current" />
                </button>

                <div
                    ref={carousel}
                    className="no-scrollbar relative z-0 flex touch-pan-x snap-x snap-mandatory items-end gap-5 overflow-auto scroll-smooth md:gap-8"
                >
                    {list.map((item) => {
                        return (
                            <Link
                                href={`/artworks${
                                    item.type === 'auction'
                                        ? '/auction'
                                        : '/immediate'
                                }/${item.id}`}
                                key={item.id}
                            >
                                <a>
                                    <Card
                                        image={item.images[0]}
                                        artist={item.artist}
                                        title={item.title}
                                        height={item.dimensions.height}
                                        width={item.dimensions.width}
                                        mediums={item.mediums}
                                        surfaces={item.surfaces}
                                        unit={item.dimensions.unit}
                                        price={item.price}
                                    />
                                </a>
                            </Link>
                        );
                    })}
                </div>
                <button
                    onClick={next}
                    className={
                        isDisabled('next')
                            ? 'hidden'
                            : 'group  absolute right-4 top-40 z-20 hidden h-14 w-14 rounded-full bg-neutral-50 transition-all duration-300  ease-in-out hover:scale-125 disabled:cursor-not-allowed disabled:opacity-25 md:block'
                    }
                >
                    <DottedCircle className="absolute inset-0 m-auto h-12 w-12 group-hover:animate-spinning" />

                    <Arrow className="absolute inset-0 m-auto h-6 w-6 stroke-current" />
                </button>
            </div>
        </>
    );
}
