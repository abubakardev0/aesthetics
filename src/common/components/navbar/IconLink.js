import { useRouter } from 'next/router';
import Link from 'next/link';

const IconLink = ({ icon, refrence, text }) => {
    const router = useRouter();
    return (
        <li>
            <Link href={refrence}>
                <a
                    className={`${
                        router.pathname == refrence
                            ? 'bg-white text-[#2D2D2D] md:bg-[#2D2D2D] md:text-white'
                            : ' bg-none text-white md:text-[#2D2D2D]'
                    } flex h-10 w-10 items-center justify-center rounded-full md:h-12 md:w-12 `}
                >
                    {icon}
                </a>
            </Link>
            {router.pathname == refrence && (
                <span className="mt-1 hidden text-center text-xs md:block">
                    {text}
                </span>
            )}
        </li>
    );
};

export default IconLink;
