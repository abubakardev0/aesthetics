import Image from 'next/image';
import Link from 'next/link';

import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import useSWR from 'swr';

import { Tooltip, Loading } from '@nextui-org/react';

import SellerLayout from '@/layouts/SellerLayout';
import Plus from '@/icons/Plus';
import DeleteArtwork from '@/seller/components/artwork/Delete';
import Error from '@/commoncomponents/Error';

function Submissions() {
    const { data: list, error } = useSWR('submissions', async () => {
        const list = [];
        const docRef = await getDocs(
            query(
                collection(db, 'submittedArtworks'),
                where('uid', '==', `${auth.currentUser.uid}`),
                orderBy('submittedAt', 'desc')
            )
        );
        docRef.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
        });
        return list;
    });
    if (error) {
        return <Error />;
    }
    if (!list) {
        return (
            <div className="grid h-screen place-content-center">
                <Loading />
            </div>
        );
    }

    return (
        <>
            <section className="relative min-h-[80vh] p-5">
                <h3 className="pb-8 text-center text-2xl font-medium uppercase">
                    Your Submissions
                </h3>
                <div className="my-5 flex items-center justify-between">
                    <div className="space-x-4">
                        <span className="rounded-full border border-sky-100 bg-sky-100 px-5 py-2.5 text-sky-500">
                            All Submissions
                        </span>
                    </div>
                    <Link href="/sellart/submit">
                        <a className="inline-flex items-center gap-x-2 rounded-md bg-neutral-800 py-2.5 px-5 text-base text-white hover:bg-neutral-700 active:bg-neutral-900">
                            <Plus className="h-5 w-5 text-white" />
                            Add New
                        </a>
                    </Link>
                </div>
                <div className="relative overflow-x-auto rounded-md border">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="border-b bg-slate-100 text-xs uppercase text-gray-600">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Item
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Dimensions
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Medium
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Surface
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Submission Date
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Status
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item) => {
                                return (
                                    <tr
                                        className="border-b bg-white"
                                        key={item.id}
                                    >
                                        <th
                                            scope="row"
                                            className="flex items-center gap-x-3 whitespace-nowrap py-4 px-6"
                                        >
                                            <Image
                                                src={item.images[0]}
                                                height={70}
                                                width={60}
                                                alt="no image"
                                                className="object-cover"
                                            />
                                            <div>
                                                <h5 className="text-xl font-medium capitalize">
                                                    {item.title}
                                                </h5>
                                                <p className="capitalize first-letter:lowercase">
                                                    by {item.artist}
                                                </p>
                                            </div>
                                        </th>
                                        <td className="py-4 px-6">
                                            {`${item.height}H - ${
                                                item.width
                                            }W - ${
                                                item.depth ? item.depth : 0
                                            }D cm`}
                                        </td>
                                        <td className="py-4 px-6 capitalize">
                                            {item.mediums.join(', ')}
                                        </td>
                                        <td className="py-4 px-6 capitalize">
                                            {item.surfaces.join(', ')}
                                        </td>
                                        <td className="py-4 px-6">
                                            {new Date(
                                                item.submittedAt.seconds * 1000
                                            ).toDateString()}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span
                                                className={`${
                                                    item.status ===
                                                        'approved' &&
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
                                        <td className="py-4 px-6">
                                            <Tooltip
                                                content="Delete Artwork"
                                                color="error"
                                            >
                                                <DeleteArtwork
                                                    collection="submittedArtworks"
                                                    id={item.id}
                                                />
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {list.length === 0 && (
                        <p className="w-full py-[5%] text-center">
                            No Submissions
                        </p>
                    )}
                </div>
            </section>
        </>
    );
}

export default Submissions;

Submissions.title = 'Submissions';
Submissions.Layout = SellerLayout;
