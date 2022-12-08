import { formatCurrency } from '@/commoncomponents/functions';

const Shipping = ({ shipping }) => {
    return (
        <div className="flex w-full flex-col justify-center space-y-6 rounded-md border-2 bg-white px-4 py-6 drop-shadow-md md:p-6 xl:p-8   ">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Shipping
            </h3>
            <div className="flex w-full items-start justify-between">
                <div className="flex items-center justify-center space-x-4">
                    <div className="h-8 w-8">
                        <img
                            className="h-full w-full"
                            alt="logo"
                            src="https://i.ibb.co/L8KSdNQ/image-3.png"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-start">
                        <p className="text-lg font-semibold leading-6 text-gray-800">
                            TNT Delivery
                            <br />
                            <span className="text-sm font-normal tracking-wide">
                                Delivery with 7 Business Days
                            </span>
                        </p>
                    </div>
                </div>
                <p className="text-lg font-semibold leading-6 text-gray-800">
                    {formatCurrency(shipping)}
                </p>
            </div>
            <a
                href="https://www.tnt.com/express/en_pk/site/home.html"
                className="w-full rounded-sm border border-[#2D2D2D] bg-none py-2.5 text-center text-base transition-all hover:bg-[#2D2D2D] hover:text-white md:block"
            >
                View Carrier Details
            </a>
        </div>
    );
};

export default Shipping;
