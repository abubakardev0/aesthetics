import { useRouter } from 'next/router';

import { auth } from '@/firebase/firebase-config';

import Loader from '@/commoncomponents/Loader';

function PrivateRoute({ children }) {
    const router = useRouter();
    if (!auth.currentUser) {
        router.replace('/auth/login');
        return <Loader />;
    }
    return children;
}

export default PrivateRoute;
