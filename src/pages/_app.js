import '../../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from '@/hooks/useAuth';
import { Suspense } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import Loader from '@/commoncomponents/Loader';
import { motion } from 'framer-motion';
import BuyerLayout from '@/layouts/BuyerLayout';

function App({ Component, pageProps, router }) {
    const Layout = Component.Layout || BuyerLayout;
    return (
        <motion.div
            key={router.route}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
                transition: {
                    duration: 0.5,
                },
            }}
        >
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
        </motion.div>
    );
}

export default App;
