import Head from 'next/head';
import Card from '@/buyer/components/artwork/Card';
import Link from 'next/link';

import image from '../../modules/auction/image1.jpg';
import Hero from '@/auction/components/Hero';

import Trending from '@/auction/components/Trending';
function AuctionItems() {
    return (
        <>
            <Head>
                <title>Auction</title>
            </Head>
            <Hero />
            <section className="container z-50 mt-5 bg-white px-2 md:mx-auto md:px-0">
                <div>
                    <Trending />
                </div>
                <div className="my-12 text-center">
                    <span className="text-sm font-medium uppercase">
                        Your Price, Your Way
                    </span>
                    <h1 className="mt-1 font-garamond text-3xl font-semibold uppercase ">
                        Live Auction
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
    );
}

export default AuctionItems;
