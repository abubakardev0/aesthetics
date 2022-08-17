import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import Bookmark from '@/icons/Bookmark';
import Insta from '@/icons/Insta';
import Twitter from '@/icons/Twitter';
import Behance from '@/icons/Behance';

import ImagesDisplay from '@/commoncomponents/display/ImagesDisplay';
import Loader from '@/commoncomponents/Loader';
import { useCountDown } from '@/hooks/useCountDown';
import ShowCounter from '@/commoncomponents/ShowCounter';

const Item = ({ artwork, hasError }) => {
    const [data, setData] = useState(JSON.parse(artwork));
    const bidValueRef = useRef();
    const errorRef = useRef();
    const router = useRouter();
    const countDown = useCountDown(data.endTime.seconds);
    if (hasError) {
        return 'Not Found';
    }
    const validateBidValue = (newValue, currentValue) => {
        if (!newValue) {
            return false;
        } else {
            if (newValue <= currentValue) {
                return false;
            }
            return true;
        }
    };
    const validate = () => {
        if (!auth.currentUser) {
            router.push('/auth/login');
            return <Loader />;
        }
        const newValue = bidValueRef.current.value;
        const currentValue = data.currentBid;
        if (!validateBidValue(newValue, currentValue)) {
            errorRef.current.innerHTML = 'Bid must be greater than current bid';
            return;
        } else {
            errorRef.current.innerText = '';
            const document = doc(db, 'artworks', '5tNLhupkT3WTb1Fym7ZX');
            updateDoc(document, {
                currentBid: newValue,
                lastBid: {
                    user: auth.currentUser.uid,
                    bid: currentValue,
                },
            })
                .then(() => {
                    setData({
                        ...data,
                        currentBid: newValue,
                        lastBid: {
                            user: auth.currentUser.uid,
                            bid: currentValue,
                        },
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <>
            <div className="container flex w-full flex-col px-2 md:mx-auto md:h-screen md:flex-row">
                <div className="w-full md:w-4/6">
                    <ImagesDisplay images={data.images} />
                </div>
                <div className="w-full md:w-2/6">
                    <div className="w-full py-5 md:px-4">
                        <div className="bg-gray flex items-center justify-between">
                            <h3 className="text-lg font-medium md:text-xl">
                                {data.artist}
                                <br />
                                <span className="text-sm font-normal md:text-base">
                                    (Islamabad, b. 1989)
                                </span>
                            </h3>
                            <button className="h-8 w-24 rounded-full border-2 border-black bg-none text-base transition-all duration-100 hover:bg-black hover:text-white md:h-10 md:w-32">
                                Follow
                            </button>
                        </div>
                        <div className="mt-2 md:mt-10">
                            <h2 className="text-xl font-medium tracking-wide md:text-3xl md:font-semibold">
                                {data.title}
                            </h2>
                            <p>
                                <span className="text-lg italic">
                                    Acrylic on Canvas
                                </span>
                                <br />
                                9 1/2 x 9 1/2 in <br /> 24.1 x 24.1 cm
                            </p>
                            <div className="mt-3 font-medium tracking-wide text-gray-700 md:mt-5">
                                Estimated value: PKR.
                                <span>{data.estimate}</span>
                            </div>
                            <div className="mt-3 text-lg leading-relaxed md:mt-5">
                                Starting Bid : {data.startingBid}
                            </div>
                            <div className="mt-3 text-lg leading-relaxed md:mt-5">
                                Current Bid : {data.currentBid}
                            </div>
                            <div>
                                {countDown > 0 ? (
                                    <ShowCounter countDown={countDown} />
                                ) : (
                                    'Auction Ends'
                                )}
                            </div>
                            <select
                                id="bidValue"
                                name="bidValue"
                                className="block w-full rounded-xl border border-gray-100 bg-gray-100 p-2.5 text-[14px] text-gray-400"
                                required
                                ref={bidValueRef}
                            >
                                <option disabled>
                                    Select your classification
                                </option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="900">900</option>
                                <option value="1000">1000</option>
                                <option value="1200">1200</option>
                                <option value="1300">1300</option>
                                <option value="1400">1400</option>
                            </select>
                            <button
                                onClick={validate}
                                className="mt-5 h-12 w-full rounded-sm border border-black bg-none text-base transition-all hover:bg-black hover:text-white md:mt-10"
                            >
                                Place Bid
                            </button>
                            <span
                                ref={errorRef}
                                className="text-sm text-red-500"
                            ></span>
                            <div className="mt-5 inline-flex space-x-3 ">
                                <button className="flex space-x-2">
                                    <Bookmark
                                        className={`delay-50 h-6 w-6 transition-colors `}
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
                </div>
            </div>
        </>
    );
};

export default Item;

export async function getServerSideProps() {
    const id = '5tNLhupkT3WTb1Fym7ZX';
    const document = doc(db, 'artworks', id);
    const data = await getDoc(document);
    if (!data) {
        return {
            props: {
                hasError: true,
            },
        };
    }
    return {
        props: {
            artwork: JSON.stringify(data.data()),
        },
    };
}
//  const res = await new Promise((resolve) => {
//      onSnapshot(doc(db, 'artworks', id), (snap) => {
//          resolve(snap.data());
//      });
//  });
//  console.log(res);
