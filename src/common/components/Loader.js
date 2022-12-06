function Loader() {
    return (
        <div className="fixed top-0 left-0 z-50 grid h-screen w-screen place-content-center bg-white">
            <div className="loader triangle relative inline-block h-9 w-9">
                <svg viewBox="0 0 86 80">
                    <polygon points="43 8 79 72 7 72"></polygon>
                </svg>
            </div>
        </div>
    );
}

export default Loader;
