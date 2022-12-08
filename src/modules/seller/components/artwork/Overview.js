import { useRef, useState } from 'react';

import { db } from '@/firebase/firebase-config';
import { doc, updateDoc } from 'firebase/firestore';

import ReList from '@/seller/components/artwork/relist';
import Alert from '@/commoncomponents/popups/Alert';
import Slider from '@/commoncomponents/Scrollers/Slider';
import { formatCurrency } from '@/commoncomponents/functions';

function Overview({ data }) {
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    });
    const descriptionRef = useRef(null);
    const statusRef = useRef(null);
    const updateStatus = async () => {
        const status = statusRef.current?.value;
        if (!status) {
            return;
        }

        try {
            await updateDoc(doc(db, 'artworks', `${data.id}`), {
                status: status,
            });
            setAlert({
                type: 'success',
                message: 'The status has been updated.',
            });
        } catch (err) {
            setAlert({
                type: 'error',
                message: 'Unable to update the status',
            });
        } finally {
            setShow(true);
        }
    };

    const updateDescription = async () => {
        const description = descriptionRef.current?.value;
        if (!description) {
            return;
        }
        try {
            await updateDoc(doc(db, 'artworks', `${data.id}`), {
                description: description,
            });
            setAlert({
                type: 'success',
                message: 'The description has been updated.',
            });
        } catch (err) {
            setAlert({
                type: 'error',
                message: 'Unable to update the description',
            });
        } finally {
            setShow(true);
        }
    };

    return (
        <div className="relative flex h-[80vh] w-full lg:pr-10">
            <div className="absolute -top-8 right-0 space-x-2">
                <select
                    id="status"
                    name="status"
                    className="rounded-md border border-gray-100 bg-gray-200 px-3 py-2 text-sm font-medium text-gray-600 2xl:text-base"
                    defaultValue={data.status}
                    ref={statusRef}
                >
                    <option value="listed">Listed</option>
                    <option value="archived">Archived</option>
                    <option value="sold">Sold</option>
                </select>
                <button
                    onClick={updateStatus}
                    className="rounded-md bg-neutral-800 px-4 py-2 text-sm text-white hover:bg-neutral-700 active:bg-neutral-900 2xl:text-base"
                >
                    Change Status
                </button>
                {data.type === 'auction' && data.status === 'archived' ? (
                    <ReList itemData={data} />
                ) : null}
            </div>
            <div className="h-full w-full space-y-5 lg:w-4/12 2xl:space-y-8">
                <div>
                    <label className="font-medium 2xl:text-lg">Title</label>
                    <p className="mt-1 rounded-md border-2 px-2 py-1 capitalize">
                        {data.title}
                    </p>
                </div>
                <div>
                    <label className="font-medium 2xl:text-lg">Artist</label>
                    <p className="mt-1 rounded-md border-2 px-2 py-1 capitalize">
                        {data.artist}
                    </p>
                </div>
                <div className="relative">
                    <label className="font-medium 2xl:text-lg">
                        {data.type === 'immediate' ? 'Price' : 'Current Bid'}
                    </label>
                    <p className="mt-1 rounded-md border-2 px-2 py-1 capitalize">
                        {data.type === 'immediate'
                            ? formatCurrency(data.price)
                            : formatCurrency(data.currentBid)}
                    </p>
                </div>

                <div className="flex space-x-6">
                    <label className="font-medium 2xl:text-lg">
                        Height
                        <p className="mt-1 rounded-md border-2 px-2 py-1">
                            {data.dimensions.height}
                        </p>
                    </label>
                    <label className="font-medium 2xl:text-lg">
                        Width
                        <p className="mt-1 rounded-md border-2 px-2 py-1">
                            {data.dimensions.width}
                        </p>
                    </label>
                    {data.dimensions.depth && (
                        <label className="font-medium 2xl:text-lg">
                            Depth
                            <p className="mt-1 rounded-md border-2 px-2 py-1">
                                {data.dimensions.depth}
                            </p>
                        </label>
                    )}
                    <label className="font-medium 2xl:text-lg">
                        Unit
                        <p className="mt-1 rounded-md border-2 px-2 py-1">
                            {data.dimensions.unit}
                        </p>
                    </label>
                </div>
                <div className="relative w-full md:w-[500px] lg:w-[700px] ">
                    <button
                        onClick={updateDescription}
                        className="absolute right-1 -top-3 h-8 w-16 rounded-md bg-neutral-800 text-sm text-white hover:bg-neutral-700 active:bg-neutral-900 2xl:-top-4 2xl:h-10 2xl:w-20 2xl:text-base"
                    >
                        Save
                    </button>
                    <label className="font-medium 2xl:text-lg">
                        Description
                    </label>
                    <textarea
                        ref={descriptionRef}
                        rows="5"
                        className="section-scrollbar mt-1 w-full resize-none rounded-md border-2 p-4"
                    >
                        {data.description ? data.description : 'No Description'}
                    </textarea>
                </div>
            </div>
            <div className="w-4/12 space-y-4 lg:px-10">
                <label className="block font-medium 2xl:text-lg">
                    Selling Type
                    <p className="mt-1 w-fit rounded-full border-2 border-gray-300 bg-gray-100 px-4 py-1 capitalize text-gray-600">
                        {data.type}
                    </p>
                </label>
                <label className="block font-medium 2xl:text-lg">
                    Category
                    <p className="mt-1 w-fit rounded-full border-2 border-gray-300 bg-gray-100 px-4 py-1 capitalize text-gray-600">
                        {data.category}
                    </p>
                </label>
                <label className="block font-medium 2xl:text-lg">
                    Surfaces
                    <ul className="mt-1 flex flex-wrap gap-4 font-normal">
                        {data.surfaces.map((surface) => (
                            <li className="rounded-full border-2 border-blue-200 bg-blue-500 px-4 py-1 capitalize text-white">
                                {surface}
                            </li>
                        ))}
                    </ul>
                </label>

                <label className="block font-medium 2xl:text-lg">
                    Mediums
                    <ul className="mt-1 flex flex-wrap gap-4 font-normal">
                        {data.mediums.map((medium) => (
                            <li className="rounded-full border-2 border-blue-200 bg-blue-500 px-4 py-1 capitalize text-white">
                                {medium}
                            </li>
                        ))}
                    </ul>
                </label>
            </div>
            <div className="mt-4 w-4/12 2xl:mt-6">
                <Slider images={data.images} />
            </div>
            <Alert
                show={show}
                setShow={setShow}
                type={alert.type}
                message={alert.message}
            />
        </div>
    );
}

export default Overview;
