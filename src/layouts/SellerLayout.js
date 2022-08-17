import Header from '@/seller/components/header/Header';
import Sidebar from '@/seller/components/sidebar/Sidebar';

function SellerLayout({ children }) {
    return (
        <>
            <header className="sticky top-0 z-50 bg-slate-50">
                <Header />
            </header>
            <main className="bg-slate-50">
                <section className="fixed bottom-1 z-30 h-16 w-full md:left-0 md:h-screen md:w-20">
                    <Sidebar />
                </section>
                <section className="mb-20 md:ml-20 md:mb-0 md:p-5">
                    {children}
                </section>
            </main>
        </>
    );
}

export default SellerLayout;
