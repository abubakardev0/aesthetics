import { useState } from 'react';
import Image from 'next/image';

import { Modal } from '@nextui-org/react';

import Arrow from '@/icons/Arrow';

export default function Slider({ images }) {
    const [currentIndex, setIndex] = useState(0);
    const [touchPosition, setTouchPosition] = useState(null);
    const [visible, setVisible] = useState(false);

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
            <div className="flex items-center justify-center pt-10 pb-5 md:py-0">
                <button
                    onClick={prev}
                    className={
                        images.length === 1
                            ? 'hidden'
                            : 'hidden rounded-full border-2 bg-gray-300/50 p-2 hover:opacity-90 md:block'
                    }
                >
                    <Arrow className="h-5 w-5 rotate-180" />
                </button>
                <div className="mx-2 h-auto w-fit">
                    <Image
                        src={images[currentIndex]}
                        height={450}
                        width={450}
                        onClick={() => setVisible(true)}
                        className="object-contain drop-shadow-lg"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        priority
                    />
                </div>
                <button
                    onClick={next}
                    className={
                        images.length === 1
                            ? 'hidden'
                            : 'hidden rounded-full border-2 bg-gray-300/50 p-2 hover:opacity-90 md:block'
                    }
                >
                    <Arrow className="h-5 w-5" />
                </button>
            </div>
            <div className="mt-2 flex h-fit w-full items-center justify-center gap-2">
                {images.map((img, index) => {
                    return (
                        <div
                            key={new Date().getTime() + index}
                            className={`${
                                currentIndex === index
                                    ? ' w-4 bg-gray-400'
                                    : 'w-2 bg-none'
                            } h-2 rounded-full border-2 border-gray-400 transition-transform delay-200 duration-75`}
                        />
                    );
                })}
            </div>
            <Modal
                closeButton
                aria-labelledby="expand-artwork"
                open={visible}
                fullScreen={true}
                className="grid place-content-center"
                onClose={() => setVisible(false)}
            >
                <Image
                    src={images[currentIndex]}
                    height={500}
                    width={500}
                    className="object-contain"
                />
            </Modal>
        </>
    );
}
