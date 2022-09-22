import { useState, useMemo } from 'react';

import { Modal, Input, useInput } from '@nextui-org/react';
import { db, auth } from '@/firebase/firebase-config';
import { doc, updateDoc } from 'firebase/firestore';

import { useForm } from 'react-hook-form';

import Mastercard from '@/icons/MasterCard';
import Visa from '@/icons/Visa';
import Alert from '@/commoncomponents/popups/Alert';

export default function PaymentModal() {
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    });
    const [visible, setVisible] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setValue('cardNumber', value);
        try {
            // await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            //     paymentInfo: {
            //         ...data,
            //     },
            // });
            console.log(data);
            setAlert({
                type: 'success',
                message: 'Address updated',
            });
        } catch (error) {
            setAlert({
                type: 'danger',
                message: error.message,
            });
        } finally {
            setVisible(false);
            setShow(true);
        }
    };

    const { value, bindings } = useInput('');

    const isMastercard = (value) => {
        return value.match(
            /^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/i
        );
    };

    const isVisa = (value) => {
        return value.match(/^4[0-9]{12}(?:[0-9]{3})?$/i);
    };
    const helper = useMemo(() => {
        if (!value)
            return {
                icon: '',
                text: '',
                color: '',
            };

        if (isMastercard(value)) {
            return {
                icon: <Mastercard className="h-6 w-6 " />,
                text: '',
                color: 'primary',
            };
        } else if (isVisa(value)) {
            return {
                icon: <Visa className="h-6 w-6 " />,
                text: '',
                color: 'primary',
            };
        } else {
            return {
                icon: '',
                text: 'Invalid',
                color: 'error',
            };
        }
    }, [value]);
    return (
        <>
            <button
                onClick={() => setVisible(true)}
                className="mt-10 rounded-md bg-neutral-800 px-10 py-3 text-white
                hover:bg-neutral-700 active:bg-neutral-900"
            >
                Add Payment Details
            </button>
            <Modal
                closeButton
                aria-labelledby="modal-payment"
                open={visible}
                onClose={() => setVisible(false)}
            >
                <Modal.Header>
                    <h3 className="text-lg font-medium">Add Payment Details</h3>
                </Modal.Header>
                <Modal.Body>
                    <form className="space-y-8">
                        <Input
                            clearable
                            shadow={false}
                            type="string"
                            label="Name on Card"
                            placeholder="John Doe"
                            fullWidth
                            helperText={
                                errors.name && (
                                    <span className="text-sm text-red-500">
                                        required field*
                                    </span>
                                )
                            }
                            {...register('name', { required: true })}
                        />
                        <Input
                            {...bindings}
                            shadow={false}
                            status={helper.color}
                            color={helper.color}
                            helperColor={helper.color}
                            helperText={helper.text}
                            labelRight={helper.icon}
                            type="string"
                            label="Card Number"
                            placeholder="1589558955956688"
                            fullWidth
                        />
                        <div className="flex items-center justify-between space-x-4">
                            <Input
                                shadow={false}
                                type="month"
                                label="Expiry Date"
                                width="55%"
                                helperText={
                                    errors.expiry && (
                                        <span className="text-sm text-red-500">
                                            required field*
                                        </span>
                                    )
                                }
                                {...register('expiry', { required: true })}
                            />
                            <Input
                                clearable
                                shadow={false}
                                type="number"
                                label="CVV"
                                placeholder="234"
                                width="45%"
                                helperText={
                                    errors.cvv && (
                                        <span className="text-sm text-red-500">
                                            required field*
                                        </span>
                                    )
                                }
                                {...register('cvv', { required: true })}
                            />
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setVisible(false)}
                                type="reset"
                                className="h-12 w-full rounded-2xl bg-gray-300 font-semibold text-gray-700"
                            >
                                Discard
                            </button>
                            <button
                                onClick={handleSubmit(onSubmit)}
                                type="submit"
                                className="h-12 w-full rounded-2xl bg-blue-600 font-semibold text-white"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            {show && (
                <Alert
                    show={show}
                    setShow={setShow}
                    type={alert.type}
                    message={alert.message}
                />
            )}
        </>
    );
}
