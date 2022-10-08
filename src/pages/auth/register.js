import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

import { auth } from '@/firebase/firebase-config';
import useAuth from '@/hooks/useAuth';

import Loader from '@/commoncomponents/Loader';
import Google from '@/icons/Google';

import AuthLayout from '@/layouts/AuthLayout';

function Register() {
    const { signUp, signInwithGoogleAccount, error } = useAuth();
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

    const onSubmit = async ({ name, email, password }) => {
        setErrorMessage('');
        await signUp(name, email, password);
        if (error) {
            setErrorMessage(error.split(':')[1]);
        }
    };

    return (
        <>
            <section className="w-full p-6 sm:w-[400px] sm:flex-col sm:rounded-xl sm:border-2 sm:border-slate-200 sm:px-10 sm:py-5 sm:shadow-slate-400 md:p-10">
                <h2 className="xl:text-bold text-left text-3xl font-bold text-neutral-800">
                    Get Started
                </h2>
                <p className="mt-1 text-left text-base text-neutral-600">
                    Already have an account?
                    <Link href="/auth/login">
                        <a className="ml-1 font-medium hover:underline">
                            Log In
                        </a>
                    </Link>
                </p>
                <form
                    id="reg-form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="my-3 space-y-4"
                >
                    <p className="text-sm font-medium text-red-500">
                        {errorMessage}
                    </p>
                    <Input
                        width="100%"
                        color="black"
                        type="text"
                        label="Name"
                        helperColor="red"
                        placeholder="Your Name"
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
                    <Input
                        width="100%"
                        color="black"
                        type="email"
                        label="E-mail"
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
                        color="black"
                        type="password"
                        label="Password"
                        placeholder="Your Password"
                        {...register('password', {
                            required: true,
                            pattern:
                                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i,
                        })}
                    />
                    {errors.password && (
                        <span className="text-xs text-red-500">
                            Make sure it has at least 8 characters, must contain
                            at least 1 uppercase & lowercase letter and can
                            contain special characters
                        </span>
                    )}
                    <button
                        type="submit"
                        className="w-full rounded-md bg-neutral-800 p-3 font-medium
                                tracking-wide text-gray-100 shadow-lg hover:bg-neutral-700 focus:outline-none
                                active:bg-neutral-900"
                    >
                        Create an Account
                    </button>
                </form>
                <div className="mt-2 space-y-2">
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
                        <span>Register with Google</span>
                    </button>
                </div>
            </section>
        </>
    );
}

Register.title = 'Register';
Register.Layout = AuthLayout;

export default Register;
