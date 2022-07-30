import React from 'react';
import Hero from '../common/components/home/Hero';
import dynamic from 'next/dynamic';
const BuyerLayout = dynamic(() => import('../layouts/BuyerLayout'), {
    suspense: true,
});
function Home() {
    return (
        <>
            <div className="-mt-28">
                <Hero />
            </div>
        </>
    );
}

Home.Layout = BuyerLayout;

export default Home;
