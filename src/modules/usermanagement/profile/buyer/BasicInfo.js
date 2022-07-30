import { Input } from '@nextui-org/react';

function BasicInfo({ register, errors, user }) {
    return (
        <>
            <Input
                width="100%"
                clearable
                color="black"
                type="text"
                label="Full Name"
                aria-label="name"
                initialValue={user.displayName}
            />
            <Input
                width="100%"
                color="black"
                type="email"
                label="E-mail"
                aria-label="email"
                initialValue={user.email}
                disabled
                className="text-gray-400"
            />
            <Input
                width="100%"
                color="black"
                type="text"
                label="Contact Number"
                labelLeft="+92"
                aria-label="phone"
                placeholder="345-5896989"
                className="text-gray-400"
                {...register('phone', {
                    pattern: /^[0-9]{3}-[0-9]{7}$/i,
                })}
            />
        </>
    );
}

export default BasicInfo;
