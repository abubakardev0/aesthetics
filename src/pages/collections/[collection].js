import Head from 'next/head';

import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';

import Page from '@/buyer/components/artwork/Page';
import Error from '@/commoncomponents/Error';

function Artworks({ artworks, hasError, category }) {
    if (hasError) {
        return <Error />;
    }
    const posts = JSON.parse(artworks);
    return (
        <>
            <Head>
                <title>{category.toUpperCase()}</title>
            </Head>
            <h2 className="py-4 text-center font-garamond text-3xl font-medium md:py-8 md:text-5xl">
                Explore {category}
            </h2>
            <main className="relative">
                <Page posts={posts} />
            </main>
        </>
    );
}

export default Artworks;

export async function getServerSideProps({
    params = { id: collection.id.toString() },
}) {
    const category = params.collection;
    const data = [];
    const q = query(
        collection(db, 'artworks'),
        where('status', '==', 'listed'),
        where('category', '==', `${category}`),
        orderBy('uploadedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.push({
            id: doc.id,
            ...doc.data(),
        });
    });
    if (!data || data.length === 0) {
        return {
            props: { hasError: true },
        };
    }
    return {
        props: {
            artworks: JSON.stringify(data),
            category,
        },
    };
}
