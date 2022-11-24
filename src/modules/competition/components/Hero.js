import Pattern from '@/icons/Pattern';

export default function Hero({}) {
    return (
        <section className="relative mx-2 h-56 rounded-lg bg-slate-50 md:mx-5 md:h-96">
            <div className="absolute left-0 md:left-2">
                <Pattern className="h-28 w-28 md:h-96 md:w-80" />
            </div>
            <div className="absolute right-0 bottom-0 md:right-2">
                <Pattern className="h-28 w-28 rotate-180 md:h-96 md:w-80" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
                <h6 className="mb-0 text-xs font-medium uppercase sm:text-sm md:mb-1 md:text-base">
                    best art is served alive
                </h6>
                <h2 className="font-garamond text-xl font-semibold sm:text-2xl md:text-5xl">
                    More than just a competition
                </h2>
                <p className="mx-auto mt-2 w-72 text-sm sm:text-base md:mt-4 md:w-96 md:text-lg">
                    Our art competitions are an opportunity for emerging artists
                    to show-off their work and win prizes.
                </p>
            </div>
        </section>
    );
}
