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
                className="block w-full cursor-text rounded-xl bg-slate-100 p-3 text-sm text-gray-900"
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
