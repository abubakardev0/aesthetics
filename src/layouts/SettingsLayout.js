import Sidebar from '@/buyer/components/sidebar/Sidebar';
import PrivateRoute from '@/commoncomponents/routes/Private';

function SettingsLayout({ children }) {
    return (
        <PrivateRoute>
            <main>
                <aside className="fixed left-0 z-10 h-screen">
                    <Sidebar />
                </aside>
                <section className="ml-0 lg:ml-64">{children}</section>
            </main>
        </PrivateRoute>
    );
}

export default SettingsLayout;
