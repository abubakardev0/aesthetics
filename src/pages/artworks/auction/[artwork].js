import { useState, useEffect } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';

import Social from '@/artworkexperience/pages/Social';
import Details from '@/artworkexperience/pages/Details';
import ImageView from '@/artworkexperience/pages/ImageView';
import Attributes from '@/artworkexperience/pages/Attributes';
import BiddingDetails from '@/artworkexperience/pages/BiddingDetails';

import RelatedWorks from '@/buyer/components/artwork/RelatedWorks';
import Alert from '@/commoncomponents/popups/Alert';
import Error from '@/commoncomponents/Error';
import Loader from '@/commoncomponents/Loader';

function Item() {
    const router = useRouter();
    const { artwork } = router.query;
    const [data, setData] = useState();
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    });
    const [error, setError] = useState(false);

    useEffect(() => {
        try {
            const docRef = doc(db, 'artworks', artwork);
            onSnapshot(docRef, (doc) => {
                setData({ id: doc.id, ...doc.data() });
            });
        } catch (error) {
            setError(true);
        }
    }, []);

    if (!data) {
        return <Loader />;
    }
    if (error) {
        return <Error />;
    }
    return (
        <>
            <Head>
                <title>{data.title.toLocaleUpperCase()}</title>
            </Head>
            <section className="container mx-auto flex h-full w-full flex-col md:h-screen md:flex-row md:gap-5">
                <ImageView images={data.images} />
                <div className="h-full w-full py-2 md:w-1/2 md:px-16">
                    <div className="h-full w-full flex-col-reverse space-y-8 p-4 md:flex-col md:rounded-lg md:p-12">
                        <Attributes
                            artist={data.artist}
                            setAlert={setAlert}
                            setShow={setShow}
                            title={data.title}
                            surfaces={data.surfaces}
                            mediums={data.mediums}
                            dimensions={data.dimensions}
                        />

                        <BiddingDetails
                            data={data}
                            setAlert={setAlert}
                            setShow={setShow}
                        />
                        <Social
                            id={data.id}
                            sellerId={data.sellerId}
                            setAlert={setAlert}
                            setShow={setShow}
                        />
                    </div>
                </div>
            </section>
            <Details
                description={data.description}
                certificates={data.certificates}
            />
            <section className="container mx-auto px-3 py-6 md:px-0">
                <RelatedWorks category={data.category} />
            </section>

            <Alert
                show={show}
                setShow={setShow}
                type={alert.type}
                message={alert.message}
            />
        </>
    );
}

export default Item;
