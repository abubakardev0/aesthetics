import { formatCurrency } from '@/commoncomponents/functions';

const Bill = ({ subtotal, shipping, totalAmount }) => {
    return (
        <div className="flex w-full flex-col space-y-6 rounded-md bg-white px-4 py-6 drop-shadow-md md:p-6 xl:p-8   ">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Summary
            </h3>
            <div className="flex w-full flex-col items-center justify-center space-y-4 border-b border-gray-200 pb-4">
                <div className="flex w-full  justify-between">
                    <p className="text-base leading-4 text-gray-800">
                        Subtotal
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                        {formatCurrency(subtotal)}
                    </p>
                </div>
                <div className="flex w-full items-center justify-between">
                    <p className="text-base leading-4 text-gray-800">
                        Shipping
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                        {formatCurrency(shipping)}
                    </p>
                </div>
            </div>
            <div className="flex w-full items-center justify-between">
                <p className="text-base font-semibold leading-4 text-gray-800">
                    Total
                </p>
                <p className="text-base font-semibold leading-4 text-gray-600">
                    {formatCurrency(totalAmount)}
                </p>
            </div>
        </div>
    );
};
export default Bill;
