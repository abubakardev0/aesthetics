import SellerLayout from '../../../layouts/SellerLayout';
import { Table, useAsyncList, useCollator } from '@nextui-org/react';
import {
    collection,
    query,
    startAfter,
    // orderBy,
    limit,
    getDocs,
} from 'firebase/firestore';
import { db } from '../../../common/utils/firebase/firebase-config';

function Orders() {
    const collator = useCollator({ numeric: true });

    const columns = [
        { name: 'ID', uid: 'id' },
        { name: 'Name', uid: 'name' },
        { name: 'E-mail', uid: 'email' },
        { name: 'Total', uid: 'total' },
        { name: 'Status', uid: 'status' },
        { name: 'Created at', uid: 'date' },
    ];
    async function load({ signal, cursor }) {
        const querySnapshot = await getDocs(
            cursor
                ? query(collection(db, 'orders'), startAfter(cursor), limit(10))
                : query(collection(db, 'orders'), limit(10)),
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
        <section className="py-4 px-3">
            <h3 className="my-2 text-center text-2xl font-medium">
                All Orders
            </h3>
            <Table
                bordered
                aria-label="Orders data table"
                css={{
                    minWidth: '100%',
                    height: 'calc($space$14 * 12)',
                    backgroundColor: 'white',
                    overflowX: 'scroll',
                    zIndex: 0,
                    whiteSpace: 'nowrap',
                }}
                selectionMode="none"
                sortDescriptor={list.sortDescriptor}
                onSortChange={list.sort}
            >
                <Table.Header columns={columns}>
                    {(column) => (
                        <Table.Column
                            key={column.uid}
                            allowsSorting
                            className="w-44"
                        >
                            {column.name}
                        </Table.Column>
                    )}
                </Table.Header>
                <Table.Body
                    items={list.items}
                    loadingState={list.loadingState}
                    onLoadMore={list.loadMore}
                >
                    {(item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.id}</Table.Cell>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.email}</Table.Cell>
                            <Table.Cell>{item.total}</Table.Cell>
                            <Table.Cell>{item.status}</Table.Cell>
                            <Table.Cell>2020</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </section>
    );
}

export default Orders;

Orders.Layout = SellerLayout;
