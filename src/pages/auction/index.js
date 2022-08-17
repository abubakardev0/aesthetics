import Card from '../../modules/artworkexperience/Card';
import Link from 'next/link';

import image from '../../modules/auction/image1.jpg';
import Hero from '../../modules/auction/components/Hero';

function AuctionItems() {
    return (
        <>
            <Hero />
            <section className="container mt-5 px-2 md:mx-auto md:px-0">
                <div>
                    <div className="my-12 text-center">
                        <span className="text-sm font-medium uppercase">
                            Let’s Make a Bid.
                        </span>
                        <h1 className="mt-1 font-garamond text-3xl font-semibold uppercase ">
                            Trending Lots
                        </h1>
                    </div>
                    <div className="div-scrollbar container flex snap-x snap-mandatory gap-6 overflow-x-auto md:mx-auto">
                        <Link href={`/auction/123`}>
                            <a className="snap-end snap-always">
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
                            <a className="snap-end snap-always">
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
                            <a className="snap-end snap-always">
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
                            <a className="snap-end snap-always">
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
                            <a className="snap-end snap-always">
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
                            <a className="snap-end snap-always">
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
                            <a className="snap-end snap-always">
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
                            <a className="snap-end snap-always">
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
                            <a className="snap-end snap-always">
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
