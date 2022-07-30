import Link from 'next/link';
import { Input } from '@nextui-org/react';
import Plus from '../../common/utils/icons/Plus';
import Google from '../../common/utils/icons/Google';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { auth } from '../../common/utils/firebase/firebase-config';
import useAuth from '../../common/hooks/useAuth';
import Loader from '../../common/components/Loader';

function Register() {
    const router = useRouter();
    if (auth.currentUser) {
        router.replace('/');
        return <Loader />;
    }

    const { signUp, signInwithGoogleAccount, error } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async ({ name, email, password, artist }) => {
        const isRegistered = await signUp(name, email, password, artist);
        if (isRegistered) {
            router.replace('/onboarding');
            return <Loader />;
        }
    };

    return (
        <div className="grid h-screen place-items-center">
            <Head>
                <title>Registeration</title>
            </Head>
            <div className="fixed top-3 right-3">
                <Link href="/">
                    <a>
                        <Plus className="h-6 w-6 rotate-45" />
                    </a>
                </Link>
            </div>
            <main className="w-full p-10 sm:w-[400px] sm:flex-col sm:rounded-xl sm:border-2 sm:border-slate-200 sm:px-10 sm:py-5 sm:shadow-slate-400 md:p-10">
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
                    <Input
                        width="100%"
                        clearable
                        color="black"
                        type="text"
                        label="Your Name"
                        placeholder="Abu Bakar"
                        {...register('name', {
                            required: true,
                        })}
                    />
                    {errors.name && (
                        <p className="text-xs italic text-red-500">
                            Invalid name
                        </p>
                    )}
                    <Input
                        width="100%"
                        clearable
                        color="black"
                        type="email"
                        label="Your E-mail"
                        placeholder="bakar097@gmail.com"
                        {...register('email', {
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
                        })}
                    />
                    {errors.email && (
                        <p className="text-xs italic text-red-500">
                            Invalid e-mail
                        </p>
                    )}
                    {error && (
                        <span className="text-xs italic text-red-500">
                            This email address is already being used
                        </span>
                    )}
                    <Input.Password
                        width="100%"
                        clearable
                        color="black"
                        type="password"
                        label="Password"
                        placeholder="Password"
                        {...register('password', {
                            required: true,
                            minLength: 8,
                        })}
                    />
                    {errors.password && (
                        <p className="text-xs italic text-red-500">
                            Invalid password
                        </p>
                    )}
                    <input
                        name="artist"
                        type="checkbox"
                        {...register('artist')}
                        id="artist"
                    />
                    <label htmlFor="artist" className="ml-2 text-sm">
                        Are you an artist?
                    </label>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-neutral-800 p-3 font-medium
                                tracking-wide text-gray-100 shadow-lg hover:bg-neutral-900
                                focus:outline-none"
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
                        className="focus:shadow-outline flex w-full items-center justify-center space-x-4 rounded-md bg-slate-200 px-4 py-3 font-medium
                                text-slate-900 shadow-lg hover:bg-blue-400 hover:text-slate-100 focus:outline-none
                                focus:ring-4"
                    >
                        <Google className="h-6 w-6" />
                        <span>Register with Google</span>
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Register;
