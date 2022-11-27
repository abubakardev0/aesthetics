import { useState, useEffect } from 'react';

import Head from 'next/head';

import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import Social from '@/artworkexperience/pages/Social';
import Details from '@/artworkexperience/pages/Details';
import ImageView from '@/artworkexperience/pages/ImageView';
import Attributes from '@/artworkexperience/pages/Attributes';
import { handler, inCollection } from '@/commoncomponents/firebaseFunctions';
import { formatCurrency } from '@/commoncomponents/functions';
import RelatedWorks from '@/buyer/components/artwork/RelatedWorks';
import Alert from '@/commoncomponents/popups/Alert';
import Error from '@/commoncomponents/Error';

export default function Item({ artwork, hasError }) {
    const [addtoBag, setAddtoBag] = useState(false);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    });

    const data = JSON.parse(artwork);

    function handleBag() {
        if (!auth.currentUser) {
            setAlert({
                type: 'Not Loggedin',
                message: 'Please login to add items to your bag',
            });
            setShow(true);
            return;
        }
        if (auth.currentUser.uid === data.sellerId) {
            setAlert({
                type: 'Error',
                message: 'You don`t have permission to add this artwork to bag',
            });
            setShow(true);
            return;
        }
        handler('bag', setAddtoBag, addtoBag, data.id);
    }

    useEffect(() => {
        if (auth.currentUser) {
            inCollection('bag', setAddtoBag, data.id);
        }
    }, []);

    if (hasError) {
        return <Error />;
    }

    return (
        <>
            <Head>
                <title>{data.title.toLocaleUpperCase()}</title>
            </Head>
            <section className="container mx-auto flex h-full w-full flex-col md:h-[600px] md:flex-row md:gap-5">
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
                        <div className="w-full">
                            <h4 className="text-lg font-medium tracking-wide md:text-xl">
                                {formatCurrency(data.price)}
                            </h4>
                        </div>

                        {data.status === 'sold' ? (
                            <button
                                disabled
                                className="h-12 w-full rounded-md bg-neutral-900 text-white hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-neutral-300 md:w-80"
                            >
                                Item Sold
                            </button>
                        ) : (
                            <button
                                onClick={handleBag}
                                className="h-12 w-full rounded-md bg-neutral-900 text-white hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-neutral-300 md:w-80"
                            >
                                {addtoBag ? 'Remove from Bag' : 'Add to Bag'}
                            </button>
                        )}
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

export async function getServerSideProps({
    params = { id: artwork.id.toString() },
}) {
    const id = params.artwork;
    const data = await getDoc(doc(db, 'artworks', id));
    if (!data) {
        return {
            props: {
                hasError: true,
            },
        };
    }

    return {
        props: {
            artwork: JSON.stringify({ id: data.id, ...data.data() }),
        },
    };
}
