import { useRef } from 'react';

import { db } from '@/firebase/firebase-config';
import { doc, updateDoc } from 'firebase/firestore';

import Slider from '@/commoncomponents/Scrollers/Slider';
import { formatCurrency } from '@/commoncomponents/functions';

function Overview({ data }) {
    // const priceRef = useRef(null);
    const descriptionRef = useRef(null);
    // const updatePrice = async () => {
    //     const price = priceRef.current?.value;
    //     if (!price) {
    //         return;
    //     }
    //     if (price === data.price) {
    //         return;
    //     }
    //     await updateDoc(doc(db, 'artworks', data.id), {
    //         price: parseInt(price),
    //     });
    // };
    const updateDescription = async () => {
        const description = descriptionRef.current?.value;
        alert(description);
        if (!description) {
            return;
        }
        await updateDoc(doc(db, 'artworks', `${data.id}`), {
            description: description,
        });
    };

    return (
        <div className="flex h-[80vh] w-full lg:pr-10">
            <div className="h-full w-full space-y-5 lg:w-4/12">
                <div>
                    <label className="font-medium">Title</label>
                    <p className="mt-1 rounded-md border px-2 py-1 capitalize">
                        {data.title}
                    </p>
                </div>
                <div>
                    <label className="font-medium">Artist</label>
                    <p className="mt-1 rounded-md border px-2 py-1 capitalize">
                        {data.artist}
                    </p>
                </div>
                <div className="relative">
                    <label className="font-medium">
                        {data.type === 'immediate' ? 'Price' : 'Current Bid'}
                    </label>
                    <p className="mt-1 rounded-md border px-2 py-1 capitalize">
                        {data.type === 'immediate'
                            ? formatCurrency(data.price)
                            : formatCurrency(data.currentBid)}
                    </p>
                </div>

                <div className="flex space-x-6">
                    <label className="font-medium">
                        Height
                        <p className="mt-1 rounded-md border px-2 py-1 capitalize">
                            {data.dimensions.height}
                        </p>
                    </label>
                    <label className="font-medium">
                        Width
                        <p className="mt-1 rounded-md border px-2 py-1 capitalize">
                            {data.dimensions.width}
                        </p>
                    </label>
                    <label className="font-medium">
                        Depth
                        <p className="mt-1 rounded-md border px-2 py-1 capitalize">
                            {data.dimensions.depth
                                ? data.dimensions.depth
                                : '0'}
                        </p>
                    </label>
                    <label className="font-medium">
                        Unit
                        <p className="mt-1 rounded-md border px-2 py-1">
                            {data.dimensions.unit ?? 0}
                        </p>
                    </label>
                </div>
                <div className="relative w-[700px]">
                    <button
                        onClick={updateDescription}
                        className="absolute right-1 top-0 text-sm text-green-500"
                    >
                        Update
                    </button>
                    <label className="font-medium">Description</label>
                    <textarea
                        ref={descriptionRef}
                        resize="none"
                        className="mt-1 w-full rounded-md border p-4 capitalize"
                    >
                        {data.description ? data.description : 'No Description'}
                    </textarea>
                </div>
            </div>
            <div className="w-4/12 space-y-4 lg:px-10">
                <div className="flex justify-between">
                    <label className="font-medium">
                        Status
                        <p
                            className={`${
                                data.status === 'listed' &&
                                'border border-green-300 bg-green-100 text-green-500 '
                            } mt-1 w-fit rounded-full px-6 py-[4px] capitalize
                                    ${
                                        data.status === 'sold' &&
                                        'border border-orange-300 bg-orange-100 text-orange-500 '
                                    }
                                    `}
                        >
                            {data.status}
                        </p>
                    </label>
                    <label className="font-medium">
                        Selling Type
                        <p className="mt-1 w-fit rounded-full border border-gray-300 bg-gray-100 px-6 py-[4px] capitalize text-gray-600">
                            {data.type}
                        </p>
                    </label>
                    <label className="font-medium">
                        Category
                        <p className="mt-1 w-fit rounded-full border border-gray-300 bg-gray-100 px-6 py-[4px] capitalize text-gray-600">
                            {data.category}
                        </p>
                    </label>
                </div>
                <div>
                    <label className="font-medium">Surfaces</label>
                    <ul className="mt-2 flex flex-wrap gap-4">
                        {data.surfaces.map((surface) => (
                            <li className="rounded-full border bg-blue-500 px-6 py-[4px] capitalize text-white">
                                {surface}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <label className="font-medium">Mediums</label>
                    <ul className="mt-2 flex flex-wrap gap-4">
                        {data.mediums.map((medium) => (
                            <li className="rounded-full border bg-blue-500 px-6 py-[4px] capitalize text-white">
                                {medium}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="w-4/12">
                <Slider images={data.images} />
            </div>
        </div>
    );
}

export default Overview;
