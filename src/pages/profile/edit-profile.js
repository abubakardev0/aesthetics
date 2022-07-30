import { auth } from '../../common/utils/firebase/firebase-config';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useAuth from '../../common/hooks/useAuth';
import Loader from '../../common/components/Loader';
import { deleteUser } from 'firebase/auth';
import PasswordChange from '../../modules/usermanagement/profile/buyer/change-password';
import BasicInfo from '../../modules/usermanagement/profile/buyer/BasicInfo';
import { EmailAuthProvider } from 'firebase/auth';
const EditProfile = () => {
    const router = useRouter();
    const user = auth.currentUser;
    if (!user) {
        router.push('/auth/login');
        return <Loader />;
    }

    const { logout } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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
