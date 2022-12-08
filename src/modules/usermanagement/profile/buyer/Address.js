import { db, auth } from '@/firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';

import { Input, Loading } from '@nextui-org/react';
import useSWR from 'swr';

import Error from '@/commoncomponents/Error';

function AddressForm({ errors, register }) {
    const { data: address, error } = useSWR('address-data', async () => {
        const ref = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (ref.exists()) {
            return {
                ...ref.data().address,
            };
        }
    });
    if (error) {
        return <Error />;
    }

    if (!address) {
        return (
            <div className="grid place-content-center">
                <Loading />
            </div>
        );
    }
    return (
        <>
            <div className="space-y-1">
                <label className="text-sm">Full Name</label>
                <input
                    type="text"
                    className="w-full rounded-lg border-[3px] border-gray-300 p-2 capitalize transition-transform delay-75 duration-300 placeholder:text-sm hover:border-black focus:-translate-y-[2px] focus:border-black"
                    placeholder="Your Name"
                    defaultValue={address.name ?? ''}
                    {...register('name', {
                        required: true,
                        pattern:
                            /^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/i,
                    })}
                />
                {errors.name && (
                    <span className="text-sm text-red-500">
                        Is your name spelled right?
                    </span>
                )}
            </div>
            <div className="space-y-1">
                <label className="text-sm">Contact</label>
                <div className="relative mb-6 flex w-full space-x-2 rounded-lg border-[3px] border-gray-300 p-2 capitalize transition-transform delay-75 duration-300 hover:border-black active:-translate-y-[2px] active:border-black">
                    <span>+92</span>
                    <input
                        className="placeholder:text-sm"
                        placeholder="345-5896989"
                        defaultValue={address.phone ?? ''}
                        {...register('phone', {
                            pattern: /^[0-9]{3}[0-9]{7}$/i,
                            required: true,
                        })}
                    />
                </div>
                {errors.phone && (
                    <span className="text-sm text-red-500">
                        The phone number does not fit the rule.
                    </span>
                )}
            </div>

            <div>
                <label htmlFor="province" className="mb-2 block">
                    Province
                </label>
                <select
                    id="province"
                    name="province"
                    className="w-full rounded-lg border-[3px] border-gray-300 p-2 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-black focus:-translate-y-[2px] focus:border-black"
                    required
                    {...register('province', {
                        required: true,
                    })}
                >
                    <option disabled>Select your province</option>
                    <option
                        value="azad kashmir"
                        selected={
                            address.province === 'azad kashmir' ? true : false
                        }
                    >
                        Azad Kashmir
                    </option>
                    <option
                        value="balochistan"
                        selected={
                            address.province === 'balochistan' ? true : false
                        }
                    >
                        Balochistan
                    </option>
                    <option
                        value="fata"
                        selected={address.province === 'fata' ? true : false}
                    >
                        FATA
                    </option>
                    <option
                        value="gilgit baltistan"
                        selected={
                            address.province === 'gilgit baltistan'
                                ? true
                                : false
                        }
                    >
                        Gilgit Baltistan
                    </option>
                    <option
                        value="islamabad"
                        selected={
                            address.province === 'islamabad' ? true : false
                        }
                    >
                        Islamabad
                    </option>
                    <option
                        value="khyber pakhtunkhwa"
                        selected={
                            address.province === 'khyber pakhtunkhwa'
                                ? true
                                : false
                        }
                    >
                        Khyber Pakhtunkhwa
                    </option>
                    <option
                        value="sindh"
                        selected={address.province === 'sindh' ? true : false}
                    >
                        Sindh
                    </option>
                    <option
                        value="punjab"
                        selected={address.province === 'punjab' ? true : false}
                    >
                        Punjab
                    </option>
                </select>
                {errors.province && (
                    <span className="text-sm text-red-500">
                        Make sure it's right
                    </span>
                )}
            </div>
            <div className="flex items-center gap-x-3">
                <div className="w-1/2 space-y-1">
                    <label className="text-sm">City</label>
                    <input
                        type="text"
                        className="w-full rounded-lg border-[3px] border-gray-300 p-2 capitalize transition-transform delay-75 duration-300 placeholder:text-sm hover:border-black focus:-translate-y-[2px] focus:border-black"
                        placeholder="Your City"
                        defaultValue={address.city ?? ''}
                        {...register('city', {
                            required: true,
                            pattern:
                                /^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/i,
                        })}
                    />
                    {errors.city && (
                        <span className="text-sm text-red-500">
                            Is your city spelled right?
                        </span>
                    )}
                </div>
                <div className="w-1/2 space-y-1">
                    <label className="text-sm">Zip Code</label>
                    <input
                        className="w-full rounded-lg border-[3px] border-gray-300 p-2 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-black focus:-translate-y-[2px] focus:border-black"
                        placeholder="Zip Code"
                        defaultValue={address.zip ?? ''}
                        {...register('zip', {
                            required: true,
                            maxLength: 5,
                        })}
                    />
                    {errors.zip && (
                        <span className="text-sm text-red-500">
                            Make sure it's right
                        </span>
                    )}
                </div>
            </div>
            <div className="space-y-1">
                <label className="text-sm">Address Line</label>
                <input
                    type="text"
                    className="w-full rounded-lg border-[3px] border-gray-300 p-2 capitalize transition-transform delay-75 duration-300 placeholder:text-sm hover:border-black focus:-translate-y-[2px] focus:border-black"
                    placeholder="Your Address"
                    defaultValue={address.address ?? ''}
                    {...register('address', {
                        required: true,
                    })}
                />
                {errors.address && (
                    <span className="text-sm text-red-500">
                        Make sure it's right
                    </span>
                )}
            </div>
        </>
    );
}

export default AddressForm;
