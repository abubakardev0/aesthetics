import Image from 'next/image';

import hero from '@/assets/heroImage.jpg';

function Hero() {
    return (
        <>
            <section className="relative -mt-20 flex h-full w-full flex-col-reverse bg-black md:h-screen md:max-h-[700px] md:flex-row">
                <div className="absolute z-10 h-full w-full md:relative md:h-full md:w-1/2">
                    <div className="grid h-full w-full place-content-center space-y-4 text-center md:pl-20 md:text-left">
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

/*
<div className="relative -mt-28">
                <div className="z-0 h-[500px] w-screen py-10 md:h-[110vh]">
                    <Image
                        src={hero}
                        layout="fill"
                        className="object-cover"
                        priority
                        quality={50}
                    />
                </div>
                <div className="absolute inset-0 grid h-full w-full place-content-center gap-y-4 bg-gradient-to-r from-gray-600/25 via-black/60 to-gray-600/25 text-center align-middle text-white backdrop-blur-[1px]">
                    <div className="block h-fit overflow-y-hidden">
                        <h1 className="mt-5 animate-text font-garamond text-3xl capitalize md:text-5xl lg:text-6xl">
                            From Our Collection
                        </h1>
                    </div>
                    <p className="w-full animate-opacity place-self-center px-5 text-sm tracking-wide md:w-1/2 md:px-0 md:text-xl">
                        Bid on artworks you love. We feature premium artworks
                        including modern, contemporary, and realism etc., so you
                        can find works by your favorite artists—and discover new
                        ones—all in one place.
                    </p>
                </div>
            </div>
            */
