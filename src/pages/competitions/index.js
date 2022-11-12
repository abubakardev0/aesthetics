import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';

import Hero from '@/competition/components/Hero';
import CompetitionsList from '@/competition/components/CompetitionsList';
import Error from '@/commoncomponents/Error';

function Competitions({ competitions, hasError }) {
    if (hasError) return <Error />;
    const list = JSON.parse(competitions);
    return (
        <>
            <Hero />
            <section className="container mx-auto py-10">
                {list.length > 0 ? (
                    <CompetitionsList list={list} />
                ) : (
                    <p>No Competitions available</p>
                )}
            </section>
        </>
    );
}

export default Competitions;

Competitions.title = 'Competitions';

export async function getServerSideProps() {
    const data = [];
    const q = query(
        collection(db, 'competitions'),
        where('status', '==', 'active')
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const { title, image } = doc.data();
        data.push({
            id: doc.id,
            title,
            image,
        });
    });
    if (!data) {
        return {
            props: { hasError: true },
        };
    }
    return {
        props: {
            competitions: JSON.stringify(data),
        },
    };
}
