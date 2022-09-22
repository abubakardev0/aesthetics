import { useEffect } from 'react';
import Plus from '@/icons/Plus';

function Alert({ show, setShow, type, message }) {
    useEffect(() => {
        const timeId = setTimeout(() => {
            setShow(false);
        }, 5000);

        return () => {
            clearTimeout(timeId);
        };
    }, []);

    if (!show) {
        return null;
    }
    const color =
        type === 'success'
            ? 'text-green-500 bg-green-100'
            : 'text-red-500 bg-red-100';

    return (
        <div
            className={`md:max-w-96 fixed bottom-10 right-2 z-50 w-fit max-w-full rounded-lg px-5 py-4 md:right-4 ${color} text-base`}
            role="alert"
        >
            <span className="font-medium uppercase">{type}!</span>
            <span className="ml-2 mr-4">{message}</span>
            <button
                onClick={() => setShow(false)}
                className="absolute right-2 top-1"
            >
                <Plus className="h-6 w-6 rotate-45" />
            </button>
        </div>
    );
}

export default Alert;
