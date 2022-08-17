import IconLink from '@/commoncomponents/navbar/IconLink';
import Artwork from '@/icons/Artwork';
import Competition from '@/icons/Competition';
import Plus from '@/icons/Plus';
import Group from '@/icons/Group';
import Auction from '@/icons/Auction';

const Tabbar = () => {
    return (
        <ul className="fixed bottom-1 left-0 z-50 flex h-fit w-full items-center justify-around rounded-full bg-black px-2 pt-2 shadow-lg md:hidden">
            <IconLink
                icon={
                    <Artwork className="h-6 w-6 fill-current" stroke="none" />
                }
                refrence="/artworks"
                text={'Artworks'}
            />
            <IconLink
                icon={
                    <Group
                        className="h-6 w-6 stroke-current"
                        strokeWidth={1.5}
                        fill="none"
                    />
                }
                refrence="/artists"
                text={'Artists'}
            />
            <IconLink
                icon={
                    <Plus
                        className="h-6 w-6 stroke-current"
                        strokeWidth={1.5}
                        fill="none"
                    />
                }
                refrence="/sellart"
                text={'Sell Art'}
            />
            <IconLink
                icon={
                    <Auction className="h-6 w-6 fill-current" stroke="none" />
                }
                refrence="/auction"
                text={'Auction'}
            />
            <IconLink
                icon={
                    <Competition
                        className="h-6 w-6 stroke-current"
                        strokeWidth={1.5}
                        fill="none"
                    />
                }
                refrence="/competition"
                text={'Competition'}
            />
        </ul>
    );
};

export default Tabbar;
