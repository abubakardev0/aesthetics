import Header from '@/buyer/components/header/Header';
import Footer from '@/buyer/components/footer/Footer';
import Tabbar from '@/buyer/components/header/Tabbar';

function BuyerLayout({ children }) {
    return (
        <>
            <header className="fixed top-0 z-50 w-full overflow-visible bg-[#ffffff] bg-opacity-50 backdrop-blur-lg">
                <Header />
            </header>
            <main className="mt-12 md:mt-20">{children}</main>
            <footer className="sticky mb-16 w-full md:mb-0">
                <Tabbar />
                <Footer />
            </footer>
        </>
    );
}

export default BuyerLayout;
