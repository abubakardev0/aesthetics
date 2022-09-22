import { splitValue } from '@/commoncomponents/functions';

const VirtualCard = ({ userName, cardNumber, expiryDate, cardType }) => {
    return (
        <div className="relative h-52 w-[300px] space-y-6 rounded-xl bg-[#C1EFFF] px-6 py-6 text-white shadow-lg shadow-[#C1EFFF]/50 backdrop-blur-sm md:h-60 md:w-96 md:space-y-8 md:py-10 md:px-6">
            <div>{cardType}</div>
            <div>
                <h5 className="text-sm uppercase tracking-wide text-gray-500">
                    Card Number
                </h5>
                <p className="text-base font-medium tracking-wider text-gray-800 md:text-lg">
                    {splitValue(cardNumber)}
                </p>
            </div>
            <div className="flex justify-between">
                <div>
                    <h5 className="text-sm uppercase tracking-wide text-gray-500 ">
                        Card Holder
                    </h5>
                    <p className="whitespace-pre-wrap text-base font-medium text-gray-800 md:text-lg">
                        {userName}
                    </p>
                </div>
                <div>
                    <h5 className="text-sm uppercase tracking-wide text-gray-500">
                        Expiry Date
                    </h5>
                    <p className="text-base font-medium text-gray-800 md:text-lg">
                        {expiryDate}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VirtualCard;
