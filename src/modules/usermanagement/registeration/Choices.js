import { useEffect, useState } from 'react';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';

import Checkbox from '@/seller/uploadartwork/Checkbox';

function Choices({ set }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function getData() {
            const docRef = doc(db, 'categories', 'painting');
            const docSnap = await getDoc(docRef);
            setCategories(docSnap.data().list);
            setLoading(false);
        }
        getData();
    }, []);

    return (
        <div className="flex items-center justify-center">
            {loading ? (
                <span className="my-5 text-center font-medium">
                    Wait… we are loading!
                </span>
            ) : (
                <div>
                    <h2 className="xl:text-bold text-left text-3xl font-bold text-neutral-800">
                        Select one or more categories
                    </h2>
                    <p className="mt-2 text-left text-base text-neutral-800">
                        This will enable us to suggest artistic content that you
                        would enjoy.
                    </p>
                    <div className="my-5 flex w-full flex-wrap gap-3 sm:gap-4">
                        <Checkbox
                            list={categories}
                            selected={selectedCategories}
                            setSelected={setSelectedCategories}
                            max={categories.length}
                        />
                        {set('favourites', selectedCategories)}
                    </div>
                    <span className="text-sm text-red-400">
                        {selectedCategories.length === 0 &&
                            'Select atleast 1 category!'}
                    </span>
                </div>
            )}
        </div>
    );
}

export default Choices;
