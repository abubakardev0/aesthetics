import { useState } from 'react';

import { useRouter } from 'next/router';

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import axios from 'axios';

import { Loading, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

import { auth } from '@/firebase/firebase-config';

import Loader from '@/commoncomponents/Loader';
import Alert from '@/commoncomponents/popups/Alert';
import Card from '@/payment/components/Card';
import AddressForm from '@/user/profile/buyer/Address';

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
                    email: data.email.toLocaleLowerCase(),
                    items: itemsId,
                    userId: auth.currentUser.uid,
                    shippingDetails: {
                        name: data.name.toLocaleLowerCase(),
                        city: data.city.toLocaleLowerCase(),
                        address: data.address,
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
                    message: error.message,
                });
            } finally {
                setState(false);
                setShow(true);
            }
        } else {
            setAlert({
                type: 'error',
                message: error.message,
            });
            setShow(true);
        }
    };
    const nextStep = async () => {
        const isValid = await trigger([
            'email',
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
            <form
                onSubmit={handleSubmit(handleCheckout)}
                className="w-full space-y-4 p-3 md:w-[450px] md:p-6"
            >
                {formState === 1 && (
                    <>
                        <h2 className="text-base font-medium md:text-xl">
                            Your Shipping Information
                        </h2>
                        <Input
                            width="100%"
                            clearable
                            color="black"
                            type="email"
                            label="E-mail"
                            size="lg"
                            autoComplete
                            initialValue={auth.currentUser.email}
                            {...register('email', {
                                required: true,
                            })}
                        />
                        {errors.email && (
                            <span className="text-sm text-red-500">
                                Please fill this field
                            </span>
                        )}
                        <AddressForm
                            errors={errors}
                            register={register}
                            name={auth.currentUser.displayName}
                            trigger={trigger}
                        />
                        <div className="flex space-x-3">
                            <button
                                onClick={() => {
                                    router.push('/bag');
                                    return <Loader />;
                                }}
                                className="w-full rounded-md bg-neutral-200 py-2.5 text-neutral-800 hover:bg-neutral-100 active:bg-neutral-300 md:py-3"
                            >
                                Return to Bag
                            </button>
                            <button
                                onClick={nextStep}
                                className="w-full rounded-md bg-neutral-800 py-2.5 font-medium text-gray-100 hover:bg-neutral-700 active:bg-neutral-900 md:py-3 "
                            >
                                Go to Payment
                            </button>
                        </div>
                    </>
                )}
                {formState === 2 && (
                    <>
                        <Card />
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setFormState((e) => e - 1)}
                                className="w-full rounded-md bg-neutral-200 py-2.5 text-neutral-800 hover:bg-neutral-100 active:bg-neutral-300 md:py-3"
                            >
                                Discard
                            </button>
                            <button
                                disabled={state}
                                type="submit"
                                className="h-12 w-full rounded-md bg-neutral-900 text-white hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-neutral-300"
                            >
                                {state ? (
                                    <Loading type="points" color="white" />
                                ) : (
                                    'Pay'
                                )}
                            </button>
                        </div>
                    </>
                )}
            </form>
            <Alert
                show={show}
                setShow={setShow}
                type={alert.type}
                message={alert.message}
            />
        </>
    );
}
