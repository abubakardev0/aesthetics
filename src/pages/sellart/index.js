import Link from 'next/link';

import Details from '@/icons/Details';
import ImageAdd from '@/icons/ImageAdd';
import Tick from '@/icons/Tick';
const SellArt = () => {
    return (
        <>
            <section className="mb-10 space-y-10 px-5 md:px-8">
                <div className="relative flex h-64 flex-col items-center justify-center rounded-xl bg-sky-100/50 md:h-80">
                    <span className="absolute top-5 left-10 h-3 w-3 rounded-full bg-yellow-400 md:top-10 md:left-48 md:h-5 md:w-5"></span>
                    <span className="absolute top-4 right-8 h-2 w-2 rounded-full bg-green-400 md:top-20 md:right-56 md:h-3 md:w-3"></span>
                    <h3 className="text-xs font-medium uppercase tracking-wide md:text-sm">
                        Sell art with Aesthetics
                    </h3>
                    <h1 className="mt-3 text-center text-lg font-semibold sm:text-xl md:text-4xl">
                        Achieve more by giving colors to people&#180;s life
                    </h1>
                    <p className="mt-4 text-center text-xs md:text-base">
                        We will find the best buyer for your work and arrange
                        shipping and secure payment when it sells.
                    </p>
                    <button className="mt-6 h-10 w-36 rounded-sm border border-black bg-none text-sm transition-all hover:bg-black hover:text-white md:h-12 md:w-44 md:text-lg">
                        <Link href="/sellart/submit">
                            <a>Submit an artwork</a>
                        </Link>
                    </button>
                    <span className="absolute bottom-6 left-6 h-2 w-2 rounded-full bg-cyan-500 md:bottom-10 md:left-20 md:h-4 md:w-4"></span>
                    <span className="absolute bottom-5 right-10 h-3 w-3 rounded-full bg-orange-400 md:bottom-8 md:right-56"></span>
                </div>
                <div className="mt-6 space-y-5">
                    <h2 className="mt-3 text-center text-xl font-semibold md:text-2xl">
                        How it works?
                    </h2>
                    <div className="flex flex-col items-center justify-evenly md:flex-row">
                        <Item
                            name={Details}
                            title="Tell us about your item"
                            description="Add artwork dimensions , history and documentation"
                        />
                        <Item
                            name={ImageAdd}
                            title="Upload Photos"
                            description="Take front and back images of your item"
                        />
                        <Item
                            name={Tick}
                            title="Submit your artwork"
                            description="All done, we`ll review your artwork and get back to you."
                        />
                    </div>
                </div>
                <div className="text-center">
                    <h3 className="text-sm font-medium uppercase">
                        Sell art from your collection
                    </h3>
                    <button className="mt-6 h-10 w-32 rounded-sm bg-black bg-none text-sm text-white transition-all hover:opacity-80 md:h-12 md:w-40 md:text-lg">
                        <Link href="/seller/">
                            <a>Start Selling</a>
                        </Link>
                    </button>
                </div>
            </section>
        </>
    );
};

export default SellArt;
SellArt.title = 'Sell Art';

const Item = (props) => {
    return (
        <div className="flex h-fit w-52 flex-col items-center justify-center p-4">
            <props.name className="mb-3 h-12 w-12 text-[#252525] md:h-16 md:w-16" />
            <h2 className="textbase font-bold md:text-lg">{props.title}</h2>
            <p className="text-center text-sm">{props.description}</p>
        </div>
    );
};
