import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const wishListStore = (set) => ({
    wishListItems: [],
    addItemsToWishList: (item) => {
        set((state) => ({
            wishListItems: [item, ...state.wishListItems],
        }));
    },
    removeItemFromWishList: (itemId) => {
        set((state) => ({
            wishListItems: state.wishListItems.filter(
                (c) => c.itemId !== itemId
            ),
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
