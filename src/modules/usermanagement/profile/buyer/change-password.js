import { Input } from '@nextui-org/react';

const PasswordChange = ({ register, errors }) => {
    return (
        <>
            <Input.Password
                width="100%"
                clearable
                color="black"
                type="password"
                label="Current Password"
                placeholder="Your Current Password"
                {...register('currentPassword', {
                    required: true,
                    minLength: 8,
                })}
            />
            {errors.currentPassword && (
                <p className="text-xs italic text-red-500">Invalid password</p>
            )}
            <Input.Password
                width="100%"
                clearable
                color="black"
                type="password"
                label="New Password"
                placeholder="New Password"
                {...register('newPassword', {
                    required: true,
                    minLength: 8,
                })}
            />
            {errors.newPassword && (
                <p className="text-xs italic text-red-500">Invalid password</p>
            )}
        </>
    );
};

export default PasswordChange;
