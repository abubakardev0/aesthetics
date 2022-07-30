import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const bagStore = (set) => ({
    bagItems: [],
    addItemsToBag: (item) => {
        set((state) => ({
            bagItems: [item, ...state.bagItems],
        }));
    },
    removeItemFromBag: (itemId) => {
        set((state) => ({
            bagItems: state.bagItems.filter((c) => c.itemId !== itemId),
        }));
    },
});

const useBagStore = create(
    devtools(
        persist(bagStore, {
            name: 'bagItems',
        })
    )
);

export default useBagStore;
