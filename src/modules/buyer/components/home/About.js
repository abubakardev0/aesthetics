import { useParallax } from 'react-scroll-parallax';
import { useRef } from 'react';

import Image from 'next/future/image';

import asset1 from '@/assets/asset1.jpg';
import asset2 from '@/assets/asset2.jpg';

function About() {
    const target = useRef(null);
    const imageA = useParallax({
        speed: 5,
        targetElement: target.current,
    });
    return (
        <>
            <p className="text-sm font-medium uppercase md:text-base">
                What makes us different
            </p>
            <h2 className="mt-2 font-garamond text-4xl font-semibold md:text-5xl ">
                Why Aesthetics
            </h2>
            <div
                ref={target}
                className="mt-6 flex flex-col justify-around px-2 md:mt-20 md:flex-row "
            >
                <div className="relative mx-auto w-fit md:mx-0">
                    <div className="h-56 w-44 -rotate-3 overflow-hidden drop-shadow-lg md:h-96 md:w-64">
                        <Image
                            src={asset1}
                            height={300}
                            width={250}
                            alt="Aesthetics-artwork"
                            className="object-cover"
                        />
                    </div>
                    <div
                        ref={imageA.ref}
                        className="absolute -bottom-14 -left-4 h-28 w-56 rotate-1 overflow-hidden drop-shadow-md md:bottom-0 md:left-28 md:h-40 md:w-80"
                    >
                        <Image
                            src={asset2}
                            height={200}
                            width={300}
                            layout="responsive"
                            alt="Aesthetics-artwork"
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="mt-20 w-full space-y-4 px-2 text-left text-base md:mt-0 md:w-96 md:px-0 md:text-lg">
                    <p className="text-lg font-medium md:text-2xl">
                        Aesthetics is an online gallery that lets you interact
                        with amazing artworks in AR. It's like stepping inside
                        an artwork and exploring its every detail, but better!
                    </p>
                    <p>
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
            </div>
        </>
    );
}

export default About;
