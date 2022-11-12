import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import useTable from '@/hooks/useTable';
import TableFooter from '@/commoncomponents/TableFooter';

import { Tooltip } from '@nextui-org/react';

import DeleteArtwork from '@/seller/components/artwork/Delete';
import Edit from '@/icons/Edit';

function Table({ columns, data }) {
    const [dataList, setList] = useState(data);
    const [sortby, setSort] = useState('name');
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, 10);

    function sortList() {
        console.log(dataList);
        const list = dataList.sort((a, b) =>
            a.height > b.height ? 1 : b.height > a.height ? -1 : 0
        );
        console.log(list);
    }
    return (
        <>
            <div className="my-5">
                <select className="block w-fit rounded-md bg-slate-100 px-2 py-3 text-sm font-[500] text-gray-700">
                    <option disabled>Sort By:</option>
                    <option value="name" onClick={sortList}>
                        Name
                    </option>
                    <option value="date">Date</option>
                    <option value="status">Status</option>
                </select>
            </div>
            <div className="relative overflow-x-auto rounded-md border">
                <table className="w-full text-left text-base text-gray-700">
                    <thead className="border-b bg-slate-100 py-2 text-sm uppercase text-gray-600">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    scope="col"
                                    onClick={sortList}
                                    className="py-3 px-3 md:px-5"
                                >
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataList.map((item) => {
                            return (
                                <tr className="border-b bg-white" key={item.id}>
                                    <th
                                        scope="row"
                                        className="flex items-center gap-x-3 whitespace-nowrap py-4 px-3 md:px-5"
                                    >
                                        <div className="flex items-center gap-x-3 whitespace-nowrap">
                                            <div className="h-20 w-16 overflow-hidden">
                                                <Image
                                                    src={item.images[0]}
                                                    height={90}
                                                    width={75}
                                                    alt="no image"
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h5 className="text-wrap text-sm font-medium capitalize sm:text-base md:text-xl">
                                                    {item.title}
                                                </h5>
                                                <p className="ms:text-sm text-xs capitalize first-letter:lowercase md:text-base">
                                                    by {item.artist}
                                                </p>
                                            </div>
                                        </div>
                                    </th>
                                    <td className="py-4 px-3 md:px-5">
                                        {`${item.height}H - ${item.width}W `}
                                        {item.depth && (
                                            <span>
                                                {`- ${item.depth}
                                                D `}
                                            </span>
                                        )}
                                        cm
                                    </td>
                                    <td className="py-4 px-3 capitalize md:px-5">
                                        {item.mediums.join(', ')}
                                    </td>
                                    <td className="py-4 px-3 capitalize md:px-5">
                                        {item.surfaces.join(', ')}
                                    </td>
                                    <td className="py-4 px-3 md:px-5">
                                        {new Date(
                                            item.submittedAt.seconds * 1000
                                        ).toDateString()}
                                    </td>
                                    <td className="py-4 px-3 md:px-5">
                                        <span
                                            className={`${
                                                item.status === 'accepted' &&
                                                'bg-green-100 text-green-500'
                                            } rounded-full px-5 py-2.5 text-sm capitalize
                                    ${
                                        item.status === 'pending' &&
                                        'bg-orange-100 text-orange-500'
                                    }
                                    ${
                                        item.status === 'rejected' &&
                                        'bg-red-100 text-red-500'
                                    }
                                    `}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-3 md:px-5">
                                        <div className="inline-flex gap-x-4 ">
                                            <Tooltip
                                                content="View Details"
                                                color="invert"
                                            >
                                                <Link
                                                    href={`/seller/artworks/submissions/${item.id}`}
                                                >
                                                    <Edit
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        stroke="#374151"
                                                    />
                                                </Link>
                                            </Tooltip>
                                            <Tooltip
                                                content="Delete Artwork"
                                                color="error"
                                            >
                                                <DeleteArtwork
                                                    collection="submittedArtworks"
                                                    id={item.id}
                                                />
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <TableFooter
                    range={range}
                    slice={slice}
                    setPage={setPage}
                    page={page}
                />
            </div>
        </>
    );
}

export default Table;
