import Link from 'next/link';
import { useRef, useState } from 'react';
import { Input } from '@nextui-org/react';

import { useRouter } from 'next/router';
import { auth } from '@/firebase/firebase-config';
import useAuth from '@/hooks/useAuth';
import Loader from '@/commoncomponents/Loader';

import AuthLayout from '@/layouts/AuthLayout';

import Alert from '@/commoncomponents/popups/Alert';

const ResetPassword = () => {
    const [showAlert, setAlert] = useState(false);
    const [message, setMessage] = useState({
        type: '',
        message: '',
    });
    const { resetPassword } = useAuth();
    const emailRef = useRef();
    const errorRef = useRef();

    const router = useRouter();
    if (auth.currentUser) {
        router.replace('/');
        return <Loader />;
    }
    const validateEmail = (value) => {
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };

    const sendResetPasswordLink = async (e) => {
        e.preventDefault();
        if (validateEmail(emailRef.current.value)) {
            try {
                await resetPassword(emailRef.current.value);
                setMessage({
                    type: 'success',
                    message:
                        'We have emailed you a link for resetting your password if exists.',
                });
            } catch (e) {
                setMessage({
                    type: 'error',
                    message: e.message,
                });
            } finally {
                setAlert(true);
            }
        } else {
            errorRef.current.innerText = 'Please enter valid e-mail!';
        }
    };

    return (
        <>
            <section className="w-96 p-6 focus-within:border-black sm:rounded-xl sm:border-[3px] sm:border-slate-200 sm:shadow-slate-400">
                <div className="mb-5">
                    <h2
                        className="xl:text-bold mb-1 text-left text-3xl font-bold
                    text-neutral-800"
                    >
                        Reset Password
                    </h2>
                    <Link href="/auth/login">
                        <a className="text-sm hover:underline">
                            Back to Log In
                        </a>
                    </Link>
                </div>
                <form onSubmit={sendResetPasswordLink}>
                    <Input
                        width="100%"
                        clearable
                        bordered
                        color="black"
                        type="email"
                        label="E-mail"
                        placeholder="Your E-mail"
                        ref={emailRef}
                    />
                    <button
                        type="submit"
                        className="focus:shadow-outline mt-5 w-full rounded-md bg-neutral-800 p-3 font-medium tracking-wide text-gray-100 shadow-lg hover:bg-neutral-900 focus:outline-none"
                    >
                        Reset Password
                    </button>
                    <span ref={errorRef} className="text-xs text-red-500" />
                </form>
            </section>
            <Alert
                show={showAlert}
                setShow={setAlert}
                type={message.type}
                message={message.message}
            />
        </>
    );
};

ResetPassword.title = 'Reset Password';
ResetPassword.Layout = AuthLayout;
export default ResetPassword;
