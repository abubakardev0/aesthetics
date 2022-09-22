import { useState } from 'react';
import { sendEmailVerification } from 'firebase/auth';
import Alert from '@/commoncomponents/popups/Alert';

export default function VerifyEmail({ user }) {
    const [showAlert, setAlert] = useState(false);

    const handleVerification = async () => {
        try {
            await sendEmailVerification(user);
            setAlert(true);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <button
                className="w-full rounded-md bg-neutral-800 py-2.5 font-medium text-gray-100 hover:bg-neutral-700 active:bg-neutral-900 md:py-3 "
                onClick={handleVerification}
            >
                Verify Email
            </button>
            <Alert
                show={showAlert}
                message="Verification link has been sent to your e-mail."
                type="success"
                setShow={setAlert}
            />
        </>
    );
}
