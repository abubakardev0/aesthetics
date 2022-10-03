import { useRouter } from 'next/router';

import { auth } from '@/firebase/firebase-config';

import BasicInfo from '@/user/profile/buyer/BasicInfo';
import ChangePassword from '@/user/profile/buyer/ChangePassword';
import DeleteAccount from '@/user/profile/buyer/DeleteAccount';
import VerifyEmail from '@/user/profile/buyer/VerifyEmail';

const EditProfile = () => {
    const router = useRouter();
    const user = auth.currentUser;
    return (
        <>
            <section className="grid h-screen place-content-center">
                <div className="w-[300px] space-y-5 md:mt-0 md:w-[400px]">
                    <BasicInfo user={user} />
                    <ChangePassword user={user} />
                    {!user.emailVerified && <VerifyEmail user={user} />}

                    <DeleteAccount user={user} router={router} />
                </div>
            </section>
        </>
    );
};

export default EditProfile;
