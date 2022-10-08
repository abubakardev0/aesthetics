import Link from 'next/link';
import Plus from '@/icons/Plus';

function AuthLayout({ children }) {
    return (
        <main className="grid max-h-full min-h-screen w-screen place-content-center py-8">
            <div className="fixed top-3 right-3">
                <Link href="/">
                    <a>
                        <Plus className="h-6 w-6 rotate-45" />
                    </a>
                </Link>
            </div>
            {children}
        </main>
    );
}

export default AuthLayout;
