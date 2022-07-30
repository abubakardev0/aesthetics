import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    updateProfile,
    onAuthStateChanged,
    sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../utils/firebase/firebase-config';
import Loader from '../../common/components/Loader';
const provider = new GoogleAuthProvider();

const AuthContext = createContext({
    user: null,
    signIn: () => {},
    logout: () => {},
    signInwithGoogleAccount: () => {},
    signUp: async () => {},
    resetPassword: async () => {},
    error: null,
    loading: false,
});

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const router = useRouter();

    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user);
                    setLoading(false);
                } else {
                    setUser(null);
                    setLoading(true);
                }
                setInitialLoading(false);
            }),
        [auth]
    );

    const signUp = async (name, email, password, artist) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(result);
            const user = await updateProfile(auth.currentUser, {
                displayName: name,
                emailVerified: false,
            });
            await setDoc(doc(db, 'users', result.user.uid), {
                uid: result.user.uid,
                name: name,
                email: email,
                createdAt: Timestamp.fromDate(new Date()),
                artist: artist,
                role: 'buyer',
            });
            setUser(user);
            return true;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const signInwithGoogleAccount = () => {
        setLoading(true);
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
                router.push('/onboarding');
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const signIn = (email, password) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                setUser(userCredentials.user);
                router.push('/');
                setLoading(false);
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const logout = () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                setUser(null);
                router.push('/auth/login');
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const resetPassword = async (email) => {
        return await sendPasswordResetEmail(auth, email);
    };

    const memoedValue = useMemo(() => {
        return {
            user,
            signIn,
            signInwithGoogleAccount,
            logout,
            signUp,
            resetPassword,
            loading,
            error,
        };
    }, [
        user,
        signIn,
        signInwithGoogleAccount,
        logout,
        signUp,
        resetPassword,
        loading,
        error,
    ]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {!initialLoading && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}
