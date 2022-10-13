import { db, auth } from '@/firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';

import { Loading } from '@nextui-org/react';
import useSWR from 'swr';

import Visa from '@/icons/Visa';
import Error from '@/commoncomponents/Error';
import SettingsLayout from '@/layouts/SettingsLayout';
import PaymentModal from '@/commoncomponents/modal/PaymentModal';
import VirtualCard from '../../modules/payment/components/VirtualCard';
import Mastercard from '@/icons/MasterCard';

function Payment() {
    const { data: paymentInfo, error } = useSWR('payment-info', async () => {
        const ref = await getDoc(doc(db, 'users', `${auth.currentUser.uid}`));
        if (ref.exists()) {
            return ref.data().paymentInfo;
        }
    });
    if (error) {
        return <Error />;
    }
    if (paymentInfo === undefined) {
        return (
            <div className="grid h-screen place-content-center">
                <Loading />
            </div>
        );
    }
    return (
        <>
            <section className="grid h-screen w-full place-content-center">
                {paymentInfo ? (
                    <VirtualCard
                        userName={paymentInfo.name}
                        expiryDate={paymentInfo.expiry}
                        cardNumber={paymentInfo.cardNumber.toString()}
                        cardType={
                            paymentInfo.type === 'visa' ? (
                                <Visa className="h-6 w-6" />
                            ) : (
                                <Mastercard className="h-6 w-6" />
                            )
                        }
                    />
                ) : (
                    <p className="text-center">No Payment Info</p>
                )}
                <PaymentModal />
            </section>
        </>
    );
}

export default Payment;

Payment.title = 'Card Details';
Payment.Layout = SettingsLayout;
