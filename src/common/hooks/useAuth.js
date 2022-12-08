import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
    createUserWithEmailAndPassword,
    setPersistence,
    signInWithEmailAndPassword,
    browserSessionPersistence,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    updateProfile,
    onAuthStateChanged,
    sendPasswordResetEmail,
} from 'firebase/auth';

import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';

import { auth, db } from '@/firebase/firebase-config';

const provider = new GoogleAuthProvider();

const AuthContext = createContext({
    user: null,
    signIn: () => {},
    sessionBasedSignin: () => {},
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
                } else {
                    setUser(null);
                }
                setInitialLoading(false);
            }),
        [auth]
    );

    const signUp = async (name, email, password) => {
        if (error) {
            setError('');
        }
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {
                displayName: name,
                emailVerified: false,
            });
            const user = await setDoc(doc(db, 'users', auth.currentUser.uid), {
                name: name,
                email: email,
                photoURL: auth.currentUser.photoURL,
                createdAt: serverTimestamp(),
                uploadedWorks: 0,
                favourites: [],
            });
            await setDoc(doc(db, 'saves', `${auth.currentUser.uid}`), {
                artworks: [],
            });
            await setDoc(doc(db, 'bag', `${auth.currentUser.uid}`), {
                artworks: [],
            });
            setUser(user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const sessionBasedSignin = async (email, password) => {
        if (error) {
            setError('');
        }
        setLoading(true);
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, email, password);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const signInwithGoogleAccount = async () => {
        if (error) {
            setError('');
        }
        setLoading(true);
        try {
            await signInWithPopup(auth, provider);
            const isRegistered = await getDoc(
                doc(db, 'users', auth.currentUser.uid)
            );
            if (!isRegistered.exists()) {
                await setDoc(doc(db, 'users', auth.currentUser.uid), {
                    name: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                    photoURL: auth.currentUser.photoURL,
                    createdAt: serverTimestamp(),
                    uploadedWorks: 0,
                    favourites: [],
                });
                setDoc(doc(db, 'saves', `${auth.currentUser.uid}`), {
                    artworks: [],
                });
                setDoc(doc(db, 'bag', `${auth.currentUser.uid}`), {
                    artworks: [],
                });
            }
            setUser(user);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const signIn = (email, password) => {
        if (error) {
            setError('');
        }
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                setUser(userCredentials.user);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                router.push('/auth/login');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch {
            setError(error);
        }
    };

    const memoedValue = useMemo(() => {
        return {
            user,
            signIn,
            sessionBasedSignin,
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
        sessionBasedSignin,
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
