import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

import { auth } from '@/firebase/firebase-config';
import useAuth from '@/hooks/useAuth';

import Google from '@/icons/Google';
import Loader from '@/commoncomponents/Loader';

import AuthLayout from '@/layouts/AuthLayout';

function Login() {
    const { signIn, signInwithGoogleAccount, sessionBasedSignin, error } =
        useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState('');

    if (auth.currentUser) {
        router.replace('/');
        return <Loader />;
    }

    const onSubmit = async ({ logmeout, email, password }) => {
        setErrorMessage('');
        if (logmeout) {
            sessionBasedSignin(email, password);
        } else {
            signIn(email, password);
        }
        if (error) {
            setErrorMessage(error.split(':')[1]);
        }
    };

    return (
        <>
            <section className="w-full p-6 focus-within:border-black sm:w-[400px] sm:flex-col sm:rounded-xl sm:border-[3px] sm:border-slate-200 sm:px-10 sm:py-5 sm:shadow-slate-400 md:p-10">
                <h2
                    className="xl:text-bold text-left text-3xl font-bold text-neutral-900
                    md:text-4xl"
                >
                    Log in
                </h2>
                <p className="mt-2 text-left text-sm font-medium text-neutral-500 md:text-base">
                    Deepest emotions spread over a canvas
                </p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-5 space-y-5"
                >
                    <p className="text-sm font-medium text-red-500">
                        {errorMessage}
                    </p>
                    <Input
                        width="100%"
                        clearable
                        bordered
                        color="black"
                        type="email"
                        label="E-mail"
                        size="lg"
                        autoComplete
                        placeholder="Your E-mail"
                        {...register('email', {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
                        })}
                    />
                    {errors.email && (
                        <span className="text-sm text-red-500">
                            Hmm… that email doesn&apos;t look valid
                        </span>
                    )}
                    <Input.Password
                        width="100%"
                        clearable
                        bordered
                        color="black"
                        type="password"
                        label="Password"
                        size="lg"
                        placeholder="Your Password"
                        {...register('password', {
                            required: true,
                        })}
                    />
                    {errors.password && (
                        <span className="text-sm text-red-500">
                            Make sure it&apos;s at least 8 characters
                        </span>
                    )}
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <input
                                id="checkbox"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
                                {...register('logmeout')}
                            />
                            <label
                                htmlFor="checkbox"
                                className="ml-2 text-sm text-neutral-800"
                            >
                                Log me Out
                            </label>
                        </div>
                        <Link href="/auth/resetpassword">
                            <a className="ml-auto text-base text-neutral-800 hover:underline active:underline ">
                                Lost Password?
                            </a>
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="mt-5 w-full rounded-md bg-neutral-800 p-3 font-medium tracking-wide text-gray-100 shadow-lg hover:bg-neutral-700 focus:outline-none active:bg-neutral-900"
                    >
                        Log In
                    </button>
                </form>
                <div className="my-3 space-y-3">
                    <div className="flex items-center">
                        <div className="bg h-0.5 flex-grow bg-gray-300"></div>
                        <div className="mx-5 flex-grow-0 text-gray-600">or</div>
                        <div className="bg h-0.5 flex-grow bg-gray-300"></div>
                    </div>
                    <button
                        onClick={signInwithGoogleAccount}
                        className="flex w-full items-center justify-center space-x-4 rounded-md border bg-slate-100 px-4 py-3 font-medium
                                text-slate-900 shadow-lg hover:bg-slate-200 focus:outline-none active:bg-blue-500 active:text-slate-100"
                    >
                        <Google className="h-6 w-6" />
                        <span>Login with Google</span>
                    </button>
                </div>
                <div className="font-regular mt-4 text-center text-sm text-gray-700">
                    <span>
                        Don&apos;t have an account ?
                        <Link href="/auth/register">
                            <a className="ml-1 cursor-pointer font-medium text-neutral-800 underline active:text-neutral-900">
                                Sign up
                            </a>
                        </Link>
                    </span>
                </div>
            </section>
        </>
    );
}

Login.title = 'Login';
Login.Layout = AuthLayout;

export default Login;
