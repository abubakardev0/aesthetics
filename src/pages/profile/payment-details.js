import Visa from '@/icons/Visa';
import SettingsLayout from '@/layouts/SettingsLayout';
import PaymentModal from '../../common/modal/PaymentModal';
import VirtualCard from '../../modules/payment/components/VirtualCard';
function Payment() {
    return (
        <section className="grid h-screen w-full place-content-center">
            <VirtualCard
                userName="Abu Bakar"
                expiryDate="25/2012"
                cardNumber="4589968574859685"
                cardType={<Visa className="h-6 w-6" />}
            />
            <PaymentModal />
        </section>
    );
}

export default Payment;

Payment.Layout = SettingsLayout;
