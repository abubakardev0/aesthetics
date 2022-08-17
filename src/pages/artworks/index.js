import Head from 'next/head';
import Card from '../../modules/artworkexperience/Card';
import Link from 'next/link';

import { db } from '@/firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

function Artworks({ artworks, hasError }) {
    if (hasError) {
        return (
            <p className="text-center text-lg font-medium">
                Sorry, we can&apos;t find that page! Don&apos;t worry though,
                everything is STILL AWESOME!
            </p>
        );
    }
    const data = JSON.parse(artworks);
    return (
        <div>
            <Head>
                <title>Artworks</title>
            </Head>
            <h1 className="my-12 py-2 text-center font-garamond text-2xl leading-loose md:text-4xl">
                Explore Artworks
            </h1>
            <main className="container mx-auto flex h-fit w-full flex-wrap items-start justify-center gap-6">
                {data.map((item) => (
                    <Link href={`/artworks/${item.id}`} key={item.id}>
                        <a>
                            <Card
                                image={item.images[0]}
                                artist={item.artist}
                                title={item.title}
                                height={item.height}
                                width={item.width}
                                medium={item.medium}
                                surface={item.surface}
                                unit={item.unit}
                                date={item.uploadedOn}
                                price={item.price}
                            />
                        </a>
                    </Link>
                ))}
            </main>
        </div>
    );
}

export default Artworks;

export async function getServerSideProps() {
    const data = [];
    const querySnapshot = await getDocs(collection(db, 'artworks'));
    querySnapshot.forEach((doc) => {
        const {
            artist,
            title,
            images,
            height,
            width,
            uploadedOn,
            price,
            medium,
            surface,
            unit,
        } = doc.data();
        data.push({
            id: doc.id,
            artist,
            title,
            height,
            width,
            medium,
            surface,
            images,
            uploadedOn,
            unit,
            price,
        });
    });
    if (data.length === 0) {
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
