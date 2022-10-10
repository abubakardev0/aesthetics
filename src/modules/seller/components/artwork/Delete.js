import { useState } from 'react';

import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';

import { Modal } from '@nextui-org/react';

import Delete from '@/icons/Delete';

import Error from '@/icons/Error';

function DeleteArtwork({ collection, id }) {
    const [visible, setVisible] = useState(false);

    async function handleDelete() {
        try {
            await deleteDoc(doc(db, collection, id));
        } catch (error) {
            console.log(error);
        } finally {
            setVisible(false);
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
                            className="w-full rounded-xl bg-neutral-200 py-2 text-neutral-800 hover:bg-neutral-300 active:bg-neutral-300"
                        >
                            Discard
                        </button>
                        <button
                            onClick={handleDelete}
                            className="w-full rounded-md bg-red-500 py-2 font-medium text-gray-100 hover:bg-red-600 active:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DeleteArtwork;
