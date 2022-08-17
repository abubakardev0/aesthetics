import Header from '@/buyer/components/header/Header';
import Footer from '@/buyer/components/footer/Footer';

function BuyerLayout({ children }) {
    return (
        <>
            <div className="mb-20 md:mb-28">
                <Header />
            </div>
            <main>{children}</main>
            <footer className="sticky mb-16 w-full md:mb-0">
                <Footer />
            </footer>
        </>
    );
}

export default BuyerLayout;
