import Link from 'next/link';

import Card from '@/competition/components/Card';

export default function CompetitionsList({ list, title, subtitle }) {
    return (
        <>
            <div className="mb-10 text-center">
                <p className="text-sm font-medium uppercase md:text-base">
                    {subtitle}
                </p>
                <h2 className="mt-1 mb-6 font-garamond text-2xl font-semibold capitalize md:text-4xl">
                    {title}
                </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                {list.map((each) => (
                    <Link href={`/competitions/${each.id}`} key={each.id}>
                        <a>
                            <Card image={each.image} title={each.title} />
                        </a>
                    </Link>
                ))}
            </div>
        </>
    );
}
