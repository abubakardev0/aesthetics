import { CardElement } from '@stripe/react-stripe-js';

export default function Card() {
    return (
        <div>
            <label
                htmlFor="card"
                className="mb-2 block pl-1 text-base text-gray-900"
            >
                Card
            </label>
            <span
                id="card"
                className="block rounded-xl border-2 border-gray-300 py-2.5 px-2 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-black active:-translate-y-[2px] active:border-black"
            >
                <CardElement options={CARD_ELEMENT_OPTIONS} />
            </span>
        </div>
    );
}

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
};
