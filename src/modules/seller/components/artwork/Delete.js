import { useState } from 'react';

import {
    doc,
    collection,
    deleteDoc,
    updateDoc,
    getDocs,
    increment,
    query,
    where,
} from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

import { Modal, Loading } from '@nextui-org/react';

import Delete from '@/icons/Delete';

import Error from '@/icons/Error';

function DeleteArtwork({ collectionName, id, type }) {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(null);

    async function deleteImmediate(id, uid) {
        const documents = [];
        const bagQuery = await getDocs(
            query(
                collection(db, 'bag'),
                where('artworks', 'array-contains', id)
            )
        );
        const wishListQuery = await getDocs(
            query(
                collection(db, 'saves'),
                where('artworks', 'array-contains', id)
            )
        );
        bagQuery.forEach((d) => {
            documents.push({ type: 'bag', id: d.id });
        });
        wishListQuery.forEach((d) => {
            documents.push({ type: 'saves', id: d.id });
        });
        documents.map((obj) => {
            updateDoc(doc(db, `${obj.type}`, obj.id), {
                artworks: arrayRemove(id),
            });
        });
        await deleteDoc(doc(db, 'artworks', id));
        await updateDoc(doc(db, 'users', `${uid}`), {
            uploadedWorks: increment(-1),
        });
    }

    async function deleteAuction(id, uid) {
        const list = [];
        const bidders = await getDocs(collection(db, 'artworks', id, 'bids'));
        bidders.forEach((bidder) => {
            list.push(bidder.id);
        });
        list.forEach((bidId) => {
            deleteDoc(doc(db, 'artworks', id, 'bids', `${bidId}`));
        });
        await deleteDoc(doc(db, 'artworks', id));
        await updateDoc(doc(db, 'users', `${uid}`), {
            uploadedWorks: increment(-1),
        });
    }
    async function handleDelete() {
        try {
            setLoading(true);
            if (type === 'auction' && collectionName === 'artworks') {
                deleteAuction(id, auth.currentUser.uid);
            } else if (type === 'immediate' && collectionName === 'artworks') {
                deleteImmediate(id, auth.currentUser.uid);
            } else {
                await deleteDoc(doc(db, 'submittedArtworks', id));
            }
            setVisible(false);
        } catch (error) {
            setError('Error occurred while performing this action!');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <button onClick={() => setVisible(true)}>
                <Delete
                    className="h-5 w-5 hover:fill-red-400"
                    fill="none"
                    stroke="#FF0080"
                />
            </button>
            <Modal
                closeButton
                aria-labelledby="delete-artwork-modal"
                open={visible}
                onClose={() => setVisible(false)}
            >
                <Modal.Header className="inline-block space-y-4 text-left">
                    <span className="text-sm text-red-500">
                        {error ?? null}
                    </span>
                    <h3 className="text-lg font-medium">
                        You're deleting an amazing piece, right?
                    </h3>
                    <div className="relative h-24 w-full rounded-md border-l-4 border-red-600 bg-red-200 py-3 pl-8 pr-2 md:pl-12 md:pr-4">
                        <Error
                            className="absolute top-4 left-1 h-6 w-6 md:h-8 md:w-8"
                            fill="#b91c1c"
                        />
                        <h4 className="text-base font-semibold uppercase text-red-800">
                            Warning
                        </h4>
                        <p className="text-sm font-medium leading-6 tracking-wide text-red-800">
                            The item will be permanently removed.
                            <br />
                            You can't undo this.
                        </p>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex space-x-3">
                        <button
                            type="reset"
                            onClick={() => setVisible(false)}
                            disabled={loading ? true : false}
                            className="w-full rounded-xl bg-neutral-200 py-2 text-neutral-800 hover:bg-neutral-300 active:bg-neutral-300 disabled:cursor-not-allowed"
                        >
                            Discard
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={loading ? true : false}
                            className="w-full rounded-md bg-red-500 py-2 font-medium text-gray-100 hover:bg-red-600 active:bg-red-600 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loading type="points-opacity" size="sm" />
                            ) : (
                                'Delete'
                            )}
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DeleteArtwork;
