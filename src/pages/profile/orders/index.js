import Link from 'next/link';
import Head from 'next/head';

import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import useSWR from 'swr';
import { Tooltip } from '@nextui-org/react';

import SettingsLayout from '@/layouts/SettingsLayout';
import Edit from '@/icons/Edit';
import Error from '@/commoncomponents/Error';

function Orders() {
    const { data: orders, error } = useSWR('myOrders', async () => {
        let orders = [];
        const q = query(
            collection(db, 'orders'),
            where('userId', '==', `${auth.currentUser.uid}`),
            orderBy('placedAt')
        );
        const docSnap = await getDocs(q);
        docSnap.forEach((doc) => {
            if (doc.exists) {
                orders.push({ id: doc.id, ...doc.data() });
            }
        });
        return orders;
    });

    if (error) {
        return <Error />;
    }
    return (
        <>
            <Head>
                <title>Your Bids</title>
            </Head>
            <div className="grid h-screen place-content-center">
                <h3 className="my-5 text-center text-xl font-medium md:text-2xl">
                    Your Orders
                </h3>
                <ul className="h-[500px] w-full overflow-auto">
                    {orders
                        ? orders.map((data) => {
                              return (
                                  <li
                                      key={data.id}
                                      className="relative w-full cursor-pointer space-y-3 rounded-lg border px-2 py-3 hover:bg-gray-50 md:w-[500px] md:px-4"
                                  >
                                      <Link href={`/profile/orders/${data.id}`}>
                                          <a className="absolute top-4 right-3">
                                              <Tooltip
                                                  content="View Details"
                                                  color="invert"
                                              >
                                                  <Edit
                                                      className="h-5 w-5 cursor-pointer"
                                                      fill="none"
                                                      stroke="#979797"
                                                  />
                                              </Tooltip>
                                          </a>
                                      </Link>
                                      <h4 className="text-lg font-semibold leading-7 text-gray-800">
                                          Order Id #{data.id}
                                      </h4>
                                      <div className="flex w-full">
                                          <div className="w-1/2">
                                              <h6 className="font-medium">
                                                  Items
                                              </h6>
                                              {data.items.map((item) => {
                                                  return (
                                                      <p className="text-base capitalize leading-6 text-gray-600">
                                                          {item.title}
                                                      </p>
                                                  );
                                              })}
                                          </div>
                                          <div className="w-1/2 border-l-2 pl-3">
                                              <h6 className="font-medium">
                                                  Placed At
                                              </h6>
                                              <p className="text-sm leading-6 text-gray-600">
                                                  {new Date(
                                                      data.placedAt.seconds *
                                                          1000
                                                  ).toUTCString()}
                                              </p>
                                          </div>
                                      </div>
                                  </li>
                              );
                          })
                        : 'No Orders yet'}
                </ul>
            </div>
        </>
    );
}

export default Orders;

Orders.Layout = SettingsLayout;
