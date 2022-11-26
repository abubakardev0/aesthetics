import { useRouter } from 'next/router';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import Loader from '@/commoncomponents/Loader';
import CheckoutForm from '@/immediatesell/CheckoutForm';
import PrivateRoute from '@/commoncomponents/routes/Private';

const stripePromise = loadStripe(
    'pk_test_51LessqL2R3MKmO5U51jVjtUKp0kPbkMizhlWsBvMQ8hXTRYgs9YmCfEs8kZ0y3xLTPka5ID2eYBQEZ1QT2M3FRvQ00psEJErDU'
);

export default function AuctionCheckout({ itemId, userId, notFound }) {
    const router = useRouter();

    if (notFound) {
        router.replace('/404');
        return <Loader />;
    }

    if (auth.currentUser.uid !== userId) {
        router.replace('/404');
        return <Loader />;
    }

    return (
        <PrivateRoute>
            <div className="container mx-auto flex h-full w-full justify-center">
                <Elements stripe={stripePromise}>
                    <CheckoutForm itemsId={{ 0: itemId }} />
                </Elements>
            </div>
        </PrivateRoute>
    );
}

AuctionCheckout.title = 'Checkout';

export async function getServerSideProps(context) {
    if (!context.query) {
        return {
            props: {
                notFound: true,
            },
        };
    }
    const { itemId, userId } = context.query;
    const ref = await getDoc(doc(db, 'artworks', itemId));
    if (ref.exists()) {
        const time = ref.data().winner.linkExpiry.seconds;
        if (ref.data().type !== 'auction') {
            return {
                props: {
                    notFound: true,
                },
            };
        } else if (ref.data().winner.user !== userId) {
            return {
                props: {
                    notFound: true,
                },
            };
        } else if (time - new Date().getTime() / 1000 <= 0) {
            return {
                props: {
                    notFound: true,
                },
            };
        } else if (ref.data().status !== 'archived') {
            return {
                props: {
                    notFound: true,
                },
            };
        }
    }
    return {
        props: {
            itemId: itemId,
            userId: userId,
        },
    };
}
