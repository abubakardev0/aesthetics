import Header from '../common/components/navbar/Header';
import Footer from '../common/components/footer/Footer';

function BuyerLayout({ children }) {
    return (
        <>
            <div className="mb-28">
                <Header />
            </div>
            <main>{children}</main>
            <footer className="bottom-0 mb-16 md:mb-0">
                <Footer />
            </footer>
        </>
    );
}

export default BuyerLayout;
