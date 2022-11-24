import Link from 'next/link';

import ARView from '@/icons/ARView';
import Slider from '@/commoncomponents/Scrollers/Slider';

export default function ImageView({ images }) {
    return (
        <div className="my-2 grid h-[450px] w-full place-content-center md:my-0 md:h-full md:w-1/2">
            <Slider images={images} />
            <Link
                href={{
                    pathname: 'https://model-viewer-ar-xwsb.vercel.app',
                    query: {
                        id: images[0],
                    },
                }}
            >
                <a className="place-self-center">
                    <ARView className="h-12 w-12 md:h-16 md:w-16" />
                </a>
            </Link>
        </div>
    );
}
