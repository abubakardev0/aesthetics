import { useState, useRef, useEffect } from 'react';
import Card from '@/buyer/components/artwork/Card';
import Link from 'next/link';
import Arrow from '@/icons/Arrow';
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
                            : 'absolute left-4 top-40 z-20 hidden rounded-full border bg-neutral-50 p-3 text-neutral-700 transition-all duration-300 ease-in-out active:bg-neutral-600 active:text-white active:ring-8 active:ring-neutral-200 disabled:cursor-not-allowed disabled:opacity-25 md:block'
                    }
                >
                    <Arrow className="h-8 w-8 rotate-180" />
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
                            : 'absolute right-4 top-40 z-20 hidden rounded-full border bg-neutral-50 p-3 text-neutral-700 transition-all duration-300 ease-in-out active:bg-neutral-600 active:text-white active:ring-8 active:ring-neutral-200 disabled:cursor-not-allowed disabled:opacity-25 md:block'
                    }
                >
                    <Arrow className="h-8 w-8" />
                </button>
            </div>
        </>
    );
}
