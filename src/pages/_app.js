import Head from 'next/head';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from '@/hooks/useAuth';
import { Suspense } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import Loader from '@/commoncomponents/Loader';
import BuyerLayout from '@/layouts/BuyerLayout';
import '../../styles/globals.css';

function App({ Component, pageProps }) {
    const Layout = Component.Layout || BuyerLayout;
    return (
        <>
            <Head>
                <title>{Component.title}</title>
            </Head>
            <NextUIProvider>
                <AuthProvider>
                    <Suspense fallback={<Loader />}>
                        <ParallaxProvider>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </ParallaxProvider>
                    </Suspense>
                </AuthProvider>
            </NextUIProvider>
        </>
    );
}

export default App;
