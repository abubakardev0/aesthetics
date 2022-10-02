import Sidebar from '@/buyer/components/sidebar/Sidebar';
import PrivateRoute from '@/commoncomponents/routes/Private';

function SettingsLayout({ children }) {
    return (
        <PrivateRoute>
            <main className="">
                <aside className="fixed left-0 z-10 h-screen">
                    <Sidebar />
                </aside>
                <section>{children}</section>
            </main>
        </PrivateRoute>
    );
}

export default SettingsLayout;
