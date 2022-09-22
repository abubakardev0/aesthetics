import Image from 'next/image';

import hero from '@/assets/heroImage.jpg';

function Hero() {
    return (
        <>
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
        </>
    );
}

export default Hero;
