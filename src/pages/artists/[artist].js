import image from '../../common/components/home/image6.jpg';
import Card from '../../modules/artworkexperience/Card';
import image2 from '../../common/components/home/image7.jpg';
import image3 from '../../common/components/home/image8.jpg';

import Image from 'next/image';
function Artist() {
    return (
        <>
            <section className="-mt-28 flex h-screen w-full flex-col-reverse md:flex-row">
                <div className="z-10 flex h-2/6 w-full items-center md:h-full md:w-1/2">
                    <div className="px-8">
                        <h1 className="mb-4 text-xl font-medium uppercase md:text-7xl md:font-semibold">
                            Machine of Desire
                        </h1>
                    </div>
                </div>
                <div className="relative h-4/6 w-full bg-slate-300 md:h-full md:w-1/2">
                    <Image
                        src={image}
                        alt="hero"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        priority
                        className="absolute z-0 h-full w-full"
                    />
                </div>
            </section>
            <section className="container mx-auto pt-12">
                <nav className="my-5 h-24">
                    <ul className="flex flex-col justify-center gap-4 md:flex-row">
                        <li className="text-xl font-medium">Bio</li>
                        <li className="text-xl font-medium">Works</li>
                    </ul>
                </nav>

                <div className="flex gap-5">
                    <h1 className="w-2/6 text-left text-2xl font-semibold">
                        Mel Bochner’s intellectual and material analysis of
                        photography, painting and sculpture has produced
                        ground-breaking works that have established his
                        reputation as one of the leading American
                        conceptualists.
                    </h1>
                    <p className="w-4/6 text-justify font-normal">
                        Mel Bochner’s intellectual and material analysis of
                        photography, painting and sculpture has produced
                        ground-breaking works that have established his
                        reputation as one of the leading American
                        conceptualists. Throughout his career, the artist has
                        explored the intersection of linguistic and visual
                        representation. His early works dissected the art object
                        and formed the ‘analytical’ groundwork so crucial in
                        informing the basis for the more ‘synthetic’ works of
                        recent years. The overriding question at the heart of
                        his project has always been the same - How do we receive
                        and interpret different types of information? In the
                        wake of abstract expressionism artists felt there was
                        little to add to painting and this triggered in Bochner
                        a response that was more about thinking than making. He
                        started to find clear ways of looking at art and to
                        question how we experience depth, perspective and space.
                        He went on to explore language and colour in the same
                        way. His thesaurus paintings are an important part of
                        this particular enquiry. With their focus on text and
                        its interpretation, these works re-imagine language as a
                        form of pictorial expression. Word chains intertwine
                        painting and language using colour. Big, bright and
                        witty, they start with one word – ‘Silence’, ‘Amazing’,
                        ‘Crazy’ – and the rest of the painting is made up of
                        synonyms pulled from a thesaurus and listed from top
                        left to bottom right in lines as on a page, the register
                        descending dramatically into slang and expletives. His
                        use of colour sometimes affirms the language it is
                        painting and at other times ignores it, intentionally
                        avoiding colour systems and patterns. These paintings
                        make us think about the acts of reading and looking, and
                        representation and abstraction, and how they cross over.
                        The thesaurus painting is just one of many rationalising
                        systems that Bochner uses to question and explore our
                        irrational trust in language and the world around us.
                    </p>
                </div>
                <div className="w-full">
                    <h3 className="w-full border-b-2 text-lg font-medium uppercase leading-loose tracking-wider text-gray-700">
                        works
                    </h3>
                    <div className="grid-col-1 sm:grid-col-2 md:grid-col-3 col-auto my-6 grid gap-5 lg:grid-cols-4">
                        <Card
                            image={image}
                            artist={'John Doe'}
                            title={'Machine of Desire'}
                            height={353.9}
                            width={352.9}
                            medium={['Pastel']}
                            surface={'Velvet'}
                            unit={'cm'}
                            date={2018}
                            price={58000}
                        />
                        <Card
                            image={image}
                            artist={'John Doe'}
                            title={'Machine of Desire'}
                            height={353.9}
                            width={352.9}
                            medium={['Pastel']}
                            surface={'Velvet'}
                            unit={'cm'}
                            date={2018}
                            price={58000}
                        />
                        <Card
                            image={image2}
                            artist={'John Doe'}
                            title={'Machine of Desire'}
                            height={353.9}
                            width={352.9}
                            medium={['Pastel']}
                            surface={'Velvet'}
                            unit={'cm'}
                            date={2018}
                            price={58000}
                        />
                        <Card
                            image={image3}
                            artist={'John Doe'}
                            title={'Machine of Desire'}
                            height={353.9}
                            width={352.9}
                            medium={['Pastel']}
                            surface={'Velvet'}
                            unit={'cm'}
                            date={2018}
                            price={58000}
                        />
                        <Card
                            image={image2}
                            artist={'John Doe'}
                            title={'Machine of Desire'}
                            height={353.9}
                            width={352.9}
                            medium={['Pastel']}
                            surface={'Velvet'}
                            unit={'cm'}
                            date={2018}
                            price={58000}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Artist;
