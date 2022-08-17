import image1 from '../image1.jpg';
import Image from 'next/image';
import { motion } from 'framer-motion';

function Hero() {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                        duration: 1,
                    },
                }}
                className="relative -mt-28"
            >
                <div className="h-[500px] w-screen md:h-screen">
                    <Image
                        src={image1}
                        layout="fill"
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="absolute inset-0 grid h-full w-full place-content-center gap-y-4 bg-gradient-to-r from-gray-600/25 via-black/60 to-gray-600/25 text-center align-middle text-white backdrop-blur-[1px]">
                    <motion.h1
                        initial={{
                            y: '-10',
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 1,
                                delay: 0.5,
                                ease: 'easeInOut',
                            },
                        }}
                        className="mt-5 font-garamond text-3xl capitalize md:text-5xl"
                    >
                        From Our Collection
                    </motion.h1>
                    <motion.p
                        initial={{
                            y: 50,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 1,
                                delay: 0.5,
                                ease: 'easeInOut',
                            },
                        }}
                        className="w-full place-self-center px-5 text-sm tracking-wide md:w-1/2 md:px-0 md:text-xl"
                    >
                        Bid on artworks you love. We feature premium artworks
                        including modern, contemporary, and realism etc., so you
                        can find works by your favorite artists—and discover new
                        ones—all in one place.
                    </motion.p>
                </div>
            </motion.div>
        </>
    );
}

export default Hero;
