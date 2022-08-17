import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Head from 'next/head';
const Ghost = dynamic(() => import('@/icons/BabyGhost'), {
    suspense: true,
});
const NotFound = () => {
    return (
        <>
            <Head>
                <title>Not found</title>
            </Head>
            <main className="my-10 flex w-full flex-col-reverse items-center justify-center space-x-5 md:my-0 md:h-[80vh] md:flex-row">
                <div className="mt-5 text-center md:mt-0 md:text-left">
                    <h5 className="">Error 404</h5>
                    <h1 className="font-garamond text-4xl font-bold uppercase md:text-5xl">
                        Not Found
                    </h1>
                    <p className="mt-3 mb-5 text-base md:w-4/6 md:text-xl">
                        Hey asthete, we can`t seem to find the page you are
                        looking for. But you can
                    </p>
                    <Link href="/artworks">
                        <a className="text-lg font-semibold underline">
                            Explore Artworks
                        </a>
                    </Link>
                    <p className="my-3 md:my-5">or</p>
                    <button className="h-fit w-fit border-2 border-black px-4 py-2 text-sm transition duration-200 hover:bg-black hover:text-white sm:text-sm md:text-base">
                        <Link href="/">
                            <a>Back to Home</a>
                        </Link>
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

export default NotFound;
