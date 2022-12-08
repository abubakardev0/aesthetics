import { Avatar } from '@nextui-org/react';

import Email from '@/icons/Email';

const Customer = ({ name, email, address }) => {
    return (
        <div className="flex w-full flex-col items-start justify-between rounded-md border-2 bg-white px-4 py-6 drop-shadow-md md:p-6 lg:w-[450px] lg:p-8">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Your Details
            </h3>
            <div className="flex h-full w-full flex-col justify-start md:flex-row md:space-x-6 lg:space-x-8 xl:flex-col xl:space-x-0 ">
                <div className="flex flex-shrink-0 flex-col items-start justify-start">
                    <div className="flex w-full items-center justify-start space-x-4 border-b border-gray-200 py-6 md:py-8">
                        <Avatar text={name[0].toUpperCase()} size="lg" />
                        <p className="text-left text-base font-semibold capitalize leading-4 text-gray-800">
                            {name}
                        </p>
                    </div>
                    <div className="flex w-full items-center justify-start space-x-4 border-b border-gray-200 py-4">
                        <Email className="h-6 w-6" />
                        <p className="text-sm leading-5 text-gray-800">
                            {email}
                        </p>
                    </div>
                    <div className="mt-6 space-y-4 md:mt-8">
                        <p className="text-left text-lg font-medium leading-4 text-gray-800">
                            Shipping Address
                        </p>
                        <p className="w-full text-left text-lg capitalize leading-5 text-gray-600">
                            {address}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Customer;
