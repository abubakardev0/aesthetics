import { useState } from 'react';

import Header from '@/buyer/components/header/Header';
import Footer from '@/buyer/components/footer/Footer';
import Tabbar from '@/buyer/components/header/Tabbar';

function Layout({ children }) {
    const [scroll, setScroll] = useState(false);
    const changeNavbarColor = () => {
        if (window.scrollY >= 80) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    };
    window.addEventListener('scroll', changeNavbarColor);
    return (
        <>
            <header
                className={`${
                    scroll ? 'bg-white' : 'bg-none text-white'
                } fixed top-0 z-40 w-full overflow-visible transition-colors duration-500`}
            >
                <Header />
            </header>
            <main className="">{children}</main>
            <footer className="sticky mb-16 w-full md:mb-0">
                <Tabbar />
                <Footer />
            </footer>
        </>
    );
}

export default Layout;
