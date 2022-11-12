import { getDocs, query, orderBy, collection } from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';

import { Table } from '@nextui-org/react';

import useSWR from 'swr';
import { formatCurrency } from '@/commoncomponents/functions';
import Error from '@/commoncomponents/Error';

function ViewBids({ id, totalBids, startingBid, currentBid, estimate }) {
    const { data: bids, error } = useSWR('bids', async () => {
        const list = [];
        const ref = await getDocs(
            query(
                collection(db, 'artworks', id, 'bids'),
                orderBy('time', 'desc')
            )
        );
        ref.forEach((document) => {
            list.push({ id: document.id, ...document.data() });
        });
        return list;
    });
    if (error) {
        return <Error />;
    }
    const columns = [
        {
            key: 'username',
            label: 'NAME',
        },
        {
            key: 'userEmail',
            label: 'EMAIL',
        },
        {
            key: 'bidAmount',
            label: 'BID AMOUNT',
        },
        {
            key: 'time',
            label: 'PLACED AT',
        },
    ];
    return (
        <div className="flex h-[70vh] space-x-5">
            <div className="flex flex-col gap-y-6 lg:w-4/12">
                <label className="font-medium">
                    Total Bids
                    <p className="mt-1 w-fit text-gray-600">{totalBids}</p>
                </label>
                <label className="font-medium">
                    Starting Bid
                    <p className="mt-1 w-fit text-gray-600">
                        {formatCurrency(startingBid)}
                    </p>
                </label>
                <label className="font-medium">
                    Estimate
                    <p className="mt-1 w-fit text-gray-600">
                        {formatCurrency(estimate)}
                    </p>
                </label>
                <label className="font-medium">
                    CurrentBid
                    <p className="mt-1 w-fit text-gray-600">
                        {formatCurrency(currentBid)}
                    </p>
                </label>
            </div>

            <div className="lg:w-8/12">
                {bids ? (
                    <Table
                        bordered
                        aria-label="bids table"
                        css={{
                            minWidth: '100%',
                            height: '100%',
                            maxHeight: '800px',
                            overflowX: 'scroll',
                            backgroundColor: 'white',
                            zIndex: 0,
                        }}
                        selectionMode="none"
                    >
                        <Table.Header columns={columns}>
                            {(column) => (
                                <Table.Column key={column.key}>
                                    {column.label}
                                </Table.Column>
                            )}
                        </Table.Header>
                        <Table.Body items={bids}>
                            {(item) => (
                                <Table.Row
                                    key={item.id}
                                    css={{
                                        borderBottom: '1px solid #f1f5f9',
                                    }}
                                >
                                    <Table.Cell>
                                        <p>{item.name}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p>{item.email}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p>{formatCurrency(item.value)}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {new Date(
                                            item.time.seconds * 1000
                                        ).toDateString()}
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                ) : (
                    <p className="text-center">No Bids</p>
                )}
            </div>
        </div>
    );
}

export default ViewBids;
