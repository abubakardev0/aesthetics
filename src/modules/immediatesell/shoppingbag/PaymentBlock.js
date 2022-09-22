import Mastercard from '../../../common/utils/icons/MasterCard';
import Visa from '../../../common/utils/icons/Visa';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Input, useInput } from '@nextui-org/react';

const PaymentBlock = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    const { value, reset, bindings } = useInput('');

    const mastercard = (value) => {
        return value.match(
            /^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/i
        );
    };

    const visacard = (value) => {
        return value.match(/^4[0-9]{12}(?:[0-9]{3})?$/i);
    };
    const helper = useMemo(() => {
        if (!value)
            return {
                icon: '',
                text: '',
                color: '',
            };
        const isMastercard = mastercard(value);
        const isVisa = visacard(value);
        if (isMastercard) {
            return {
                icon: <Mastercard className="h-6 w-6 " />,
                text: '',
                color: 'primary',
            };
        } else if (isVisa) {
            return {
                icon: <Visa className="h-6 w-6 " />,
                text: '',
                color: 'primary',
            };
        } else {
            return {
                icon: '',
                text: 'Invalid',
                color: 'error',
            };
        }
    }, [value]);
    return (
        <div className="h-fit space-y-2">
            <h1 className="text-2xl font-semibold">Payment Info</h1>
            <div className="flex space-x-4 py-2">
                <Mastercard />
                <Visa />
            </div>
            <form
                onSubmit={() => handleSubmit(onSubmit)}
                className="my-4 w-full space-y-6"
            >
                <Input
                    clearable
                    shadow={false}
                    type="string"
                    label="Name on Card"
                    placeholder="John Doe"
                    fullWidth
                />
                <Input
                    {...bindings}
                    shadow={false}
                    status={helper.color}
                    color={helper.color}
                    helperColor={helper.color}
                    helperText={helper.text}
                    labelRight={helper.icon}
                    type="string"
                    label="Card Number"
                    placeholder="1589558955956688"
                    fullWidth
                />
                <div className="flex items-center justify-between space-x-4">
                    <Input
                        shadow={false}
                        type="month"
                        label="Expiry Date"
                        width="60%"
                    />
                    <Input
                        clearable
                        shadow={false}
                        type="number"
                        label="CVV"
                        placeholder="234"
                        width="40%"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-6 h-12 w-full rounded-2xl bg-blue-600 font-semibold text-white"
                >
                    Checkout
                </button>
            </form>
        </div>
    );
};

export default PaymentBlock;
