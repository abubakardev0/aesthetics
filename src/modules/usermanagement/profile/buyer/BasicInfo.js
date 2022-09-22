import { useState } from 'react';
import { Input, Loading } from '@nextui-org/react';

import { db } from '@/firebase/firebase-config';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

import { useForm } from 'react-hook-form';
import Alert from '@/commoncomponents/popups/Alert';

function BasicInfo({ user }) {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const name = data.name;
        const phone = data.phone.replace(/[^0-9]/g, '');
        if (name === user.displayName && phone === '') {
            return;
        } else if (name === user.displayName && phone !== '') {
            setLoading(true);
            try {
                await updateDoc(doc(db, 'users', user.uid), {
                    phone,
                    updatedAt: Timestamp.fromDate(new Date()),
                });
                setShow(true);
                setAlert({
                    type: 'success',
                    message: 'Phone number updated successfully',
                });
            } catch (error) {
                setShow(true);
                setAlert({
                    type: 'error',
                    message: error.message,
                });
            } finally {
                setLoading(false);
                return;
            }
        } else {
            setLoading(true);
            try {
                await updateProfile(user, {
                    displayName: name,
                });
                await updateDoc(doc(db, 'users', user.uid), {
                    name,
                    phone,
                    updatedAt: Timestamp.fromDate(new Date()),
                });
                setShow(true);
                setAlert({
                    type: 'success',
                    message: 'Phone number updated successfully',
                });
            } catch (error) {
                setShow(true);
                setAlert({
                    type: 'error',
                    message: error.message,
                });
            } finally {
                setLoading(false);
            }
        }
    };
    return (
        <>
            <div className="space-y-4 border-b-2 pb-4">
                <h2 className="text-left text-2xl font-medium">
                    Basic Information
                </h2>
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        width="100%"
                        clearable
                        color="black"
                        type="text"
                        label="Full Name"
                        aria-label="name"
                        size="lg"
                        initialValue={user.displayName}
                        {...register('name', { required: true })}
                    />
                    {errors.name && (
                        <div className="text-sm text-red-500">
                            {errors.name.message}
                        </div>
                    )}
                    <Input
                        width="100%"
                        color="black"
                        type="email"
                        label="E-mail"
                        aria-label="email"
                        size="lg"
                        initialValue={user.email}
                        disabled
                    />

                    <Input
                        width="100%"
                        color="black"
                        type="text"
                        label="Contact Number"
                        labelLeft="+92"
                        aria-label="phone"
                        size="lg"
                        placeholder="345-5896989"
                        className="text-gray-400"
                        {...register('phone', {
                            pattern: /^[0-9]{3}[0-9]{7}$/i,
                        })}
                    />
                    {errors.phone && (
                        <span className="text-red-500">
                            The phone number does not fit the rule.
                        </span>
                    )}
                    <div className="flex space-x-3">
                        <button
                            type="reset"
                            className="w-full rounded-md bg-neutral-200 py-2.5 text-neutral-800 hover:bg-neutral-100 active:bg-neutral-300 md:py-3"
                        >
                            Discard
                        </button>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-neutral-800 py-2.5 font-medium text-gray-100 hover:bg-neutral-700 active:bg-neutral-900 md:py-3 "
                        >
                            {loading ? (
                                <Loading type="points" color="white" />
                            ) : (
                                'Save'
                            )}
                        </button>
                    </div>
                </form>
                {show && (
                    <Alert
                        show={show}
                        setShow={setShow}
                        type={alert.type}
                        message={alert.message}
                    />
                )}
            </div>
        </>
    );
}

export default BasicInfo;
