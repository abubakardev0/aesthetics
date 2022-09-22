const ShowCounter = ({ countDown }) => {
    countDown = Number(countDown);
    const days = Math.floor(countDown / (3600 * 24));
    const hours = Math.floor((countDown % (3600 * 24)) / 3600);
    const minutes = Math.floor((countDown % 3600) / 60);
    const seconds = Math.floor(countDown % 60);
    return (
        <div className="flex w-full items-center justify-start space-x-4 text-center text-xl sm:text-2xl">
            <DateTimeDisplay value={days} type={'Days'} />
            <DateTimeDisplay value={hours} type={'Hours'} />
            <DateTimeDisplay value={minutes} type={'Mins'} />
            <DateTimeDisplay value={seconds} type={'Seconds'} />
        </div>
    );
};

const DateTimeDisplay = ({ value, type }) => {
    return (
        <div className="w-20 overflow-hidden rounded-md border bg-white py-3 text-black drop-shadow-sm sm:w-24">
            <div x-text="hours">{value}</div>
            <div className="text-xs uppercase">{type}</div>
        </div>
    );
};

export default ShowCounter;
