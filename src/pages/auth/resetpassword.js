import Head from 'next/head';
import Link from 'next/link';
import { useRef } from 'react';
import { Input } from '@nextui-org/react';

import { useRouter } from 'next/router';
import { auth } from '@/firebase/firebase-config';
import useAuth from '@/hooks/useAuth';
import Loader from '@/commoncomponents/Loader';

const ResetPassword = () => {
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
        const email_address = emailRef.current.value;
        if (validateEmail(email_address)) {
            errorRef.current.innerText = '';
            resetPassword(email_address);
        } else {
            errorRef.current.innerText = 'Please enter valid e-mail!';
        }
    };

    return (
        <div className="grid h-screen place-items-center">
            <Head>
                <title>Reset Password</title>
            </Head>
            <main className="w-96 p-6 sm:rounded-xl sm:border-2 sm:border-slate-200 sm:shadow-slate-400">
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
                        color="black"
                        type="email"
                        label="E-mail"
                        placeholder="Your E-mail"
                        ref={emailRef}
                    />
                    <span
                        ref={errorRef}
                        className="text-sm text-red-500"
                    ></span>
                    <button
                        type="submit"
                        className="focus:shadow-outline mt-5 w-full rounded-md bg-neutral-800 p-3 font-medium tracking-wide text-gray-100 shadow-lg hover:bg-neutral-900 focus:outline-none"
                    >
                        Reset Password
                    </button>
                </form>
            </main>
        </div>
    );
};

export default ResetPassword;
