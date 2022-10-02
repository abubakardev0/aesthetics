import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import {
    collection,
    query,
    where,
    startAfter,
    limit,
    getDocs,
} from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import { Table, useAsyncList, useCollator, Tooltip } from '@nextui-org/react';

import SellerLayout from '@/layouts/SellerLayout';
import Edit from '@/icons/Edit';
import { formatCurrency } from '@/commoncomponents/functions';
import DeleteAccount from '@/seller/components/artwork/Delete';

function Artworks() {
    const collator = useCollator({ numeric: true });
    const columns = [
        { name: 'TITLE', uid: 'title' },
        { name: 'ARTIST', uid: 'artist' },
        { name: 'STATUS', uid: 'status' },
        { name: 'PRICE', uid: 'price' },
        { name: 'UPLOADED AT', uid: 'date' },
        { name: 'ACTIONS', uid: 'actions' },
    ];
    async function load({ signal, cursor }) {
        const querySnapshot = await getDocs(
            cursor
                ? query(
                      collection(db, 'artworks'),
                      where('sellerId', '==', auth.currentUser.uid),
                      startAfter(cursor),
                      limit(10)
                  )
                : query(
                      collection(db, 'artworks'),
                      where('sellerId', '==', auth.currentUser.uid),
                      limit(10)
                  ),
            { signal }
        );
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        let lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        return {
            items: data,
            cursor: lastVisible,
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
            <Head>
                <title>Your Artworks</title>
            </Head>
            <section className="py-4 px-3">
                <h3 className="my-2 text-center text-2xl font-medium">
                    Your Artworks
                </h3>
                <Table
                    bordered
                    aria-label="Artworks table"
                    css={{
                        minWidth: '100%',
                        height: 'calc($space$14 * 12)',
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
                            css={{
                                width: '280px',
                            }}
                            allowsSorting
                        >
                            TITLE
                        </Table.Column>
                        <Table.Column key="artist" width="180px" allowsSorting>
                            ARTIST
                        </Table.Column>
                        <Table.Column key="price" width="150px" allowsSorting>
                            PRICE
                        </Table.Column>
                        <Table.Column key="type" width="100px" allowsSorting>
                            TYPE
                        </Table.Column>
                        <Table.Column key="status" width="100px" allowsSorting>
                            STATUS
                        </Table.Column>
                        <Table.Column key="date" width="200px" allowsSorting>
                            UPLOADED AT
                        </Table.Column>
                        <Table.Column key="actions" width="80px">
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
                                        width: '280px',
                                    }}
                                >
                                    <div className="inline-flex w-full items-center space-x-2">
                                        <div className="h-14 w-14">
                                            <Image
                                                src={item.images[0]}
                                                height={50}
                                                width={50}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="w-full overflow-hidden ">
                                            <h5 className="capitalize">
                                                {item.title}
                                            </h5>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell
                                    css={{
                                        width: '180px',
                                    }}
                                >
                                    <span className="capitalize">
                                        {item.artist}
                                    </span>
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
                                    <p className="capitalize">{item.type}</p>
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
                                        width: '200px',
                                    }}
                                >
                                    {new Date(
                                        item.uploadedAt.seconds * 1000
                                    ).toUTCString()}
                                </Table.Cell>
                                <Table.Cell
                                    css={{
                                        width: '80px',
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
                                                    stroke="#979797"
                                                />
                                            </Link>
                                        </Tooltip>
                                        <Tooltip
                                            content="Delete Artwork"
                                            color="error"
                                        >
                                            <DeleteAccount id={item.id} />
                                        </Tooltip>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </section>
        </>
    );
}

export default Artworks;

Artworks.Layout = SellerLayout;
