import ErrorIcon from '@/icons/Error';

function Error() {
    return (
        <div className="grid h-screen w-full place-content-center">
            <ErrorIcon
                className="h-16 w-16 place-self-center"
                strokeWidth={2}
            />
            <h5>For some reason, we couldn't load</h5>
        </div>
    );
}

export default Error;
