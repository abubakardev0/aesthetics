import Link from 'next/link';

import { collection, getDocs, query, limit, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';

import Card from '@/buyer/components/artwork/Card';
import Hero from '@/auction/components/Hero';
import Trending from '@/auction/components/Trending';
import Error from '@/commoncomponents/Error';

function Auction({ artworks, hasError }) {
    if (hasError) {
        return <Error />;
    }
    const posts = JSON.parse(artworks);
    return (
        <>
            <Hero />
            <section className="container z-50 mt-5 bg-white px-2 md:mx-auto md:px-0">
                <div>
                    <Trending />
                </div>
                <div className="my-12 text-center">
                    <p className="text-sm font-medium uppercase md:text-base">
                        Your Price, Your Way
                    </p>
                    <h2 className="mt-2 font-garamond text-4xl font-semibold md:text-5xl ">
                        Live Auction
                    </h2>
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                    {posts.map((item) => (
                        <Link
                            href={`/artworks${
                                item.type === 'auction'
                                    ? '/auction'
                                    : '/immediate'
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
                </div>
            </section>
        </>
    );
}

export default Auction;

Auction.title = 'Auction';

export async function getServerSideProps() {
    const data = [];
    const q = query(
        collection(db, 'artworks'),
        where('status', '==', 'listed'),
        where('type', '==', 'auction'),
        limit(12)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.push({
            id: doc.id,
            ...doc.data(),
        });
    });
    if (!data) {
        return {
            props: { hasError: true },
        };
    }
    return {
        props: {
            artworks: JSON.stringify(data),
        },
    };
}
