import { useState } from 'react';
import {
    doc,
    getDocs,
    deleteDoc,
    Timestamp,
    collection,
    updateDoc,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';
import { useForm } from 'react-hook-form';
import { Modal, Loading, Input } from '@nextui-org/react';

function ReList({ itemData }) {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const timeLeft = itemData.endingTime.seconds - new Date().getTime() / 1000;
    if (timeLeft > 0) {
        return null;
    }
    async function onSubmit(data) {
        const bidders = [];
        try {
            setLoading(true);
            const docRef = await getDocs(
                collection(db, 'artworks', itemData.id, 'bids')
            );
            docRef.forEach((document) => {
                bidders.push(document.id);
            });
            for (let i = 0; i < bidders.length; i++) {
                await deleteDoc(
                    doc(db, 'artworks', itemData.id, 'bids', bidders[i])
                );
            }
            const { id, ...rest } = itemData;
            const item = {
                ...rest,
                ...data,
                currentBid: data.startingBid,
                lastBid: null,
                endingTime: Timestamp.fromDate(
                    new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
                ),
                uploadedAt: Timestamp.fromDate(
                    new Date(itemData.uploadedAt.seconds * 1000)
                ),
                totalBids: 0,
                status: 'listed',
            };
            await updateDoc(doc(db, 'artworks', itemData.id), item);
            setVisible(false);
        } catch (error) {
            console.log(error);
            setError('Error occurred while performing this action!');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <button
                onClick={() => setVisible(true)}
                className="rounded-md bg-neutral-800 px-4 py-2 text-sm text-white hover:bg-neutral-700 active:bg-neutral-900 2xl:text-base"
            >
                Re-List
            </button>
            <Modal
                closeButton
                aria-labelledby="relist-artwork-modal"
                open={visible}
                onClose={() => setVisible(false)}
            >
                <Modal.Header className="text-left">
                    <h3 className="text-xl font-medium">
                        Relist this item with a new estimation and starting bid
                    </h3>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-sm text-red-500">{error ?? null}</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid w-full place-content-center gap-y-6">
                            <Input
                                clearable
                                bordered
                                width="100%"
                                label="Estimation"
                                placeholder="Estimated Price"
                                labelLeft="PKR"
                                helperText={
                                    errors.price && (
                                        <span className="text-sm text-red-500">
                                            Invalid Price
                                        </span>
                                    )
                                }
                                {...register('price', {
                                    required: true,
                                    min: 0,
                                    pattern: /^\d+(\.\d+)?$/,
                                })}
                            />
                            <Input
                                clearable
                                bordered
                                width="100%"
                                label="Starting Bid"
                                placeholder="Starting Bid"
                                labelLeft="PKR"
                                helperText={
                                    errors.price && (
                                        <span className="text-sm text-red-500">
                                            Invalid Amount
                                        </span>
                                    )
                                }
                                {...register('startingBid', {
                                    required: true,
                                    min: 0,
                                    pattern: /^\d+(\.\d+)?$/,
                                })}
                            />

                            <div className="mx-auto my-5 flex w-64 gap-x-3">
                                <button
                                    type="reset"
                                    onClick={() => setVisible(false)}
                                    disabled={loading ? true : false}
                                    className="w-1/2 rounded-xl bg-neutral-200 py-2 text-neutral-800 hover:bg-neutral-300 active:bg-neutral-300 disabled:cursor-not-allowed"
                                >
                                    Discard
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading ? true : false}
                                    className="w-1/2 rounded-xl bg-neutral-800 p-3 font-medium tracking-wide text-neutral-100 shadow-lg hover:bg-neutral-900 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <Loading
                                            type="points-opacity"
                                            size="sm"
                                        />
                                    ) : (
                                        'Re-List'
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ReList;
