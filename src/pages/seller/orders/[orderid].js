import { useState } from 'react';

import { useRouter } from 'next/router';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';

import { Loading } from '@nextui-org/react';
import axios from 'axios';
import useSWR from 'swr';

import Order from '@/order/components/Order';
import Bill from '@/order/components/Bill';
import Customer from '@/order/components/Customer';
import Shipping from '@/order/components/Shipping';
import Arrow from '@/icons/Arrow';
import SellerLayout from '@/layouts/SellerLayout';
import Error from '@/commoncomponents/Error';
import Loader from '@/commoncomponents/Loader';

const Details = () => {
    const router = useRouter();
    const { orderid } = router.query;
    if (!orderid) {
        router.replace('/404');
        return <Loader />;
    }
    const [loading, setLoading] = useState(false);
    const { data: orderDetails, error } = useSWR('order', async () => {
        const document = await getDoc(doc(db, 'orders', orderid));
        if (document.exists()) {
            return {
                id: document.id,
                ...document.data(),
            };
        }
        return -1;
    });
    if (!orderDetails) {
        return (
            <div className="grid h-screen place-content-center overflow-hidden">
                <Loading color="black" />
            </div>
        );
    }
    if (error) return <Error />;

    if (orderDetails === -1) {
        router.replace('/404');
        return <Loader />;
    }

    const handleRefund = async () => {
        setLoading(true);
        try {
            await axios.post('/api/refund-payment', {
                id: orderDetails.id,
                name: orderDetails.shippingDetails.name,
                email: orderDetails.email,
                paymentId: orderDetails.paymentId,
            });
            alert('payment refunded');
        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className="relative py-14 px-4 md:px-6 lg:container lg:mx-auto">
                <button
                    className="absolute top-2 left-3 rounded-full border bg-white p-2 md:top-0 md:left-5"
                    onClick={() => router.back()}
                >
                    <Arrow className="h-6 w-6  rotate-180" />
                </button>
                <div className="flex justify-between">
                    <div className="space-y-2">
                        <h1 className="text-xl font-semibold leading-7 text-gray-800 lg:text-4xl  lg:leading-9">
                            Order #{orderDetails.id}
                        </h1>
                        <p className="text-base font-medium leading-6 text-gray-600">
                            {new Date(
                                orderDetails.placedAt.seconds * 1000
                            ).toLocaleDateString('en-US', {
                                hour12: true,
                                hour: 'numeric',
                                minute: 'numeric',
                            })}
                        </p>
                    </div>
                    <div className="space-x-3 self-center">
                        <span
                            className={`
                                ${
                                    orderDetails.status === 'cancelled' &&
                                    'border-red-200 bg-red-100 text-red-500'
                                }
                                ${
                                    orderDetails.status === 'completed' &&
                                    'border-green-200 bg-green-100 text-green-500'
                                }
                                rounded-full border-2 px-5 py-2 capitalize
                                `}
                        >
                            {orderDetails.status}
                        </span>
                        {orderDetails.status === 'cancelled' &&
                            (orderDetails.paymentId ? (
                                <span className="rounded-full bg-amber-200 px-5 py-2 capitalize text-amber-600">
                                    Not Refunded
                                </span>
                            ) : (
                                <span className="rounded-full bg-green-100 px-5 py-2 capitalize text-green-500">
                                    Refunded
                                </span>
                            ))}
                        {orderDetails.paymentId &&
                            orderDetails.status === 'cancelled' && (
                                <button
                                    onClick={handleRefund}
                                    className="h-10 w-24 rounded-full bg-neutral-800 px-5 py-2 text-white hover:bg-neutral-700 active:bg-neutral-900"
                                >
                                    {loading ? (
                                        <Loading color="white" size="sm" />
                                    ) : (
                                        'Refund'
                                    )}
                                </button>
                            )}
                    </div>
                </div>
                <div className="mt-10 flex w-full flex-col items-stretch justify-center  space-y-4 md:space-y-6 xl:flex-row xl:space-x-8 xl:space-y-0">
                    <div className="flex w-full flex-col items-start justify-start space-y-4 md:space-y-6 xl:space-y-8">
                        <Order items={orderDetails.items} />
                        <div className="flex w-full flex-col items-stretch justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-6 xl:space-x-8">
                            <Bill
                                subtotal={orderDetails.subtotal}
                                shipping={orderDetails.shipping}
                                totalAmount={orderDetails.totalAmount}
                            />
                            <Shipping shipping={orderDetails.shipping} />
                        </div>
                    </div>
                    <Customer
                        name={orderDetails.shippingDetails.name}
                        email={orderDetails.email}
                        address={orderDetails.shippingDetails.address}
                    />
                </div>
            </div>
        </>
    );
};

export default Details;

Details.title = 'Order Details';
Details.Layout = SellerLayout;
