import Head from 'next/head';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from '@/hooks/useAuth';
import { Suspense } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

import Loader from '@/commoncomponents/Loader';
import BuyerLayout from '@/layouts/BuyerLayout';

import '../../styles/globals.css';

function App({ Component, pageProps, router }) {
    const Layout = Component.Layout || BuyerLayout;
    const shouldReduceMotion = useReducedMotion();

    const variants = {
        pageInitial: {
            opacity: 0,
        },
        pageAnimate: {
            opacity: 1,
        },
    };
    return (
        <AnimatePresence initial={false} exitBeforeEnter>
            <Head>
                <title>{Component.title}</title>
            </Head>
            <NextUIProvider>
                <AuthProvider>
                    <Suspense fallback={<Loader />}>
                        <ParallaxProvider>
                            <motion.div
                                key={router.route}
                                variants={!shouldReduceMotion ? variants : null}
                                initial="pageInitial"
                                animate="pageAnimate"
                            >
                                <Layout>
                                    <Component {...pageProps} />
                                </Layout>
                            </motion.div>
                        </ParallaxProvider>
                    </Suspense>
                </AuthProvider>
            </NextUIProvider>
        </AnimatePresence>
    );
}

export default App;
