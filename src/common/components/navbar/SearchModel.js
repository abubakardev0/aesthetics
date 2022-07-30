import { motion } from 'framer-motion';
import Plus from '../../utils/icons/Plus';
import Search from '../../utils/icons/Search';

function SearchModel(props) {
    return (
        <motion.div
            initial={{ x: '-100', opacity: 0 }}
            animate={{
                x: '0',
                opacity: 1,
                transition: {
                    duration: 0.1,
                    type: 'spring',
                    damping: 25,
                    stiffness: 500,
                },
            }}
            className={`fixed top-0 right-0 left-0 z-50 h-full w-full bg-slate-500/25 transition-all duration-500 ease-in-out`}
        >
            <div className="flex h-16 w-full flex-col items-center bg-[#010101]">
                <div className="relative mx-auto my-auto w-5/6 md:w-1/2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                        <Search className="h-6 w-6" stroke="white" />
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button
                            onClick={() => {
                                props.openSearchModel(false);
                            }}
                        >
                            <Plus
                                className="h-6 w-6 rotate-45"
                                stroke="white"
                            />
                        </button>
                    </div>
                    <input
                        type="text"
                        id="search"
                        className="block w-full bg-[#010101] p-2.5 pl-8 text-xs leading-loose text-white shadow-slate-700 focus:outline-none sm:pl-16 sm:text-sm "
                        placeholder="Search by title, artists, categories etc."
                    />
                </div>
            </div>
            <div className="relative mx-auto w-full rounded-b-2xl border-b bg-white py-4 px-3 shadow sm:w-5/6 sm:py-8 md:w-1/2">
                <h1 className="cursor-default px-3 uppercase">Quick Links</h1>
                <ul className="my-1 space-y-1">
                    <li className="rounded-lg py-1 pl-3 text-sm hover:bg-blue-200/50 sm:text-base">
                        Abstract Art
                    </li>
                </ul>
            </div>
        </motion.div>
    );
}
export default SearchModel;
