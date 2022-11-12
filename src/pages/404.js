import { Suspense } from 'react';
import { useRouter } from 'next/router';
import EmptyLayout from '@/layouts/EmptyLayout';
import Ghost from '@/icons/BabyGhost';

const NotFound = () => {
    const router = useRouter();
    return (
        <>
            <main className="my-10 flex w-full flex-col-reverse items-center justify-center space-x-5 md:my-0 md:h-[100vh] md:flex-row">
                <div className="mt-5 text-center md:mt-0 md:text-left">
                    <h5 className="">Error 404</h5>
                    <h1 className="font-garamond text-4xl font-bold uppercase md:text-5xl">
                        Not Found
                    </h1>
                    <p className="mt-3 mb-5 text-base tracking-wide md:mb-10 md:w-full md:text-xl">
                        Sorry, we can&apos;t find that page!
                        <br /> Don&apos;t worry though, everything is STILL
                        AWESOME!
                    </p>
                    <button
                        onClick={() => router.back()}
                        className="h-fit w-fit border border-black px-4 py-2 text-sm transition duration-200 hover:bg-black hover:text-white sm:text-sm md:text-base"
                    >
                        Go Back
                    </button>
                </div>
                <div>
                    <Suspense fallback={null}>
                        <Ghost className="h-56 w-56 md:h-72 md:w-72" />
                    </Suspense>
                </div>
            </main>
        </>
    );
};

NotFound.title = 'NotFound';
NotFound.Layout = EmptyLayout;

export default NotFound;
