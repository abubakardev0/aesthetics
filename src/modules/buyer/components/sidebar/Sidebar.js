import { useRef, useState } from 'react';
import { motion, useCycle } from 'framer-motion';
import { MenuToggle } from './MenuToggle';
import MenuItems from './MenuItems';

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: 'circle(30px at 40px 40px)',
        transition: {
            delay: 0.5,
            type: 'spring',
            stiffness: 400,
            damping: 40,
        },
    },
};

const Sidebar = () => {
    const [isOpen, toggleOpen] = useState(() => false);
    const containerRef = useRef(null);

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            ref={containerRef}
        >
            <MenuToggle isOpen={isOpen} toggle={toggleOpen} />
            <div
                className={`${
                    isOpen ? 'block w-screen' : 'hidden '
                } h-screen w-64 drop-shadow-md md:block`}
            >
                <MenuItems />
            </div>
        </motion.nav>
    );
};
export default Sidebar;
