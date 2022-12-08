import { useState, useEffect } from 'react';
import { Loading } from '@nextui-org/react';

import { db, auth } from '@/firebase/firebase-config';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

import useSWR from 'swr';

import { useForm } from 'react-hook-form';
import Alert from '@/commoncomponents/popups/Alert';
import Error from '@/commoncomponents/Error';

function BasicInfo() {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    });
    const { data: user, error } = useSWR('user-data', async () => {
        const ref = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (ref.exists()) {
            return {
                id: ref.id,
                name: ref.data().name,
                phone: ref.data().phone,
                email: ref.data().email,
            };
        }
    });
    if (error) {
        return <Error />;
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    if (!user) {
        return (
            <div className="grid place-content-center">
                <Loading />
            </div>
        );
    }
    const onSubmit = async (data) => {
        const name = data.name.toLocaleLowerCase();
        const phone = data.phone.replace(/[^0-9]/g, '');
        if (name === user.name && !phone) {
            return;
        } else if (name === user.name && phone) {
            setLoading(true);
            try {
                await updateDoc(doc(db, 'users', user.id), {
                    phone: parseInt(phone),
                    updatedAt: Timestamp.fromDate(new Date()),
                });
                setAlert({
                    type: 'success',
                    message: 'The phone number has been updated',
                });
            } catch (error) {
                setAlert({
                    type: 'error',
                    message: 'Unable to update phone number',
                });
            } finally {
                setLoading(false);
                setShow(true);
                return;
            }
        } else {
            setLoading(true);
            try {
                await updateProfile(auth.currentUser, {
                    displayName: name,
                });
                await updateDoc(doc(db, 'users', user.id), {
                    name: name,
                    phone: parseInt(phone),
                    updatedAt: Timestamp.fromDate(new Date()),
                });
                setAlert({
                    type: 'success',
                    message: 'The name and phone number have been updated',
                });
            } catch (error) {
                setAlert({
                    type: 'error',
                    message: 'Unable to update name and phone number',
                });
            } finally {
                setLoading(false);
                setShow(true);
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
                    <div className="space-y-1">
                        <label className="text-sm">Full Name</label>
                        <input
                            type="text"
                            className="w-full rounded-lg border-[3px] border-gray-300 p-2 capitalize transition-transform delay-75 duration-300 placeholder:text-sm hover:border-black focus:-translate-y-[2px] focus:border-black"
                            placeholder="Your Name"
                            defaultValue={
                                user.name ?? auth.currentUser.displayName
                            }
                            {...register('name', {
                                required: true,
                                pattern:
                                    /^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/i,
                            })}
                        />
                        {errors.name && (
                            <span className="text-sm text-red-500">
                                Is your name spelled right?
                            </span>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm">E-mail</label>
                        <input
                            type="email"
                            className="w-full cursor-not-allowed resize-none rounded-lg border-[3px] border-gray-300 p-2 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-black focus:-translate-y-[2px] focus:border-black"
                            placeholder="Your E-mail"
                            disabled
                            defaultValue={auth.currentUser.email}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm">Contact</label>
                        <div className="relative mb-6 flex w-full space-x-2 rounded-lg border-[3px] border-gray-300 p-2 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-black focus:-translate-y-[2px] focus:border-black">
                            <span>+92</span>
                            <input
                                className="placeholder:text-sm"
                                placeholder="345-5896989"
                                defaultValue={user.phone ?? ''}
                                {...register('phone', {
                                    pattern: /^[0-9]{3}[0-9]{7}$/i,
                                })}
                            />
                        </div>
                        {errors.phone && (
                            <span className="text-red-500">
                                The phone number does not fit the rule.
                            </span>
                        )}
                    </div>
                    <div className="flex space-x-3">
                        <button
                            type="reset"
                            className="h-12 w-full rounded-md bg-neutral-200 text-neutral-800 hover:bg-neutral-100 focus:outline-none focus:ring-4 focus:ring-neutral-300 active:bg-neutral-300"
                        >
                            Discard
                        </button>
                        <button
                            type="submit"
                            className="h-12 w-full rounded-md bg-neutral-900 text-white hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-neutral-300"
                        >
                            {loading ? (
                                <Loading type="points-opacity" color="white" />
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
