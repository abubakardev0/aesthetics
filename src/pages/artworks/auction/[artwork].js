import { useState, useRef, useEffect } from 'react';

import { useRouter } from 'next/router';

import Link from 'next/link';
import Head from 'next/head';

import { doc, updateDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import ARView from '@/icons/ARView';
import Bookmark from '@/icons/Bookmark';
import Insta from '@/icons/Insta';
import Twitter from '@/icons/Twitter';
import Behance from '@/icons/Behance';
import image from '@/artworkexperience/images/image2.jpg';
import Slider from '@/commoncomponents/Scrollers/Slider';
import { Avatar, Collapse } from '@nextui-org/react';

import Loader from '@/commoncomponents/Loader';

import { useCountDown } from '@/hooks/useCountDown';
import RelatedWorks from '@/buyer/components/artwork/RelatedWorks';
import ShowCounter from '@/commoncomponents/ShowCounter';

import Alert from '@/commoncomponents/popups/Alert';
import { numberWithCommas } from '@/commoncomponents/functions';

function Item({ artwork, notFound }) {
    const [data, setData] = useState(JSON.parse(artwork));
    const [save, setSave] = useState(false);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    });
    const router = useRouter();
    const bidValueRef = useRef();
    const countDown = useCountDown(data.endingTime.seconds);
    const documentId = data.id;

    useEffect(() => {
        const docRef = doc(db, 'artworks', documentId);
        onSnapshot(docRef, (doc) => {
            setData({ id: doc.id, ...doc.data() });
        });
    }, [data]);

    if (notFound) {
        return 'Not Found';
    }

    const validateBidValue = (newValue, currentValue) => {
        newValue = parseInt(newValue);
        currentValue = parseInt(currentValue);
        return newValue > currentValue ? true : false;
    };

    const updateBid = async () => {
        if (!auth.currentUser) {
            router.push('/auth/login');
            return <Loader />;
        }
        if (countDown <= 0) {
            setAlert({
                type: 'error',
                message: 'The auction has concluded',
            });
            setShow(true);
            return;
        }
        const newValue = bidValueRef.current.value;
        const currentValue = data.currentBid;
        const isValid = validateBidValue(newValue, currentValue);

        if (!isValid) {
            setAlert({
                type: 'error',
                message: 'The bid must be greater than the current value',
            });
            setShow(true);
            return;
        } else {
            try {
                const document = doc(db, 'artworks', `${data.id}`);
                await updateDoc(document, {
                    currentBid: newValue,
                    lastBid: {
                        user: auth.currentUser.uid,
                        bid: currentValue,
                    },
                });
                setAlert({
                    type: 'success',
                    message: 'A successful bid has been submitted',
                });
            } catch (error) {
                setAlert({
                    type: 'error',
                    message: 'There was no success with the bid',
                });
            } finally {
                setShow(true);
            }
        }
    };

    return (
        <>
            <Head>
                <title>{data.title}</title>
            </Head>
            <section className="container mx-auto flex h-full w-full flex-col md:h-screen md:flex-row md:gap-5">
                <div className="grid h-[450px] w-full place-content-center md:h-full md:w-1/2">
                    <Slider images={[image]} />
                    <div className="mt-3 flex justify-center">
                        <Link href="/">
                            <a>
                                <ARView className="h-12 w-12 md:h-16 md:w-16" />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="h-full w-full py-2 md:w-1/2 md:px-16">
                    <div className="h-full w-full flex-col-reverse space-y-6 p-4 md:flex-col md:rounded-lg md:p-12">
                        <div className="flex w-full items-center justify-between">
                            <div className="inline-flex items-center space-x-3">
                                <Avatar
                                    size="lg"
                                    text={data.artist.toLocaleUpperCase()}
                                    css={{ zIndex: 1 }}
                                />
                                <h3 className="text-base capitalize md:text-lg">
                                    {data.artist}
                                </h3>
                            </div>
                            <button className="h-8 w-20 rounded-full border-2 border-black bg-none text-base transition-all duration-100 hover:bg-neutral-800 hover:text-white active:bg-neutral-900 active:text-white sm:w-24 md:h-10 md:w-32">
                                Follow
                            </button>
                        </div>
                        <div>
                            <h2 className="mb-1 text-xl font-medium sm:text-2xl md:text-3xl">
                                {data.title}
                            </h2>
                            <p>
                                <span className="text-base italic md:text-lg">
                                    Acrylic on Canvas
                                </span>
                                <br />
                                9 1/2 x 9 1/2 in <br /> 24.1 x 24.1 cm
                            </p>
                        </div>
                        <div className="w-full">
                            <h4 className="text-lg font-medium">
                                Estimates: PKR.
                                <span className="ml-1">
                                    {numberWithCommas(data.price)}
                                </span>
                            </h4>
                            <h4 className="text-lg font-medium">
                                {data.currentBid === data.startingBid ? (
                                    <>
                                        Starting bid: PKR.
                                        <span className="ml-1">
                                            {numberWithCommas(data.startingBid)}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        Current bid: PKR.
                                        <span className="ml-1">
                                            {numberWithCommas(data.currentBid)}
                                        </span>
                                    </>
                                )}
                            </h4>
                        </div>
                        <div>
                            {countDown >= 0 && (
                                <ShowCounter countDown={countDown} />
                            )}
                        </div>
                        <div className="inline-flex h-auto w-full space-x-5">
                            <select
                                id="bidValue"
                                name="bidValue"
                                className="w-1/2 rounded-md border border-gray-100 bg-gray-200 p-2.5 text-[14px] text-gray-600"
                                required
                                defaultValue={parseInt(data.currentBid) + 1000}
                                ref={bidValueRef}
                            >
                                <option disabled>Select your bid</option>
                                <option
                                    value={parseInt(data.currentBid) + 1000}
                                >
                                    {parseInt(data.currentBid) + 1000}
                                </option>
                                <option
                                    value={parseInt(data.currentBid) + 2000}
                                >
                                    {parseInt(data.currentBid) + 2000}
                                </option>
                                <option
                                    value={parseInt(data.currentBid) + 3000}
                                >
                                    {parseInt(data.currentBid) + 3000}
                                </option>
                                <option
                                    value={parseInt(data.currentBid) + 4000}
                                >
                                    {parseInt(data.currentBid) + 5000}
                                </option>
                                <option
                                    value={parseInt(data.currentBid) + 6000}
                                >
                                    {parseInt(data.currentBid) + 6000}
                                </option>
                            </select>
                            <button
                                disabled={countDown <= 0}
                                onClick={updateBid}
                                className="h-12 w-1/2 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-neutral-300"
                            >
                                {countDown <= 0 ? 'Auction Ends' : 'Place Bid'}
                            </button>
                        </div>
                        <div className="flex justify-center space-x-3 md:justify-start">
                            <button className="flex items-center space-x-2">
                                <Bookmark
                                    className={`delay-50 h-6 w-6 transition-colors md:h-8 md:w-8 `}
                                    fill={save ? 'black' : 'none'}
                                    stroke="black"
                                />
                                <span className="font-medium">
                                    Save Artwork
                                </span>
                            </button>
                            <div className="flex space-x-5 border-l-2 border-black/25 px-3">
                                <button>
                                    <Insta className="h-6 w-6 hover:scale-105" />
                                </button>
                                <button>
                                    <Behance className="h-6 w-6 hover:scale-105" />
                                </button>
                                <button>
                                    <Twitter className="h-6 w-6 hover:scale-105" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container mx-auto py-6 md:py-16">
                <div className="mb-5 flex w-full flex-col items-center justify-center space-y-5 md:mb-10">
                    <Collapse
                        title="About This Artwork"
                        expanded
                        bordered
                        className="w-full md:w-3/5 lg:w-1/2"
                    >
                        <p>{data.description ?? 'No Description'}</p>
                    </Collapse>
                    <Collapse
                        title="Additional Details"
                        bordered
                        className="w-full md:w-3/5 lg:w-1/2"
                    >
                        <h4 className="text-xl font-medium">Certificates</h4>
                        <p>
                            {data.certificates ??
                                'This artwork has no certification'}
                        </p>
                    </Collapse>
                </div>
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

export async function getServerSideProps({
    params = { id: artwork.id.toString() },
}) {
    const id = params.artwork;
    const data = await getDoc(doc(db, 'artworks', id));

    if (!data) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            artwork: JSON.stringify({ id: data.id, ...data.data() }),
        },
    };
}
