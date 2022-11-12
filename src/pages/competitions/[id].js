import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';

import TransparentLayout from '@/layouts/TransparentLayout';
import PrivateRoute from '@/commoncomponents/routes/Private';
import { Collapse } from '@nextui-org/react';
import Submission from '@/competition/components/Submission';
import Error from '@/commoncomponents/Error';
import { formatCurrency } from '@/commoncomponents/functions';

function Competition({ competition, hasError }) {
    if (hasError) return <Error />;
    const data = JSON.parse(competition);
    return (
        <PrivateRoute>
            <Head>
                <title>{data.title.toUpperCase()}</title>
            </Head>
            <section className="relative h-screen w-screen">
                <Image
                    src={data.image}
                    layout="fill"
                    className="animate-hero object-cover"
                    priority
                />
                <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-black/25 to-black/10 backdrop-blur-[0.8px]" />
                <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black via-black/20 to-black/30 backdrop-blur-[0.8px]" />
                <div className="absolute bottom-20 left-4 space-y-3 md:bottom-28 md:left-12 md:space-y-6">
                    <div>
                        <h6 className="text-xs uppercase text-white md:text-lg">
                            Enter for a chance to win
                        </h6>
                        <h3 className="text-3xl capitalize tracking-wide text-white md:text-6xl">
                            {data.title}
                        </h3>
                    </div>
                    <p className="text-lg capitalize text-white md:text-2xl">
                        {data.subtitle}
                    </p>
                    <div className="inline-flex items-center gap-x-3">
                        <Submission id={data.id} title={data.title} />
                        <Link href="#details">
                            <a className="rounded-full border-[2px] border-white bg-none px-5 py-2.5 font-medium text-white transition-colors duration-300 hover:bg-white/20 active:bg-white/25">
                                View Details
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="absolute right-1 top-20 w-fit transform space-y-2 divide-y divide-gray-300 border-2 border-white p-3 text-right text-white md:right-16 md:top-1/2 md:w-64 md:-translate-y-1/2 md:space-y-4 md:p-5">
                    <div>
                        <h2 className="text-xl font-semibold capitalize md:text-3xl">
                            {data.themeTitle}
                        </h2>
                        <p className="text-sm uppercase tracking-wide text-gray-300 md:text-lg">
                            Theme
                        </p>
                    </div>
                    <div>
                        <h2 className="pt-5 text-xl font-semibold md:text-3xl">
                            {formatCurrency(data.prize)}
                        </h2>
                        <p className="text-sm uppercase tracking-wide text-gray-300 md:text-lg">
                            In Prizes
                        </p>
                    </div>
                    <div>
                        <h2 className="pt-5 text-xl font-semibold md:text-3xl">
                            {new Date(
                                data.deadline.seconds * 1000
                            ).toDateString()}
                        </h2>
                        <p className="text-sm uppercase tracking-wide text-gray-300 md:text-lg">
                            Deadline
                        </p>
                    </div>
                </div>
            </section>
            <section>
                <div className="h-fit bg-black py-12 md:h-48 md:pt-20">
                    <ol className="mx-auto flex h-full w-fit list-inside list-[decimal-leading-zero] flex-col border-2 border-white px-3 text-center leading-8 text-white marker:text-sm marker:text-gray-200 md:h-16 md:w-3/4 md:flex-row md:px-0">
                        <li className="h-full grow pt-4 text-base md:text-xl">
                            Create a masterpiece
                        </li>
                        <li className="h-full grow border-t-2 border-l-0 border-white py-2 pt-4 text-base md:border-t-0 md:border-l-2 md:text-xl">
                            Submit your masterpiece
                        </li>
                        <li className="h-full grow border-t-2 border-l-0 border-white py-2 pt-4 text-base md:border-t-0 md:border-l-2 md:text-xl">
                            Win Big
                        </li>
                    </ol>
                </div>
                <div
                    id="details"
                    className="mx-auto w-full space-y-4 px-3 py-20 md:w-3/5 md:px-0 lg:w-1/2"
                >
                    <Collapse title="Theme" expanded bordered>
                        <p>{data.theme}</p>
                    </Collapse>
                    <Collapse title="Submission" bordered>
                        <h4 className="font-medium">
                            To submit your entry you will need to prepare:
                        </h4>
                        <ul className="list-inside list-disc leading-[4px]">
                            <li>
                                One high resolution image of your final artwork
                                Image type: JPG, JPEG, Webp, PNG size: 10MB max
                            </li>
                        </ul>
                    </Collapse>
                </div>
            </section>
        </PrivateRoute>
    );
}

export default Competition;

Competition.Layout = TransparentLayout;

export async function getServerSideProps({
    params = { id: id.id.toString() },
}) {
    const id = params.id;
    const data = await getDoc(doc(db, 'competitions', id));
    if (!data) {
        return {
            props: {
                hasError: true,
            },
        };
    }
    return {
        props: {
            competition: JSON.stringify({ id: data.id, ...data.data() }),
        },
    };
}
