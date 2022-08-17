import Link from 'next/link';
import { Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { auth } from '@/firebase/firebase-config';
import useAuth from '@/hooks/useAuth';
import Google from '@/icons/Google';
import Plus from '@/icons/Plus';
import Loader from '@/commoncomponents/Loader';

function Login() {
    const { signIn, signInwithGoogleAccount } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter();
    if (auth.currentUser) {
        router.replace('/');
        return <Loader />;
    }

    const onSubmit = async ({ email, password }) => {
        await signIn(email, password);
    };
    return (
        <div className="grid h-screen place-items-center">
            <Head>
                <title>Login</title>
            </Head>
            <div className="fixed top-3 right-3">
                <Link href="/">
                    <a>
                        <Plus className="h-6 w-6 rotate-45" />
                    </a>
                </Link>
            </div>
            <main className="w-full p-10 sm:w-[400px] sm:flex-col sm:rounded-xl sm:border-2 sm:border-slate-200 sm:px-10 sm:py-5 sm:shadow-slate-400 md:p-10">
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
                    className="mt-5 space-y-3"
                >
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
                            Hmm… that email doesn&apos;t look valid
                        </p>
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
                            Make sure it&apos;s at least 8 characters
                        </p>
                    )}
                    <div className="my-4 flex items-center">
                        <label htmlFor="artist" className="m-1 text-sm">
                            <input
                                name="logmeout"
                                type="checkbox"
                                className="mr-2"
                            />
                            Log me out
                        </label>
                        <Link href="/auth/resetpassword">
                            <a className="ml-auto text-sm text-neutral-800 hover:underline ">
                                Lost Password?
                            </a>
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="focus:shadow-outline mt-5 w-full rounded-md bg-neutral-800 p-3 font-medium tracking-wide text-gray-100 shadow-lg hover:bg-neutral-900 focus:outline-none"
                    >
                        Log In
                    </button>
                </form>
                <div className="my-3 space-y-2">
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
                        <span>Login with Google</span>
                    </button>
                </div>
                <div className="font-regular mt-4 text-center text-sm text-gray-700">
                    <span>
                        Don&apos;t have an account ?
                        <Link href="/auth/register">
                            <a className="ml-1 cursor-pointer font-medium text-neutral-800 underline hover:text-neutral-900">
                                Sign up
                            </a>
                        </Link>
                    </span>
                </div>
            </main>
        </div>
    );
}

export default Login;
