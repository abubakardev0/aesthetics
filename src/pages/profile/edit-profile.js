import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
    deleteUser,
} from 'firebase/auth';

import { auth } from '@/firebase/firebase-config';
import useAuth from '@/hooks/useAuth';
import Loader from '@/commoncomponents/Loader';
import PasswordChange from '../../modules/usermanagement/profile/buyer/change-password';
import BasicInfo from '../../modules/usermanagement/profile/buyer/BasicInfo';

const EditProfile = () => {
    const { logout } = useAuth();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const user = auth.currentUser;
    if (!user) {
        router.push('/auth/login');
        return <Loader />;
    }

    function changePassword({ currentpassword, newpassword }) {
        const credential = EmailAuthProvider.credential(
            user.email,
            currentpassword
        );
        reauthenticateWithCredential(user, credential)
            .then(() => {
                updatePassword(user, newpassword)
                    .then(() => {
                        console.log('Password updated');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                alert(error);
            });
    }
    function deleteUserAccount() {
        deleteUser(user)
            .then(() => {
                logout();
                router.push('/farewell');
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <>
            <section className="mx-auto w-[400px]">
                <div className="space-y-4 border-b-2 pb-4">
                    <h2 className="text-left text-2xl font-medium">
                        Basic Information
                    </h2>
                    <form className="space-y-4">
                        <BasicInfo
                            register={register}
                            errors={errors}
                            user={user}
                        />
                        <div className="mt-5 flex space-x-3">
                            <button
                                type="reset"
                                className="w-full rounded-xl bg-neutral-200 py-2 text-neutral-800 hover:bg-neutral-300"
                            >
                                Discard
                            </button>
                            <button
                                type="submit"
                                className="w-full rounded-md bg-neutral-800 py-2 font-medium text-gray-100 hover:bg-neutral-900 "
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
                <div className="my-4 space-y-4 border-b-2 pb-4">
                    <h2 className="text-left text-2xl font-medium">
                        Change Password
                    </h2>
                    <form
                        onSubmit={handleSubmit(changePassword)}
                        className="space-y-3"
                    >
                        <PasswordChange register={register} errors={errors} />
                        <div className="mt-5 flex space-x-3">
                            <button
                                type="reset"
                                className="w-full rounded-xl bg-neutral-200 py-2 text-neutral-800 hover:bg-neutral-300"
                            >
                                Discard
                            </button>
                            <button
                                type="submit"
                                className="w-full rounded-md bg-neutral-800 py-2 font-medium text-gray-100 hover:bg-neutral-900 "
                            >
                                Change
                            </button>
                        </div>
                    </form>
                </div>
                <button
                    onClick={() => deleteUserAccount()}
                    className="w-full rounded-md bg-neutral-800 py-2 font-medium text-gray-100 hover:bg-neutral-900 "
                >
                    Delete Account
                </button>
            </section>
        </>
    );
};

export default EditProfile;
