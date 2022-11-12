import PrivateRoute from '@/commoncomponents/routes/Private';
import Header from '@/seller/components/header/Header';
import Sidebar from '@/seller/components/sidebar/Sidebar';

function SellerLayout({ children }) {
    return (
        <PrivateRoute>
            <header className="sticky top-0 z-50 w-screen bg-slate-50">
                <Header />
            </header>
            <main className="bg-slate-50 pb-5">
                <aside className="fixed bottom-1 z-30 h-16 w-full md:left-0 md:h-screen md:w-20">
                    <Sidebar />
                </aside>
                <section className="mb-20 md:ml-20 md:mb-8 md:px-5">
                    {children}
                </section>
            </main>
        </PrivateRoute>
    );
}

export default SellerLayout;

/*
<PrivateRoute>
            <main className="h-screen w-screen bg-slate-50">
                <header className="fixed top-0 z-50 w-screen bg-slate-50">
                    <Header />
                </header>
                <aside className="fixed bottom-1 z-30 h-16 w-full md:left-0 md:h-screen md:w-20">
                    <Sidebar />
                </aside>
                <section className="mb-20 mt-20 md:ml-20 md:mb-0 md:px-5 md:pt-4 md:pb-8">
                    {children}
                </section>
            </main>
        </PrivateRoute>
        */
