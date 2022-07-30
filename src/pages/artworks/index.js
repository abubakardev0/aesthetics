import Head from 'next/head';
import Card from '../../modules/artworkexperience/Card';
import Link from 'next/link';

import { db } from '../../common/utils/firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

function Artworks({ artworks }) {
    const data = JSON.parse(artworks);

    return (
        <div>
            <Head>
                <title>Artworks</title>
            </Head>
            <h1 className="mt-24 mb-10 py-2 text-center font-garamond text-2xl leading-loose md:text-4xl">
                Explore Artworks
            </h1>
            <main className="container mx-auto flex h-fit w-full flex-wrap items-start justify-center gap-6">
                {data.length > 0 ? (
                    data.map((item) => (
                        <Link href={`/artworks/${item.id}`}>
                            <a key={item.id}>
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
                    ))
                ) : (
                    <h3 className="h-screen w-screen text-center text-xl">
                        No Artworks Found
                    </h3>
                )}
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
    const artworks = JSON.stringify(data);
    return {
        props: {
            artworks,
        },
    };
}
