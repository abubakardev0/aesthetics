import Link from 'next/link';

import Card from '@/competition/components/Card';

export default function CompetitionsList({ list }) {
    return (
        <>
            <div className="mb-10 text-center">
                <p className="text-sm font-medium uppercase md:text-base">
                    Participate to win
                </p>
                <h2 className="mt-1 mb-6 font-garamond text-2xl font-semibold capitalize md:text-4xl">
                    Live Competitions
                </h2>
            </div>
            <div className="flex flex-wrap gap-6">
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
