import Grid from '@/icons/Grid';
import Artwork from '@/icons/Artwork';
import Order from '@/icons/Order';
import Chat from '@/icons/Chat';
import IconLink from '@/commoncomponents/navbar/IconLink';
import Logout from '@/icons/Logout';
import useAuth from '@/hooks/useAuth';
function Sidebar() {
    const { logout } = useAuth();
    return (
        <>
            <ul className="relative flex h-full w-full items-center justify-around rounded-full bg-black pt-3 md:flex-col md:justify-center md:space-y-6 md:rounded-none md:bg-gray-50 md:pt-0">
                <IconLink
                    icon={
                        <Grid
                            className="h-6 w-6 stroke-current md:h-7 md:w-7"
                            strokeWidth={1.5}
                            fill="none"
                        />
                    }
                    refrence="/seller"
                    text={'Dashboard'}
                />
                <IconLink
                    icon={
                        <Artwork className=" h-6 w-6 fill-current md:h-7 md:w-7" />
                    }
                    refrence="/seller/artworks"
                    text={'Artworks'}
                />
                <IconLink
                    icon={
                        <Order
                            className="h-6 w-6 stroke-current md:h-7 md:w-7"
                            strokeWidth={1.5}
                            fill="none"
                        />
                    }
                    refrence="/seller/orders"
                    text={'Orders'}
                />
                <IconLink
                    icon={
                        <Chat
                            className="h-6 w-6 stroke-current md:h-7 md:w-7"
                            strokeWidth={1.5}
                            fill="none"
                        />
                    }
                    refrence="/chat"
                    text={'Chat'}
                />
                <li className="absolute bottom-4 hidden md:block">
                    <button onClick={logout}>
                        <Logout
                            className="h-6 w-6 stroke-current md:h-7 md:w-7"
                            strokeWidth={1.5}
                            fill="none"
                        />
                    </button>
                </li>
            </ul>
        </>
    );
}

export default Sidebar;
