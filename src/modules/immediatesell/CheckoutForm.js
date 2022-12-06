import { useState } from 'react';

import { useRouter } from 'next/router';

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import axios from 'axios';

import { Loading } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

import { auth } from '@/firebase/firebase-config';

import Loader from '@/commoncomponents/Loader';
import Alert from '@/commoncomponents/popups/Alert';
import Card from '@/payment/components/Card';
import AddressForm from '@/user/profile/buyer/Address';
import ShippingInfo from 'src/common/utils/illustrations/ShippingInfo';
import Lock from '@/icons/Lock';

export default function CheckoutForm({ itemsId }) {
    const stripe = useStripe();
    const elements = useElements();
    const [state, setState] = useState(false);
    const [formState, setFormState] = useState(1);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    });
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm({ mode: 'onChange' });

    const router = useRouter();

    const handleCheckout = async (data) => {
        setState(true);
        if (!stripe || !elements) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!error) {
            const { id } = paymentMethod;
            try {
                const response = await axios.post('/api/checkout', {
                    id,
                    contact: data.phone,
                    email: auth.currentUser.email,
                    items: itemsId,
                    userId: auth.currentUser.uid,
                    shippingDetails: {
                        name: data.name.toLocaleLowerCase(),
                        city: data.city.toLocaleLowerCase(),
                        address: data.address.toLocaleLowerCase(),
                        zipCode: data.zip,
                        state: data.province,
                    },
                });
                setAlert({
                    type: 'success',
                    message: 'Your order has been placed',
                });
                router.push(response.data.url);
            } catch (error) {
                setAlert({
                    type: 'error',
                    message: 'Sorry! we are unable to place your order',
                });
            } finally {
                setState(false);
                setShow(true);
            }
        } else {
            setAlert({
                type: 'error',
                message: 'Something went wrong',
            });
            setShow(true);
        }
    };
    const nextStep = async () => {
        const isValid = await trigger([
            'name',
            'phone',
            'province',
            'city',
            'zip',
            'address',
        ]);
        if (isValid) {
            setFormState((e) => e + 1);
        }
    };
    return (
        <>
            <div className="container mx-auto flex h-full min-h-screen w-full  space-x-0 md:space-x-5 md:py-12">
                <div className="hidden w-1/2 self-center md:block">
                    <div className="mx-auto w-96">
                        <ShippingInfo className="h-80 w-80" />
                        <p className="text-center text-xl font-medium text-gray-500">
                            Don't wait to add color to your life
                            <br />
                            <span className="text-2xl font-semibold text-blue-500">
                                BUY NOW
                            </span>
                        </p>
                    </div>
                </div>
                <div className="w-full self-center sm:w-[400px] md:w-[500px] lg:w-1/2">
                    <form
                        onSubmit={handleSubmit(handleCheckout)}
                        className="w-fit space-y-3 rounded-lg border-2 p-3 md:w-[450px] md:p-6"
                    >
                        {formState === 1 && (
                            <>
                                <h2 className="text-base font-medium md:text-xl">
                                    Your Shipping Information
                                </h2>
                                <AddressForm
                                    errors={errors}
                                    register={register}
                                    name={auth.currentUser.displayName}
                                    trigger={trigger}
                                />
                                <div className="flex space-x-3">
                                    <button
                                        type="reset"
                                        onClick={() => {
                                            router.push('/bag');
                                            return <Loader />;
                                        }}
                                        className="w-full rounded-md bg-neutral-200 py-2.5 text-sm text-neutral-800 hover:bg-neutral-100 active:bg-neutral-300 md:py-3 md:text-base"
                                    >
                                        Return to Bag
                                    </button>
                                    <button
                                        onClick={nextStep}
                                        className="w-full rounded-md bg-neutral-800 py-2.5 text-sm font-medium text-gray-100 hover:bg-neutral-700 active:bg-neutral-900 md:py-3 md:text-base "
                                    >
                                        Go to Payment
                                    </button>
                                </div>
                            </>
                        )}
                        {formState === 2 && (
                            <>
                                <div>
                                    <p>Don't worry, you're safe.</p>
                                    <h3 className="mb-5 text-3xl font-medium uppercase text-blue-500">
                                        secure checkout
                                    </h3>
                                </div>
                                <Card />
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() =>
                                            setFormState((e) => e - 1)
                                        }
                                        disabled={state ? true : false}
                                        className="w-full rounded-md bg-neutral-200 py-2.5 text-neutral-800 hover:bg-neutral-100 active:bg-neutral-300 md:py-3"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        disabled={state ? true : false}
                                        type="submit"
                                        className="flex h-12 w-full items-center justify-center gap-x-3 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-neutral-300 disabled:cursor-not-allowed"
                                    >
                                        <Lock
                                            className="h-6 w-6"
                                            fill="white"
                                        />
                                        {state ? (
                                            <Loading
                                                type="points-opacity"
                                                color="white"
                                            />
                                        ) : (
                                            'Pay'
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
            <Alert
                show={show}
                setShow={setShow}
                type={alert.type}
                message={alert.message}
            />
        </>
    );
}
