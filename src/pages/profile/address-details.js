import { useState } from 'react';

import { db, auth } from '@/firebase/firebase-config';
import { doc, updateDoc } from 'firebase/firestore';

import { useForm } from 'react-hook-form';

import { Loading } from '@nextui-org/react';

import AddressForm from '@/user/profile/buyer/Address';
import Alert from '@/commoncomponents/popups/Alert';
import SettingsLayout from '@/layouts/SettingsLayout';

function Address() {
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
        setLoading(true);
        try {
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                address: {
                    ...data,
                },
            });
            setAlert({
                type: 'success',
                message: 'The address has been updated',
            });
        } catch (error) {
            setAlert({
                type: 'error',
                message: 'Unable to update the address',
            });
        } finally {
            setLoading(false);
            setShow(true);
        }
    };
    return (
        <>
            <div className="grid h-screen place-content-center">
                <div className="w-[300px] space-y-5 md:mt-0 md:w-[400px]">
                    <h2 className="text-left text-2xl font-medium">
                        Your Shipping Address
                    </h2>
                    <form
                        className="space-y-5"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <AddressForm errors={errors} register={register} />
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
                                    <Loading
                                        type="points-opacity"
                                        color="white"
                                    />
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
            </div>
        </>
    );
}

export default Address;

Address.title = 'Address Details';
Address.Layout = SettingsLayout;
