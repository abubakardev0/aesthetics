import { useState } from 'react';
import { Loading } from '@nextui-org/react';

import { db, auth } from '@/firebase/firebase-config';
import { doc, updateDoc } from 'firebase/firestore';

import { useForm } from 'react-hook-form';

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
                message: 'Address updated',
            });
        } catch (error) {
            setAlert({
                type: 'danger',
                message: error.message,
            });
        } finally {
            setLoading(false);
            setShow(true);
        }
    };
    return (
        <div className="grid h-screen place-content-center">
            <div className="w-[300px] space-y-5 md:mt-0 md:w-[400px]">
                <h2 className="text-left text-2xl font-medium">
                    Your Shipping Address
                </h2>
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <AddressForm
                        errors={errors}
                        register={register}
                        name={auth.currentUser.displayName}
                    />
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
        </div>
    );
}

export default Address;

Address.Layout = SettingsLayout;
