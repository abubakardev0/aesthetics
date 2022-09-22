import { Input, Radio } from '@nextui-org/react';

function BasicDetails({ setStep, register, errors, trigger }) {
    const nextStep = async () => {
        const isValid = await trigger(['name', 'email', 'password']);
        if (isValid) {
            setStep((e) => e + 1);
        }
    };
    return (
        <>
            <Input
                width="100%"
                clearable
                color="black"
                type="text"
                label="Name"
                placeholder="Your Name"
                size="lg"
                className="mb-5"
                {...register('name', {
                    required: true,
                })}
            />
            {errors.name && (
                <p className="text-xs italic text-red-500">Invalid name</p>
            )}
            <Input
                width="100%"
                clearable
                color="black"
                type="email"
                label="E-mail"
                placeholder="Your E-mail"
                className="mb-5"
                size="lg"
                {...register('email', {
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
                })}
            />
            {errors.email && (
                <p className="text-xs italic text-red-500">Invalid e-mail</p>
            )}
            <Input.Password
                width="100%"
                clearable
                color="black"
                type="password"
                label="Password"
                placeholder="Your Password"
                className="mb-5"
                size="lg"
                {...register('password', {
                    required: true,
                    minLength: 8,
                })}
            />
            {errors.password && (
                <p className="text-xs italic text-red-500">Invalid password</p>
            )}
            <Radio.Group
                label="Select your gender:"
                defaultValue="male"
                size="sm"
                orientation="horizontal"
                className="mb-5 mt-1"
                isRequired
                {...register('gender')}
            >
                <Radio value="male">male</Radio>
                <Radio value="female">female</Radio>
                <Radio value="other">non-binary</Radio>
            </Radio.Group>

            <button
                onClick={nextStep}
                className="w-full rounded-md bg-neutral-800 p-3 font-medium
                                tracking-wide text-gray-100 shadow-lg hover:bg-neutral-700 focus:outline-none
                                active:bg-neutral-900"
            >
                Create an Account
            </button>
        </>
    );
}

export default BasicDetails;
