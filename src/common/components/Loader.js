import { Loading } from '@nextui-org/react';
function Loader() {
    return (
        <div className="fixed top-0 left-0 z-50 grid h-screen w-screen place-content-center bg-white">
            <Loading type="points" color="currentColor" size="md" />
        </div>
    );
}

export default Loader;
