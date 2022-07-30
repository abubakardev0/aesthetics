import { Loading } from '@nextui-org/react';
function Loader() {
    return (
        <div className="grid h-screen w-screen place-content-center">
            <Loading type="points" color="currentColor" size="md" />
        </div>
    );
}

export default Loader;
