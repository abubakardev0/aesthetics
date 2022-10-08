import { useState, useEffect } from 'react';

import { db, auth } from '@/firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';

import { Input, Loading } from '@nextui-org/react';

function AddressForm({ errors, register }) {
    const [address, setAddress] = useState({});

    useEffect(() => {
        async function getData() {
            const ref = await getDoc(doc(db, 'users', auth.currentUser.uid));
            if (ref.exists()) {
                setAddress({
                    ...ref.data().address,
                });
            }
        }
        getData();
    }, []);
    if (!address) {
        return (
            <div className="grid place-content-center">
                <Loading />
            </div>
        );
    }
    return (
        <>
            <Input
                width="100%"
                clearable
                color="black"
                type="text"
                label="Full Name"
                aria-label="name"
                size="lg"
                initialValue={address.name}
                placeholder="Your Name"
                {...register('name', {
                    required: true,
                    pattern: /^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/i,
                })}
            />
            {errors.name && (
                <span className="text-sm text-red-500">
                    Is your name spelled right?
                </span>
            )}
            <Input
                width="100%"
                color="black"
                type="text"
                label="Contact Number"
                labelLeft="+92"
                aria-label="phone"
                size="lg"
                initialValue={address.phone}
                placeholder="345-5896989"
                className="text-gray-400"
                {...register('phone', {
                    pattern: /^[0-9]{3}[0-9]{7}$/i,
                    required: true,
                })}
            />
            {errors.phone && (
                <span className="text-sm text-red-500">
                    The phone number does not fit the rule.
                </span>
            )}
            <div>
                <label htmlFor="province" className="mb-2 block">
                    Province
                </label>
                <select
                    id="province"
                    name="province"
                    className="block w-full rounded-xl border border-gray-100 bg-gray-100 p-2.5 text-[14px] text-gray-400"
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
            <div className="flex items-center space-x-3">
                <div>
                    <Input
                        width="100%"
                        color="black"
                        type="text"
                        label="City"
                        aria-label="city"
                        size="lg"
                        initialValue={address.city}
                        helperText={
                            errors.city && (
                                <span className="text-sm text-red-500">
                                    Make sure it's right
                                </span>
                            )
                        }
                        placeholder="Your City"
                        className="text-gray-400"
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
                <div>
                    <Input
                        width="100%"
                        color="black"
                        type="text"
                        label="Zip Code"
                        aria-label="zip code"
                        initialValue={address.zip}
                        size="lg"
                        helperText={
                            errors.zip && (
                                <span className="text-sm text-red-500">
                                    Make sure it's right
                                </span>
                            )
                        }
                        placeholder="Zip Code"
                        className="text-gray-400"
                        {...register('zip', {
                            required: true,
                            maxLength: 5,
                        })}
                    />
                </div>
            </div>
            <Input
                width="100%"
                color="black"
                type="text"
                label="Address"
                aria-label="address"
                size="lg"
                initialValue={address.address}
                placeholder="Your Complete Address"
                className="text-gray-400"
                {...register('address', {
                    required: true,
                })}
            />
            {errors.address && (
                <span className="text-sm text-red-500">
                    Make sure it's right
                </span>
            )}
        </>
    );
}

export default AddressForm;
