import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';

import Hero from '@/competition/components/Hero';
import CompetitionsList from '@/competition/components/CompetitionsList';
import Error from '@/commoncomponents/Error';

function Competitions({ competitions, hasError }) {
    if (hasError) return <Error />;
    const list = JSON.parse(competitions);
    const liveCompetitions = list.filter((data) => data.status === 'active');
    const pastCompetitions = list.filter((data) => data.status === 'inactive');

    return (
        <>
            <Hero />
            <section className="py-10 px-3 md:px-10 lg:px-16">
                {liveCompetitions.length > 0 ? (
                    <CompetitionsList
                        list={liveCompetitions}
                        title="Live Competitions"
                        subtitle=" Participate to win"
                    />
                ) : (
                    <p>No Live Competitions</p>
                )}
            </section>
            <section className="py-10 px-3 md:px-10 lg:px-16">
                {pastCompetitions.length > 0 ? (
                    <CompetitionsList
                        list={pastCompetitions}
                        title="Past Competitions"
                        subtitle="See who won"
                    />
                ) : (
                    <p>No Past Competitions</p>
                )}
            </section>
        </>
    );
}

export default Competitions;

Competitions.title = 'Competitions';

export async function getServerSideProps() {
    const data = [];
    const querySnapshot = await getDocs(collection(db, 'competitions'));
    querySnapshot.forEach((doc) => {
        const { title, image, status } = doc.data();
        data.push({
            id: doc.id,
            title,
            image,
            status,
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
