import { db } from '@/firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';

import Collection from '@/buyer/components/artwork/Collection';
import Error from '@/commoncomponents/Error';

export default function ArtworkCollection({ list, hasError }) {
    if (hasError) {
        return <Error />;
    }
    return (
        <>
            <section className="container space-y-4 px-5 py-5 md:mx-auto md:px-0 ">
                <h2 className="py-4 text-center font-garamond text-3xl font-medium md:py-8 md:text-5xl">
                    Explore Collections
                </h2>
                <div className="min-h-screen">
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {list.map((category) => (
                            <Collection category={category} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export async function getServerSideProps() {
    const docSnap = await getDoc(doc(db, 'categories', 'paintings'));
    const list = docSnap.data().list;
    if (list === undefined || list.length === 0) {
        return {
            props: { hasError: true },
        };
    }
    return {
        props: {
            list,
        },
    };
}

ArtworkCollection.title = 'Collections';
