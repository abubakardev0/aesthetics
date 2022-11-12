import { useRouter } from 'next/router';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';

import useSWR from 'swr';
import { Loading } from '@nextui-org/react';

import Order from '@/order/components/Order';
import Bill from '@/order/components/Bill';
import Customer from '@/order/components/Customer';
import Shipping from '@/order/components/Shipping';

import Loader from '@/commoncomponents/Loader';

const OrderSuccess = () => {
    const router = useRouter();
    const orderId = router.query.order_id;
    if (!orderId) {
        router.push('/404');
        return <Loader />;
    }
    const { data: orderDetails, error } = useSWR(
        'order-confirmation',
        async () => {
            const document = await getDoc(doc(db, 'orders', orderId));
            if (document.exists) return { id: document.id, ...document.data() };
            return null;
        }
    );

    if (!orderDetails)
        return (
            <div className="grid h-screen place-content-center">
                <Loading />
            </div>
        );
    if (error) return <Error />;
    return (
        <>
            {orderDetails && (
                <div className="container mx-auto py-5 md:py-10">
                    <div className="flex flex-col justify-start space-y-2 ">
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
            )}
        </>
    );
};

export default OrderSuccess;

OrderSuccess.title = 'Order Success';
