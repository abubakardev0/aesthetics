import Link from 'next/link';
import Card from '@/buyer/components/artwork/Card';
import { AnimatePresence, motion } from 'framer-motion';

export default function Page({ posts }) {
    if (posts.length === 0) {
        return (
            <p className="flex h-[50vh] w-screen items-center justify-center text-center text-base font-medium md:text-xl">
                No Results
            </p>
        );
    }
    return (
        <AnimatePresence>
            <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    transition: {
                        duration: 1,
                        delay: 0.5,
                    },
                }}
                exit={{ opacity: 0 }}
                className={`h-fit columns-2 gap-4 px-2 pb-4 sm:columns-3 md:columns-4 md:gap-6 md:px-4 lg:container lg:mx-auto`}
            >
                {posts.map((item) => (
                    <Link
                        href={`/artworks${
                            item.type === 'auction' ? '/auction' : '/immediate'
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
                ))}
            </motion.div>
        </AnimatePresence>
    );
}
