import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';

import CheckoutForm from '@/immediatesell/CheckoutForm';

import PrivateRoute from '@/commoncomponents/routes/Private';

const stripePromise = loadStripe(
    'pk_test_51LessqL2R3MKmO5U51jVjtUKp0kPbkMizhlWsBvMQ8hXTRYgs9YmCfEs8kZ0y3xLTPka5ID2eYBQEZ1QT2M3FRvQ00psEJErDU'
);

export default function Checkout() {
    const router = useRouter();
    return (
        <PrivateRoute>
            <div className="container mx-auto flex h-full w-full justify-center">
                <Elements stripe={stripePromise}>
                    <CheckoutForm itemsId={router.query} />
                </Elements>
            </div>
        </PrivateRoute>
    );
}

Checkout.title = 'Checkout';
