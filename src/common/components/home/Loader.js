import { motion } from 'framer-motion';

import Image from 'next/image';
import image1 from './image6.jpg';
import image2 from './image7.jpg';
import image3 from './image8.jpg';
import image4 from './image7.jpg';
import image5 from './image8.jpg';

const container = {
    show: {
        transition: {
            staggerChildren: 0.35,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 200 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            ease: [0.6, 0.01, -0.05, 0.95],
            duration: 1.6,
        },
    },
    exit: {
        opacity: 0,
        y: -200,
        transition: {
            ease: 'easeInOut',
            duration: 0.8,
        },
    },
};

const itemMain = {
    hidden: { opacity: 0, y: 200 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            ease: [0.6, 0.01, -0.05, 0.95],
            duration: 1.6,
        },
    },
};

const Loader = ({ setLoading }) => {
    return (
        <motion.div className="z-50 h-screen w-screen bg-white">
            <motion.div
                variants={container}
                onAnimationComplete={() => setLoading(false)}
                initial="hidden"
                animate="show"
                exit="exit"
                className="loader-inner"
            >
                <motion.div
                    variants={item}
                    className="absolute left-10 top-16 hidden w-[250px] md:block"
                >
                    <Image
                        src={image1}
                        width={250}
                        height={250}
                        className="w-full object-cover"
                    />
                </motion.div>
                <motion.div
                    variants={itemMain}
                    className="grid h-screen place-content-center"
                >
                    <Image
                        layoutId="main-image-1"
                        src={image2}
                        width={400}
                        height={500}
                        className="object-cover"
                    />
                </motion.div>
                <motion.div
                    variants={item}
                    className="absolute right-16 top-16 hidden w-[250px] md:block "
                >
                    <Image
                        src={image3}
                        width={250}
                        height={250}
                        className="w-full object-cover"
                    />
                </motion.div>
                <motion.div
                    variants={item}
                    className="absolute right-12 bottom-8 hidden w-[300px] md:block  "
                >
                    <Image
                        src={image4}
                        width={300}
                        height={300}
                        className="w-full object-cover"
                    />
                </motion.div>
                <motion.div
                    variants={item}
                    className="absolute left-20 bottom-10 hidden w-[250px] md:block"
                >
                    <Image
                        src={image5}
                        width={250}
                        height={250}
                        className="w-full object-cover"
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Loader;
