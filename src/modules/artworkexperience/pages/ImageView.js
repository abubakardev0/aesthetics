import Link from 'next/link';

import ARView from '@/icons/ARView';
import Slider from '@/commoncomponents/Scrollers/Slider';

export default function ImageView({ images }) {
    return (
        <div className="grid h-[450px] w-full place-content-center pb-2 md:h-full md:w-1/2">
            <Slider images={images} />
            <Link
                href={{
                    pathname: 'https://model-viewer-ar-xwsb.vercel.app',
                    query: {
                        id: images[0],
                    },
                }}
            >
                <button className="flex justify-center py-3">
                    <ARView className="h-12 w-12 md:h-16 md:w-16" />
                </button>
            </Link>
        </div>
    );
}
