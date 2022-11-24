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
            <section className="-mt-12 md:-mt-20">
                <Hero list={data} />
            </section>
            <section className="container mx-auto h-fit w-full py-10 text-center md:py-20">
                <About />
            </section>
            <section className="relative flex h-fit w-full flex-col items-center justify-between px-3 py-10 md:mx-auto md:flex-row md:px-10 md:py-20 lg:px-16">
                <Category />
            </section>
            <section className="mx-auto mt-5 px-3 md:px-10 lg:px-16">
                <NewWorks />
            </section>
        </>
    );
}

Home.title = 'Home';
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
