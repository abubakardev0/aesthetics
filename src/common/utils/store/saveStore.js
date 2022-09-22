import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const wishListStore = (set) => ({
    wishListItems: [],
    addItemsToWishList: (item) => {
        set((state) => ({
            wishListItems: [item, ...state.wishListItems],
        }));
    },
    removeItemFromWishList: (id) => {
        set((state) => ({
            wishListItems: state.wishListItems.filter((c) => c.item.id !== id),
        }));
    },
});

const useWishListStore = create(
    devtools(
        persist(wishListStore, {
            name: 'wishListItems',
        })
    )
);

export default useWishListStore;
