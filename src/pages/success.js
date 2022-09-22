import { useRouter } from 'next/router';
import { db } from '@/firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import Loader from '@/commoncomponents/Loader';
import useSWR from 'swr';
const OrderSuccess = () => {
    const router = useRouter();
    const orderId = router.query.order_id;
    if (!orderId) {
        router.push('/404');
        return <Loader />;
    }
    const { data: order, error } = useSWR('order-confirmation', async () => {
        const document = await getDoc(doc(db, 'orders', orderId));
        if (document.exists) return { id: document.id, ...document.data() };
        return null;
    });
    if (error) {
        return <p>Something went wrong</p>;
    }
    return (
        <div className="mx-auto w-full py-[20%] text-center md:w-1/2">
            {order && (
                <>
                    <p className="px-8 text-base font-medium leading-6 text-gray-600">
                        Thank you for your order! We have received your request
                        and will process it as soon as possible.
                    </p>
                </>
            )}
        </div>
    );
};

export default OrderSuccess;
