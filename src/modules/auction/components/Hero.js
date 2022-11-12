import Image from 'next/image';

import hero from '@/assets/heroImage.jpg';

function Hero() {
    return (
        <>
            <section className="relative flex h-full w-full flex-col-reverse bg-black md:h-screen md:max-h-[700px] md:flex-row">
                <div className="absolute z-10 h-full w-full md:relative md:h-full md:w-1/2">
                    <div className="grid h-full w-full place-content-center space-y-4 px-4 text-center md:px-0 md:pl-20 md:text-left">
                        <div className="block h-fit overflow-y-hidden">
                            <h1 className="mt-5 animate-text font-garamond text-xl capitalize text-white md:text-5xl lg:text-6xl">
                                From Our Collection
                            </h1>
                        </div>
                        <p className="animate-opacity text-sm tracking-wide text-white md:w-full md:text-xl">
                            Bid on artworks you love. We feature premium
                            artworks including modern, contemporary, and realism
                            etc., so you can find works by your favorite
                            artists—and discover new ones—all in one place.
                        </p>
                    </div>
                </div>
                <div className="relative h-[420px] w-full md:h-full md:w-1/2">
                    <Image
                        src={hero}
                        alt="hero"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        priority
                        className="animate-hero"
                    />
                    <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-gray-500/20 via-black/50 to-gray-500/20 backdrop-blur-[0.8px] md:from-black md:via-black/20" />
                </div>
            </section>
        </>
    );
}

export default Hero;
