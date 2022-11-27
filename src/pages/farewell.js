import Head from 'next/head';

function Farewell() {
    return (
        <>
            <Head>
                <title>Farewell</title>
            </Head>
            <main className="grid h-screen place-content-center">
                <h1 className="text-center font-garamond text-4xl font-bold uppercase md:text-5xl">
                    Sad to see you go!
                </h1>
                <p className="text-2xl">
                    However, Thanks for using out platform.
                </p>
            </main>
        </>
    );
}

export default Farewell;
