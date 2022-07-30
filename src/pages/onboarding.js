import { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../common/utils/firebase/firebase-config';
import { useRouter } from 'next/router';
import Checkbox from '../modules/seller/uploadartwork/Checkbox';
function Choices({ categories }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    useEffect(() => {
        if (!auth.currentUser) {
            router.push('/login');
        }
    }, [auth.currentUser]);
    const router = useRouter();
    const submitData = async () => {
        await setDoc(
            doc(db, 'users', auth.currentUser.uid),
            {
                favourites: selectedCategories,
            },
            { merge: true }
        );
        router.push('/');
    };

    return (
        <main className="flex h-screen items-center justify-center">
            <div className="w-full p-6 sm:rounded-xl sm:border-2 sm:border-slate-200 sm:px-10 sm:py-5 sm:shadow-slate-400 md:w-[500px] md:p-10">
                <h2 className="xl:text-bold text-left text-3xl font-bold text-neutral-800">
                    Select one or more categories
                </h2>
                <p className="mt-2 text-left text-base text-neutral-800">
                    This will enable us to suggest artistic content that you
                    would enjoy.
                </p>
                <div className="my-5 flex w-full flex-wrap gap-3 sm:gap-4">
                    <Checkbox
                        list={categories.list}
                        selected={selectedCategories}
                        setSelected={setSelectedCategories}
                        max={categories.list.length}
                    />
                </div>
                <span className="text-sm text-red-400">
                    {selectedCategories.length === 0 &&
                        'Select atleast 1 category!'}
                </span>
                <button
                    onClick={submitData}
                    className="focus:shadow-outline mt-5 w-full rounded-md bg-neutral-800 p-3 font-medium tracking-wide text-gray-100 shadow-lg hover:bg-neutral-900 focus:outline-none"
                >
                    See my Feed
                </button>
            </div>
        </main>
    );
}
export default Choices;

export async function getStaticProps() {
    const docRef = doc(db, 'categories', 'painting');
    const docSnap = await getDoc(docRef);
    const categories = docSnap.data();
    return {
        props: {
            categories: categories,
        },
    };
}
