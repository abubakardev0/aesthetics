import Image from 'next/image';
import Link from 'next/link';

import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import { Table, useAsyncList, useCollator, Tooltip } from '@nextui-org/react';

import SellerLayout from '@/layouts/SellerLayout';
import Edit from '@/icons/Edit';
import { formatCurrency } from '@/commoncomponents/functions';
import DeleteArtwork from '@/seller/components/artwork/Delete';

function Artworks() {
    const collator = useCollator({ numeric: true });
    const columns = [
        { name: 'TITLE', uid: 'title' },
        { name: 'ARTIST', uid: 'artist' },
        { name: 'STATUS', uid: 'status' },
        { name: 'PRICE', uid: 'price' },
        { name: 'UPLOADED AT', uid: 'uploadedAt' },
        { name: 'ACTIONS', uid: 'actions' },
    ];
    async function load() {
        const list = [];
        const docRef = await getDocs(
            query(
                collection(db, 'artworks'),
                where('sellerId', '==', auth.currentUser.uid)
            )
        );
        docRef.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
        });
        return {
            items: list,
        };
    }
    async function sort({ items, sortDescriptor }) {
        return {
            items: items.sort((a, b) => {
                let first = a[sortDescriptor.column];
                let second = b[sortDescriptor.column];
                let cmp = collator.compare(first, second);
                if (sortDescriptor.direction === 'descending') {
                    cmp *= -1;
                }
                return cmp;
            }),
        };
    }
    const list = useAsyncList({ load, sort });

    return (
        <>
            <section className="relative min-h-[80vh] p-5">
                <h3 className="pb-8 text-center text-2xl font-medium uppercase">
                    Your Artworks
                </h3>
                <div className="my-5 flex items-center justify-between">
                    <div className="space-x-4">
                        <span className="rounded-full border border-sky-100 bg-sky-100 px-3 py-2.5 text-xs text-sky-500 sm:px-3 sm:text-sm md:px-5 md:text-base">
                            All Artworks
                        </span>
                    </div>
                    <Link href="/seller/artworks/submissions">
                        <a className="inline-flex items-center gap-x-2 rounded-md bg-neutral-800 py-2.5 px-2 text-xs text-white hover:bg-neutral-700 active:bg-neutral-900 sm:px-3 sm:text-sm md:px-5 md:text-base">
                            Your Submissions
                        </a>
                    </Link>
                </div>
                {list.items.length > 0 ? (
                    <Table
                        bordered
                        aria-label="Artworks table"
                        css={{
                            minWidth: '100%',
                            minHeight: 'fit-content',
                            maxHeight: 'calc($space$14 * 12)',
                            backgroundColor: 'white',
                            overflowX: 'scroll',
                            zIndex: 0,
                        }}
                        selectionMode="none"
                        sortDescriptor={list.sortDescriptor}
                        onSortChange={list.sort}
                    >
                        <Table.Header columns={columns}>
                            <Table.Column
                                key="title"
                                width="300px"
                                allowsSorting
                            >
                                ITEM
                            </Table.Column>
                            <Table.Column key="dimensions" width="180px">
                                DIMENSIONS
                            </Table.Column>
                            <Table.Column
                                key="price"
                                width="150px"
                                allowsSorting
                            >
                                PRICE
                            </Table.Column>
                            <Table.Column
                                key="type"
                                width="100px"
                                allowsSorting
                            >
                                TYPE
                            </Table.Column>
                            <Table.Column
                                key="status"
                                width="100px"
                                allowsSorting
                            >
                                STATUS
                            </Table.Column>
                            <Table.Column
                                key="uploadedAt"
                                width="150px"
                                allowsSorting
                            >
                                UPLOADED AT
                            </Table.Column>
                            <Table.Column key="actions" width="100px">
                                ACTIONS
                            </Table.Column>
                        </Table.Header>
                        <Table.Body
                            items={list.items}
                            loadingState={list.loadingState}
                            onLoadMore={list.loadMore}
                        >
                            {(item) => (
                                <Table.Row
                                    key={item.id}
                                    css={{
                                        borderBottom: '1px solid #f1f5f9',
                                    }}
                                >
                                    <Table.Cell
                                        css={{
                                            width: '300px',
                                        }}
                                    >
                                        <div className="flex items-center gap-x-3 whitespace-nowrap">
                                            <div className="h-16 w-14 overflow-hidden rounded-md">
                                                <Image
                                                    src={item.images[0]}
                                                    height={70}
                                                    width={60}
                                                    alt={item.title}
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
                                    </Table.Cell>
                                    <Table.Cell
                                        css={{
                                            width: '180px',
                                        }}
                                    >
                                        {`${item.dimensions.height}H - ${item.dimensions.width}W `}
                                        {item.dimensions.depth && (
                                            <span>
                                                {`- ${item.dimensions.depth}
                                                D `}
                                            </span>
                                        )}
                                        cm
                                    </Table.Cell>
                                    <Table.Cell
                                        css={{
                                            width: '150px',
                                        }}
                                    >
                                        <p>{formatCurrency(item.price)}</p>
                                    </Table.Cell>
                                    <Table.Cell
                                        css={{
                                            width: '100px',
                                        }}
                                    >
                                        <p className="capitalize">
                                            {item.type}
                                        </p>
                                    </Table.Cell>
                                    <Table.Cell
                                        css={{
                                            width: '100px',
                                        }}
                                    >
                                        <span
                                            className={`${
                                                item.status === 'listed' &&
                                                'bg-green-100 text-green-500'
                                            } rounded-full px-4 py-1 text-sm capitalize
                                             ${
                                                 item.status === 'archived' &&
                                                 'bg-amber-100 text-amber-600'
                                             }
                                    ${
                                        item.status === 'sold' &&
                                        'bg-orange-100 text-orange-500'
                                    }
                                    `}
                                        >
                                            {item.status}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell
                                        css={{
                                            width: '150px',
                                        }}
                                    >
                                        {new Date(
                                            item.uploadedAt.seconds * 1000
                                        ).toDateString()}
                                    </Table.Cell>
                                    <Table.Cell
                                        css={{
                                            width: '100px',
                                        }}
                                    >
                                        <div className="inline-flex gap-x-4">
                                            <Tooltip
                                                content="View Details"
                                                color="invert"
                                            >
                                                <Link
                                                    href={`/seller/artworks/${item.id}`}
                                                >
                                                    <Edit
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        stroke="#464646"
                                                    />
                                                </Link>
                                            </Tooltip>
                                            <Tooltip
                                                content="Delete Artwork"
                                                color="error"
                                            >
                                                <DeleteArtwork
                                                    collectionName="artworks"
                                                    id={item.id}
                                                    type={item.type}
                                                />
                                            </Tooltip>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                        <Table.Pagination
                            shadow
                            rounded
                            align="left"
                            rowsPerPage={10}
                        />
                    </Table>
                ) : (
                    <p className="text-center">No Artworks Found</p>
                )}
            </section>
        </>
    );
}

export default Artworks;

Artworks.title = 'Artworks';
Artworks.Layout = SellerLayout;
