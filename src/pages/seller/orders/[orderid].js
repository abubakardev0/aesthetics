import Image from 'next/image';
import { useRouter } from 'next/router';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';

import { Avatar } from '@nextui-org/react';

import Arrow from '@/icons/Arrow';

import SellerLayout from '@/layouts/SellerLayout';

import { formatCurrency } from '@/commoncomponents/functions';

const Details = ({ data, hasError }) => {
    const router = useRouter();
    if (hasError) return <p>Something went wrong!</p>;
    const orderDetails = JSON.parse(data);
    return (
        <>
            <div className="relative py-14 px-4 md:px-6 lg:container lg:mx-auto">
                <button
                    className="absolute top-2 left-3 rounded-full border bg-white p-2 md:top-0 md:left-5"
                    onClick={() => router.back()}
                >
                    <Arrow className="h-6 w-6  rotate-180" />
                </button>
                <div className="item-start flex flex-col justify-start space-y-2 ">
                    <h1 className="text-xl font-semibold leading-7 text-gray-800 lg:text-4xl  lg:leading-9">
                        Order #{orderDetails.id}
                    </h1>
                    <p className="text-base font-medium leading-6 text-gray-600">
                        {new Date(
                            orderDetails.placedAt.seconds * 1000
                        ).toUTCString()}
                    </p>
                </div>
                <div className="jusitfy-center mt-10 flex w-full flex-col items-stretch  space-y-4 md:space-y-6 xl:flex-row xl:space-x-8 xl:space-y-0">
                    <div className="flex w-full flex-col items-start justify-start space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex w-full flex-col items-start justify-start rounded-md bg-white px-4 py-4 drop-shadow-md md:p-6 md:py-6 xl:p-8">
                            <p className="text-lg font-semibold leading-6 text-gray-800 md:text-xl xl:leading-5">
                                Your Order
                            </p>
                            <div className="mt-4 flex w-full  flex-col items-start justify-start md:mt-6 md:flex-row md:items-center md:space-x-6 xl:space-x-8 ">
                                {orderDetails.items.map((item) => {
                                    return (
                                        <>
                                            <div className="flex h-96 w-full flex-col items-start justify-start space-y-4  md:mt-0 md:h-36 md:flex-row  md:items-center md:space-x-6 xl:space-x-8 ">
                                                <div className="relative h-full w-full md:w-40">
                                                    <Image
                                                        src={item.image}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        objectPosition="center"
                                                        priority
                                                    />
                                                </div>
                                                <div className="flex w-full flex-col items-start justify-between space-y-4 pb-5 md:flex-row md:justify-between md:space-y-0">
                                                    <div className="flex w-full flex-col leading-loose">
                                                        <h3 className="text-2xl font-medium text-gray-800">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-base capitalize text-gray-700">
                                                            by {item.artist}
                                                        </p>
                                                    </div>
                                                    <p className="text-xl font-medium">
                                                        {formatCurrency(
                                                            item.price
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex w-full flex-col items-stretch justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-6 xl:space-x-8">
                            <div className="flex w-full flex-col space-y-6 rounded-md bg-white px-4 py-6 drop-shadow-md md:p-6 xl:p-8   ">
                                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                                    Summary
                                </h3>
                                <div className="flex w-full flex-col items-center justify-center space-y-4 border-b border-gray-200 pb-4">
                                    <div className="flex w-full  justify-between">
                                        <p className="text-base leading-4 text-gray-800">
                                            Subtotal
                                        </p>
                                        <p className="text-base leading-4 text-gray-600">
                                            {formatCurrency(
                                                orderDetails.subtotal
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex w-full items-center justify-between">
                                        <p className="text-base leading-4 text-gray-800">
                                            Shipping
                                        </p>
                                        <p className="text-base leading-4 text-gray-600">
                                            {formatCurrency(
                                                orderDetails.shipping
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between">
                                    <p className="text-base font-semibold leading-4 text-gray-800">
                                        Total
                                    </p>
                                    <p className="text-base font-semibold leading-4 text-gray-600">
                                        {formatCurrency(
                                            orderDetails.totalAmount
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex w-full flex-col justify-center space-y-6 rounded-md bg-white px-4 py-6 drop-shadow-md md:p-6 xl:p-8   ">
                                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                                    Shipping
                                </h3>
                                <div className="flex w-full items-start justify-between">
                                    <div className="flex items-center justify-center space-x-4">
                                        <div class="h-8 w-8">
                                            <img
                                                class="h-full w-full"
                                                alt="logo"
                                                src="https://i.ibb.co/L8KSdNQ/image-3.png"
                                            />
                                        </div>
                                        <div className="flex flex-col items-center justify-start">
                                            <p className="text-lg font-semibold leading-6 text-gray-800">
                                                TNT Delivery
                                                <br />
                                                <span className="font-normal">
                                                    Delivery with 7 Days
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-lg font-semibold leading-6 text-gray-800">
                                        {formatCurrency(orderDetails.shipping)}
                                    </p>
                                </div>
                                <button
                                    onClick={() =>
                                        router.push(
                                            'https://www.tnt.com/express/en_pk/site/home.html'
                                        )
                                    }
                                    className="h-12 w-full rounded-sm border border-[#2D2D2D] bg-none text-base transition-all hover:bg-[#2D2D2D] hover:text-white md:block"
                                >
                                    View Carrier Details
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full flex-col items-start justify-between rounded-md bg-white px-4 py-6 drop-shadow-md md:p-6 lg:w-[450px] lg:p-8">
                        <h3 className="text-xl font-semibold leading-5 text-gray-800">
                            Customer
                        </h3>
                        <div className="flex h-full w-full flex-col justify-start md:flex-row md:space-x-6 lg:space-x-8 xl:flex-col xl:space-x-0 ">
                            <div className="flex flex-shrink-0 flex-col items-start justify-start">
                                <div className="flex w-full items-center justify-start space-x-4 border-b border-gray-200 py-6 md:py-8">
                                    <Avatar
                                        text={orderDetails.shippingDetails.name.toUpperCase()}
                                        size="lg"
                                    />
                                    <p className="text-left text-base font-semibold capitalize leading-4 text-gray-800">
                                        {orderDetails.shippingDetails.name}
                                    </p>
                                </div>
                                <div className="flex w-full items-center justify-start space-x-4 border-b border-gray-200 py-4">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                                            stroke="#1F2937"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M3 7L12 13L21 7"
                                            stroke="#1F2937"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <p className="text-sm leading-5 text-gray-800">
                                        {orderDetails.email}
                                    </p>
                                </div>
                                <div className="mt-6 space-y-4 md:mt-8">
                                    <p className="text-left text-lg font-medium leading-4 text-gray-800">
                                        Shipping Address
                                    </p>
                                    <p className="w-full text-left text-lg leading-5 text-gray-600">
                                        {orderDetails.shippingDetails.address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Details;

Details.Layout = 'Order Details';
Details.Layout = SellerLayout;

export async function getServerSideProps({
    params = { id: orderid.id.toString() },
}) {
    const id = params.orderid;
    const document = await getDoc(doc(db, 'orders', id));
    if (!document) {
        return {
            props: {
                hasError: true,
            },
        };
    }
    return {
        props: {
            data: JSON.stringify({ id: document.id, ...document.data() }),
        },
    };
}
