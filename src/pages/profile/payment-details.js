import React from 'react';

function Payment() {
    return (
        <>
            {/* <div className="h-fit space-y-2">
                <h1 className="text-2xl font-semibold">Payment Info</h1>
                <div className="flex space-x-4">
                    <MastercardIcon />
                    <VisaIcon />
                    <UnionPayIcon />
                </div>
                <form onSubmit={() => handleSubmit(onSubmit)}>
                    <div className="mt-6">
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm text-gray-900"
                        >
                            Name on Card
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="font-cata block w-full rounded-lg  border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                            placeholder="John Doe"
                            {...register('name', { required: true })}
                        />
                        {errors.name && (
                            <span className="text-sm text-red-500">
                                Name is required
                            </span>
                        )}
                    </div>
                    <div className="mt-3">
                        <label
                            htmlFor="cardNumber"
                            className="mb-2 block text-sm text-gray-900"
                        >
                            Card Number
                        </label>
                        <input
                            type="text"
                            id="cardNumber"
                            className="font-cata block w-full rounded-lg  border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                            placeholder="8956-9969-7894-8521"
                            {...register(
                                'cardnumber',
                                { required: true },
                                {
                                    pattern:
                                        /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/i,
                                }
                            )}
                        />
                        {errors.cardnumber && (
                            <span className="text-sm text-red-500">
                                Valid Card Number required
                            </span>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="mt-3 w-3/6">
                            <label
                                htmlFor="expiryDate"
                                className="mb-2 block text-sm text-gray-900"
                            >
                                Expiry Date
                            </label>
                            <input
                                type="date"
                                id="expiryDate"
                                className="font-cata block w-full rounded-lg  border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                                {...register('expirydate', { required: true })}
                            />
                            {errors.expirydate && (
                                <span className="text-sm text-red-500">
                                    Expiry Date is required
                                </span>
                            )}
                        </div>
                        <div className="mt-3 w-2/6">
                            <label
                                htmlFor="cvv"
                                className="mb-2 block text-sm text-gray-900"
                            >
                                CVV
                            </label>
                            <input
                                type="number"
                                id="cvv"
                                className="font-cata block w-full rounded-lg  border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                                placeholder="256"
                                {...register('cvv', {
                                    required: true,
                                    maxLength: 3,
                                })}
                            />
                            {errors.cvv && (
                                <span className="text-sm text-red-500">
                                    CVV is required
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mt-6 h-12 w-full rounded-2xl bg-blue-600 font-semibold text-white"
                    >
                        Checkout
                    </button>
                </form>
            </div> */}
            payment
        </>
    );
}

export default Payment;
