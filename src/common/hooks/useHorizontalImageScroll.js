import { useState, useEffect } from 'react';

export const useHorizontalImageScroll = (imageRef, speed) => {
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const { current: image } = imageRef;
            if (image) {
                setScrollLeft(image.offsetLeft - window.pageXOffset);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [imageRef]);

    useEffect(() => {
        const { current: image } = imageRef;
        if (image) {
            image.style.transform = `translateX(${scrollLeft * speed}px)`;
        }
    }, [imageRef, scrollLeft, speed]);
};
