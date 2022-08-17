import { useEffect, useState } from 'react';

const useCountDown = (targetDate) => {
    const [countDown, setCountDown] = useState(
        targetDate - new Date().getTime() / 1000
    );

    useEffect(() => {
        countDown > 0 && setTimeout(() => setCountDown(countDown - 1), 1000);
    }, [countDown]);

    return countDown;
};

export { useCountDown };
