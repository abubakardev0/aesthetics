import '../../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from '../common/hooks/useAuth';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../common/components/Loader';
const BuyerLayout = dynamic(() => import('../layouts/BuyerLayout'), {
    suspense: true,
});

function App({ Component, pageProps }) {
    const Layout = Component.Layout || BuyerLayout;
    return (
        <AuthProvider>
            <NextUIProvider>
                <Suspense fallback={<Loader />}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Suspense>
            </NextUIProvider>
        </AuthProvider>
    );
}

export default App;
