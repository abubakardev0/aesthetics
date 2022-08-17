import Link from 'next/link';
import Image from 'next/image';

import ARView from '@/icons/ARView';

function ImagesDisplay({ images }) {
    return (
        <>
            <div className="flex w-full flex-col-reverse justify-around md:flex-row md:space-x-3 md:px-10 md:py-5">
                <div
                    className={`${
                        images.length > 1
                            ? 'flex flex-row justify-center gap-3 md:flex-col md:justify-start md:gap-2'
                            : 'hidden'
                    }`}
                >
                    {images.map((image, index) => (
                        <div
                            className="h-16 w-16 sm:h-20 sm:w-20 md:h-20 md:w-20 lg:h-28 lg:w-24"
                            key={index}
                        >
                            <Image
                                src={image}
                                width={100}
                                height={100}
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex-col justify-center md:h-4/6">
                    <div className="h-full w-full drop-shadow-md">
                        <Image
                            src={images[0]}
                            width={650}
                            height={600}
                            priority
                            className="object-cover"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <Link href="/">
                            <a>
                                <ARView className="h-10 w-10 md:h-16 md:w-16" />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ImagesDisplay;
