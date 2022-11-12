import Pattern from '@/icons/Pattern';

export default function Hero({}) {
    return (
        <section className="relative mx-5 h-96 rounded-lg bg-slate-50">
            <div className="absolute left-2">
                <Pattern className="h-96 w-80" />
            </div>
            <div className="absolute right-2">
                <Pattern className="h-96 w-80 rotate-180" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
                <h6 className="mb-1 font-medium uppercase">
                    best art is served alive
                </h6>
                <h2 className="font-garamond text-5xl font-semibold">
                    More than just a competition
                </h2>
                <p className="mx-auto mt-4 w-96 text-lg">
                    Our art competitions are an opportunity for emerging artists
                    to show-off their work and win prizes.
                </p>
            </div>
        </section>
    );
}
