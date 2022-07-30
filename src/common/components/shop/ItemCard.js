import useBagStore from '../../store/bagStore';
import Image from 'next/image';
import Plus from '../../utils/icons/Plus';

const ItemCard = (props) => {
    const removeItem = useBagStore((state) => state.removeItem);
    return (
        <div className="flex w-full items-center justify-between border-b-2 border-slate-200 p-3 md:mx-4">
            <div className="flex gap-4">
                <Image
                    src={props.image}
                    height={80}
                    width={120}
                    objectFit="cover"
                    priority
                />
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="font-cata text-lg font-medium leading-loose md:text-2xl">
                            {props.title}
                        </h1>
                        <p className="font-cata text-xs font-medium md:text-base">
                            by {props.artist}
                        </p>
                    </div>
                    <div className="font-cata text-xs md:text-sm">
                        <h2 className="font-medium">Dimesions:</h2>
                        <p>9/2 x 889 x 889 in</p>
                        <p>243 x 243 cm</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end gap-4">
                <button
                    onClick={() => {
                        removeItem(props.id);
                    }}
                >
                    <Plus className="h-6 w-6 rotate-45" />
                </button>
                <p className="font-cata text-sm md:text-lg">
                    PKR. <span>{props.price}</span>
                </p>
            </div>
        </div>
    );
};

export default ItemCard;
