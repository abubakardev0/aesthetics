import Link from 'next/link';

import { db, auth } from '@/firebase/firebase-config';
import {
    collection,
    query,
    startAfter,
    limit,
    getDocs,
    where,
} from 'firebase/firestore';

import { Table, useAsyncList, useCollator, Tooltip } from '@nextui-org/react';

import SellerLayout from '@/layouts/SellerLayout';
import Edit from '@/icons/Edit';
import { formatCurrency } from '@/commoncomponents/functions';
function Orders() {
    const collator = useCollator({ numeric: true });
    async function load() {
        const list = [];
        const docRef = await getDocs(
            query(
                collection(db, 'orders'),
                where('sellers', 'array-contains', `${auth.currentUser.uid}`)
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
                    your Orders
                </h3>
                {list.items.length > 0 ? (
                    <Table
                        bordered
                        aria-label="orders table"
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
                        <Table.Header>
                            <Table.Column
                                key="title"
                                css={{
                                    width: '200px',
                                }}
                                allowsSorting
                            >
                                ORDER ID
                            </Table.Column>
                            <Table.Column
                                key="customer"
                                width="200px"
                                allowsSorting
                            >
                                CUSTOMER NAME
                            </Table.Column>
                            <Table.Column
                                key="price"
                                width="150px"
                                allowsSorting
                            >
                                TOTAL AMOUNT
                            </Table.Column>
                            <Table.Column
                                key="status"
                                width="150px"
                                allowsSorting
                            >
                                STATUS
                            </Table.Column>
                            <Table.Column
                                key="date"
                                width="200px"
                                allowsSorting
                            >
                                PLACED AT
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
                                            width: '200px',
                                        }}
                                    >
                                        <Link
                                            href={`/seller/orders/${item.id}`}
                                        >
                                            {item.id}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell
                                        css={{
                                            width: '200px',
                                        }}
                                    >
                                        <span className="capitalize">
                                            {item.shippingDetails.name}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell
                                        css={{
                                            width: '150px',
                                        }}
                                    >
                                        {formatCurrency(item.totalAmount)}
                                    </Table.Cell>
                                    <Table.Cell
                                        css={{
                                            width: '150px',
                                        }}
                                    >
                                        <span
                                            className={`${
                                                item.status === 'delivered' &&
                                                'bg-green-100 text-green-500'
                                            } rounded-full px-4 py-1 text-sm capitalize
                                    ${
                                        item.status === 'in transit' &&
                                        'bg-yellow-100 text-yellow-500'
                                    }
                                    ${
                                        item.status === 'processing' &&
                                        'bg-orange-100 text-orange-500'
                                    }
                                    ${
                                        item.status === 'cancelled' &&
                                        'bg-red-100 text-red-500'
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
                                            item.placedAt.seconds * 1000
                                        ).toUTCString()}
                                    </Table.Cell>
                                    <Table.Cell
                                        css={{
                                            width: '80px',
                                        }}
                                    >
                                        <Tooltip
                                            content="View Details"
                                            color="invert"
                                        >
                                            <Link
                                                href={`/seller/orders/${item.id}`}
                                            >
                                                <Edit
                                                    className="h-5 w-5 cursor-pointer"
                                                    fill="none"
                                                    stroke="#464646"
                                                />
                                            </Link>
                                        </Tooltip>
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
                    <p className="text-center">No Orders Found</p>
                )}
            </section>
        </>
    );
}

export default Orders;

Orders.title = 'Orders';
Orders.Layout = SellerLayout;
