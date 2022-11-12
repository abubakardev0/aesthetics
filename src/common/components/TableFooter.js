import { useEffect } from 'react';
import Arrow from '@/icons/Arrow';

const TableFooter = ({ range, setPage, page, slice }) => {
    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage]);

    return (
        <div className="flex w-full items-center justify-between px-3">
            <div className="text-sm text-gray-700">
                Showing
                <span className="mx-1 font-semibold text-gray-900">
                    {slice.length}
                </span>
                Entries
            </div>
            <ul className="mt-2 inline-flex items-center -space-x-px">
                <li>
                    <button
                        onClick={() =>
                            setPage((prev) => (prev === 1 ? 1 : prev - 1))
                        }
                        className="ml-0 block h-10 rounded-l-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                        <span className="sr-only">Previous</span>
                        <Arrow className="h-4 w-4 rotate-180" />
                    </button>
                </li>
                {range.map((el, index) => (
                    <li>
                        <button
                            key={index}
                            onClick={() => setPage(el)}
                            className={` ${
                                page === el
                                    ? 'bg-gray-200 text-gray-700'
                                    : 'bg-white'
                            } h-10 border border-gray-300 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
                        >
                            {el}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() =>
                            setPage((prev) =>
                                prev === range.length ? range.length : prev + 1
                            )
                        }
                        className="block h-10 rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                        <span className="sr-only">Next</span>
                        <Arrow className="h-4 w-4" />
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default TableFooter;
