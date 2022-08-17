import ProfileBar from '@/commoncomponents/sidebar/Sidebar';

function SettingsLayout({ children }) {
    return (
        <main className="flex space-x-4">
            <aside
                className="sticky left-0 w-64 rounded-br-3xl rounded-tr-3xl"
                aria-label="Sidebar"
            >
                <ProfileBar />
            </aside>
            <section className="w-8/12">{children}</section>
        </main>
    );
}

export default SettingsLayout;
