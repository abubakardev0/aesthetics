import Head from 'next/head';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from '@/hooks/useAuth';
import { Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { StateMachineProvider, createStore } from 'little-state-machine';

import ErrorBoundary from '@/commoncomponents/ErrorBoundary/ErrorBoundary';
import Loader from '@/commoncomponents/Loader';
import BuyerLayout from '@/layouts/BuyerLayout';

import '../../styles/globals.css';

function App({ Component, pageProps, router }) {
    const Layout = Component.Layout || BuyerLayout;
    const shouldReduceMotion = useReducedMotion();

    createStore({
        details: {
            mediums: [],
            surfaces: [],
            images: [],
            certificates: [],
        },
    });
    const variants = {
        pageInitial: {
            opacity: 0.5,
        },
        pageAnimate: {
            opacity: 1,
        },
    };
    return (
        <>
            <Head>
                <title>{Component.title}</title>
            </Head>
            <StateMachineProvider>
                <NextUIProvider>
                    <AuthProvider>
                        <Suspense fallback={<Loader />}>
                            <motion.div
                                key={router.route}
                                variants={!shouldReduceMotion ? variants : null}
                                initial="pageInitial"
                                animate="pageAnimate"
                            >
                                <Layout>
                                    <ErrorBoundary>
                                        <Component {...pageProps} />
                                    </ErrorBoundary>
                                </Layout>
                            </motion.div>
                        </Suspense>
                    </AuthProvider>
                </NextUIProvider>
            </StateMachineProvider>
        </>
    );
}

export default App;
