import { Input } from '@nextui-org/react';

function AddressForm({ errors, register, name, trigger }) {
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
                initialValue={name}
                {...register('name', { required: true })}
            />
            {errors.name && (
                <div className="text-sm text-red-500">
                    {errors.name.message}
                </div>
            )}
            <Input
                width="100%"
                color="black"
                type="text"
                label="Contact Number"
                labelLeft="+92"
                aria-label="phone"
                size="lg"
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
                    <option value="azad kashmir">Azad Kashmir</option>
                    <option value="balochistan">Balochistan</option>
                    <option value="fata">FATA</option>
                    <option value="gilgit baltistan">Gilgit Baltistan</option>
                    <option value="islamabad">Islamabad</option>
                    <option value="khyber pakhtunkhwa">
                        Khyber Pakhtunkhwa
                    </option>
                    <option value="sindh">Sindh</option>
                    <option value="punjab">Punjab</option>
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
                        })}
                    />
                </div>
                <div>
                    <Input
                        width="100%"
                        color="black"
                        type="text"
                        label="Zip Code"
                        aria-label="zip code"
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
