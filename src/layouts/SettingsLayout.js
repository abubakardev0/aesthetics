import Sidebar from '@/buyer/components/sidebar/Sidebar';

function SettingsLayout({ children }) {
    return (
        <>
            <main className="">
                <aside className="fixed left-0 z-10 h-screen">
                    <Sidebar />
                </aside>
                <section>{children}</section>
            </main>
        </>
    );
}

export default SettingsLayout;
