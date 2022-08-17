import React from 'react';
import Hero from '../common/components/home/Hero';
import image from '../common/components/home/image6.jpg';
import image2 from '../common/components/home/image7.jpg';
import image3 from '../common/components/home/image8.jpg';
import Card from '../modules/artworkexperience/Card';
import Loader from '@/commoncomponents/home/Loader';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';

import Link from 'next/link';
import dynamic from 'next/dynamic';

const BuyerLayout = dynamic(() => import('../layouts/BuyerLayout'), {
    suspense: true,
});
function Home() {
    const [loading, setLoading] = React.useState(true);

    return (
        <AnimateSharedLayout type="crossfade">
            <AnimatePresence>
                <div className="-mt-28">
                    {loading ? (
                        <motion.div key="loader">
                            <Loader setLoading={setLoading} />
                        </motion.div>
                    ) : (
                        <>
                            <Hero />
                            <section className="container px-2 pt-5 md:mx-auto md:px-0">
                                <div>
                                    <div className="my-12 text-center">
                                        <span className="text-sm font-medium uppercase">
                                            epitome of creativity
                                        </span>
                                        <h1 className="mt-1 font-garamond text-3xl font-semibold uppercase ">
                                            Best Picks for you
                                        </h1>
                                    </div>
                                    <div className="div-scrollbar container flex snap-x snap-mandatory items-end gap-6 overflow-x-auto md:mx-auto">
                                        <Link href={`/auction/123`}>
                                            <a className="snap-end snap-always">
                                                <Card
                                                    image={image}
                                                    artist={'Abu Bakar'}
                                                    title={'Dont go my way'}
                                                    height={59.8}
                                                    width={65.9}
                                                    medium={[
                                                        'Acrylic',
                                                        'Pastel',
                                                    ]}
                                                    surface={'Canvas'}
                                                    unit={'cm'}
                                                    date={'20/12/2012'}
                                                    price={'25,98,256'}
                                                />
                                            </a>
                                        </Link>
                                        <Link href={`/auction/123`}>
                                            <a className="snap-end snap-always">
                                                <Card
                                                    image={image3}
                                                    artist={'Abu Bakar'}
                                                    title={'Dont go my way'}
                                                    height={59.8}
                                                    width={65.9}
                                                    medium={[
                                                        'Acrylic',
                                                        'Pastel',
                                                    ]}
                                                    surface={'Canvas'}
                                                    unit={'cm'}
                                                    date={'20/12/2012'}
                                                    price={'25,98,256'}
                                                />
                                            </a>
                                        </Link>
                                        <Link href={`/auction/123`}>
                                            <a className="snap-end snap-always">
                                                <Card
                                                    image={image2}
                                                    artist={'Abu Bakar'}
                                                    title={'Dont go my way'}
                                                    height={59.8}
                                                    width={65.9}
                                                    medium={[
                                                        'Acrylic',
                                                        'Pastel',
                                                    ]}
                                                    surface={'Canvas'}
                                                    unit={'cm'}
                                                    date={'20/12/2012'}
                                                    price={'25,98,256'}
                                                />
                                            </a>
                                        </Link>
                                        <Link href={`/auction/123`}>
                                            <a className="snap-end snap-always">
                                                <Card
                                                    image={image}
                                                    artist={'Abu Bakar'}
                                                    title={'Dont go my way'}
                                                    height={59.8}
                                                    width={65.9}
                                                    medium={[
                                                        'Acrylic',
                                                        'Pastel',
                                                    ]}
                                                    surface={'Canvas'}
                                                    unit={'cm'}
                                                    date={'20/12/2012'}
                                                    price={'25,98,256'}
                                                />
                                            </a>
                                        </Link>
                                        <Link href={`/auction/123`}>
                                            <a className="snap-end snap-always">
                                                <Card
                                                    image={image2}
                                                    artist={'Abu Bakar'}
                                                    title={'Dont go my way'}
                                                    height={59.8}
                                                    width={65.9}
                                                    medium={[
                                                        'Acrylic',
                                                        'Pastel',
                                                    ]}
                                                    surface={'Canvas'}
                                                    unit={'cm'}
                                                    date={'20/12/2012'}
                                                    price={'25,98,256'}
                                                />
                                            </a>
                                        </Link>
                                        <Link href={`/auction/123`}>
                                            <a className="snap-end snap-always">
                                                <Card
                                                    image={image}
                                                    artist={'Abu Bakar'}
                                                    title={'Dont go my way'}
                                                    height={59.8}
                                                    width={65.9}
                                                    medium={[
                                                        'Acrylic',
                                                        'Pastel',
                                                    ]}
                                                    surface={'Canvas'}
                                                    unit={'cm'}
                                                    date={'20/12/2012'}
                                                    price={'25,98,256'}
                                                />
                                            </a>
                                        </Link>
                                        <Link href={`/auction/123`}>
                                            <a className="snap-end snap-always self-end">
                                                <Card
                                                    image={image3}
                                                    artist={'Abu Bakar'}
                                                    title={'Dont go my way'}
                                                    height={59.8}
                                                    width={65.9}
                                                    medium={[
                                                        'Acrylic',
                                                        'Pastel',
                                                    ]}
                                                    surface={'Canvas'}
                                                    unit={'cm'}
                                                    date={'20/12/2012'}
                                                    price={'25,98,256'}
                                                />
                                            </a>
                                        </Link>
                                        <Link href={`/auction/123`}>
                                            <a className="snap-end snap-always">
                                                <Card
                                                    image={image}
                                                    artist={'Abu Bakar'}
                                                    title={'Dont go my way'}
                                                    height={59.8}
                                                    width={65.9}
                                                    medium={[
                                                        'Acrylic',
                                                        'Pastel',
                                                    ]}
                                                    surface={'Canvas'}
                                                    unit={'cm'}
                                                    date={'20/12/2012'}
                                                    price={'25,98,256'}
                                                />
                                            </a>
                                        </Link>

                                        <Link href={`/auction/123`}>
                                            <a className="snap-end snap-always">
                                                <Card
                                                    image={image}
                                                    artist={'Abu Bakar'}
                                                    title={'Dont go my way'}
                                                    height={59.8}
                                                    width={65.9}
                                                    medium={[
                                                        'Acrylic',
                                                        'Pastel',
                                                    ]}
                                                    surface={'Canvas'}
                                                    unit={'cm'}
                                                    date={'20/12/2012'}
                                                    price={'25,98,256'}
                                                />
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                                <div className="my-12 text-center">
                                    <span className="text-sm font-medium uppercase">
                                        Discover something new
                                    </span>
                                    <h1 className="mt-1 font-garamond text-3xl font-semibold uppercase ">
                                        hot collections
                                    </h1>
                                </div>
                                <div className="flex flex-wrap justify-center gap-6">
                                    <Link href={`/auction/123`}>
                                        <a>
                                            <Card
                                                image={image}
                                                artist={'Abu Bakar'}
                                                title={'Dont go my way'}
                                                height={59.8}
                                                width={65.9}
                                                medium={['Acrylic', 'Pastel']}
                                                surface={'Canvas'}
                                                unit={'cm'}
                                                date={'20/12/2012'}
                                                price={'25,98,256'}
                                            />
                                        </a>
                                    </Link>
                                    <Link href={`/auction/123`}>
                                        <a>
                                            <Card
                                                image={image}
                                                artist={'Abu Bakar'}
                                                title={'Dont go my way'}
                                                height={59.8}
                                                width={65.9}
                                                medium={['Acrylic', 'Pastel']}
                                                surface={'Canvas'}
                                                unit={'cm'}
                                                date={'20/12/2012'}
                                                price={'25,98,256'}
                                            />
                                        </a>
                                    </Link>
                                    <Link href={`/auction/123`}>
                                        <a>
                                            <Card
                                                image={image}
                                                artist={'Abu Bakar'}
                                                title={'Dont go my way'}
                                                height={59.8}
                                                width={65.9}
                                                medium={['Acrylic', 'Pastel']}
                                                surface={'Canvas'}
                                                unit={'cm'}
                                                date={'20/12/2012'}
                                                price={'25,98,256'}
                                            />
                                        </a>
                                    </Link>
                                    <Link href={`/auction/123`}>
                                        <a>
                                            <Card
                                                image={image}
                                                artist={'Abu Bakar'}
                                                title={'Dont go my way'}
                                                height={59.8}
                                                width={65.9}
                                                medium={['Acrylic', 'Pastel']}
                                                surface={'Canvas'}
                                                unit={'cm'}
                                                date={'20/12/2012'}
                                                price={'25,98,256'}
                                            />
                                        </a>
                                    </Link>
                                    <Link href={`/auction/123`}>
                                        <a>
                                            <Card
                                                image={image}
                                                artist={'Abu Bakar'}
                                                title={'Dont go my way'}
                                                height={59.8}
                                                width={65.9}
                                                medium={['Acrylic', 'Pastel']}
                                                surface={'Canvas'}
                                                unit={'cm'}
                                                date={'20/12/2012'}
                                                price={'25,98,256'}
                                            />
                                        </a>
                                    </Link>
                                    <Link href={`/auction/123`}>
                                        <a>
                                            <Card
                                                image={image}
                                                artist={'Abu Bakar'}
                                                title={'Dont go my way'}
                                                height={59.8}
                                                width={65.9}
                                                medium={['Acrylic', 'Pastel']}
                                                surface={'Canvas'}
                                                unit={'cm'}
                                                date={'20/12/2012'}
                                                price={'25,98,256'}
                                            />
                                        </a>
                                    </Link>
                                    <Link href={`/auction/123`}>
                                        <a>
                                            <Card
                                                image={image}
                                                artist={'Abu Bakar'}
                                                title={'Dont go my way'}
                                                height={59.8}
                                                width={65.9}
                                                medium={['Acrylic', 'Pastel']}
                                                surface={'Canvas'}
                                                unit={'cm'}
                                                date={'20/12/2012'}
                                                price={'25,98,256'}
                                            />
                                        </a>
                                    </Link>
                                    <Link href={`/auction/123`}>
                                        <a>
                                            <Card
                                                image={image}
                                                artist={'Abu Bakar'}
                                                title={'Dont go my way'}
                                                height={59.8}
                                                width={65.9}
                                                medium={['Acrylic', 'Pastel']}
                                                surface={'Canvas'}
                                                unit={'cm'}
                                                date={'20/12/2012'}
                                                price={'25,98,256'}
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </section>
                        </>
                    )}
                </div>
            </AnimatePresence>
        </AnimateSharedLayout>
    );
}

Home.Layout = BuyerLayout;

export default Home;
