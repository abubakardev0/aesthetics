import Head from 'next/head';

import ItemBlock from '../modules/immediatesell/shoppingbag/ItemBlock';
import PaymentBlock from '../modules/immediatesell/shoppingbag/PaymentBlock';
import EmptyBag from '../modules/immediatesell/shoppingbag/EmptyBag';

export default function Bag() {
    const isEmpty = true;
    return (
        <>
            <Head>
                <title>Shopping Bag</title>
            </Head>
            {isEmpty ? (
                <EmptyBag />
            ) : (
                <section className="container md:mx-auto">
                    <div className="w-full">
                        <div className="flex flex-col items-center">
                            <h3 className="text-xl font-semibold uppercase leading-loose">
                                Your Shopping Bag
                            </h3>
                            <p className="w-fit border-b-2 border-gray-400 ">
                                Review of
                                <span className="mx-1 text-lg font-semibold">
                                    123
                                </span>
                                items PKR.
                                <span className="mx-1 text-lg font-semibold">
                                    123,123123
                                </span>
                            </p>
                        </div>
                        <div className="my-5 flex w-full flex-col items-start justify-around md:flex-row">
                            <div className=" w-full space-y-4 md:w-7/12">
                                <ItemBlock />
                                <ItemBlock />
                            </div>
                            <div className="w-full p-6 font-medium md:-mt-10 md:w-3/12 md:rounded-3xl md:border-2 md:border-slate-200">
                                <PaymentBlock />
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
