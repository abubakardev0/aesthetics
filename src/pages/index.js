import Head from 'next/head';
import { db } from '@/firebase/firebase-config';
import { getDocs, collection } from 'firebase/firestore';

import Hero from '@/buyer/components/home/Hero';
import Category from '@/buyer/components/home/Category';
import About from '@/buyer/components/home/About';
import NewWorks from '@/buyer/components/artwork/NewWorks';
import Error from '@/commoncomponents/Error';

function Home({ data, hasError }) {
    if (hasError) {
        return <Error />;
    }
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <section className="-mt-12 md:-mt-20">
                <Hero list={data} />
            </section>
            <section className="container mx-auto h-fit w-full py-10 text-center md:py-20">
                <About />
            </section>
            <section className="container relative flex h-fit w-full flex-col items-center justify-between py-10 px-2 md:mx-auto md:flex-row md:py-20 md:px-0">
                <Category />
            </section>
            <section className="container mx-auto px-2 pt-5 md:px-5">
                <NewWorks />
            </section>
        </>
    );
}

export default Home;

export async function getServerSideProps() {
    let data = [];
    const querySnapshot = await getDocs(collection(db, 'herosection'));
    querySnapshot.forEach((document) => {
        data.push({ id: document.id, ...document.data() });
    });
    if (data === undefined || data.length === 0) {
        return {
            props: {
                hasError: true,
            },
        };
    }
    return {
        props: {
            data,
        },
    };
}
