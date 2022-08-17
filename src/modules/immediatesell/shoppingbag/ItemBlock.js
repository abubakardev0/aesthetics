import Image from 'next/image';
import image from '../../..//common/components/home/image6.jpg';
import Delete from '../../../common/utils/icons/Delete';
import Bookmark from '../../../common/utils/icons/Bookmark';

const ItemBlock = (props) => {
    return (
        <div className="inline-flex w-full border-b-2 border-slate-200 p-3">
            <Image src={image} height={120} width={100} objectFit="cover" />
            <div className="ml-3 flex w-full justify-between">
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-lg font-medium md:text-2xl">
                            Abstraxtion
                        </h1>
                        <p className="text-xs font-medium md:text-base">
                            by Abu Bakar
                        </p>
                    </div>
                    <div className="text-xs md:text-sm">
                        <span>9/2 x 889 x 889 in</span>
                    </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                    <span className="text-base font-medium md:text-lg">
                        <small>PKR.</small> 15,889
                    </span>
                    <div className="space-x-2 self-end md:space-x-3">
                        <button>
                            <Bookmark className=" h-5 w-5 md:h-6 md:w-6" />
                        </button>
                        <button>
                            <Delete
                                className="stroke-red h-5 w-5 md:h-6 md:w-6"
                                fill="none"
                                stroke="red"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemBlock;
