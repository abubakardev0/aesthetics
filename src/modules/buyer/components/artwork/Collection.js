import Image from 'next/image';
import Link from 'next/link';

import { myLoader } from '@/commoncomponents/functions';

function Collection({ category }) {
    return (
        <>
            <Link href={`/collections/${category}`}>
                <div className="group relative h-[400px] w-[250px] snap-center overflow-hidden bg-none drop-shadow-md md:h-[500px] md:w-[300px]">
                    <Image
                        src={myLoader(category)}
                        layout="fill"
                        className="absolute object-cover transition-all delay-75 duration-1000 ease-in-out group-hover:-skew-y-3"
                    />
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-gray-500/40 via-black/20 to-gray-500/40 backdrop-blur-[0.8px]">
                        <button className="absolute bottom-10 left-5 rounded-full border-[3px] border-gray-100 px-6 py-[5px] text-lg font-medium capitalize text-gray-200 hover:bg-gray-100 hover:text-gray-800 md:text-xl">
                            {category}
                        </button>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default Collection;
