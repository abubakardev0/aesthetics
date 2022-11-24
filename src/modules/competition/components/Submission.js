import { useState } from 'react';

import { Modal, Loading } from '@nextui-org/react';
import { db, auth, storage } from '@/firebase/firebase-config';
import {
    addDoc,
    collection,
    Timestamp,
    getDocs,
    where,
    query,
    limit,
} from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import useSWR from 'swr';
import { useForm } from 'react-hook-form';

import Error from '@/commoncomponents/Error';

export default function Submission({ id }) {
    let res = false;
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { data: submitted, error } = useSWR('submission-work', async () => {
        const docSnap = await getDocs(
            query(
                collection(db, 'competitions', `${id}`, 'participants'),
                where('userId', '==', `${auth.currentUser.uid}`),
                limit(1)
            )
        );
        docSnap.forEach((document) => {
            if (document.exists()) {
                res = true;
            }
        });
        return res;
    });

    if (error) {
        return <Error />;
    }
    if (submitted === undefined || submitted === null) {
        return <Loading color="white" />;
    }
    async function storeinFirestore(obj) {
        try {
            await addDoc(
                collection(db, 'competitions', `${id}`, 'participants'),
                obj
            );
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
            setVisible(false);
        }
    }
    const onSubmit = (data) => {
        setLoading(true);

        const obj = {
            title: data.title,
            userId: auth.currentUser.uid,
            email: data.email,
            name: data.name,
            description: data.description,
            submittedAt: Timestamp.fromDate(new Date()),
        };
        const image = data.image[0];
        const fileType = image.type.split('/')[1];
        const storageRef = ref(storage, `image-${Date.now()}.${fileType}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            (error) => {
                setLoading(false);
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    obj['image'] = downloadURL;
                    storeinFirestore(obj);
                });
            }
        );
    };
    return (
        <>
            <button
                onClick={() => setVisible(true)}
                disabled={submitted ? true : false}
                className="rounded-full border-[2px] border-white bg-white px-5 py-2.5 font-medium text-black transition-colors duration-300 hover:bg-gray-200 active:bg-gray-200 disabled:cursor-not-allowed"
            >
                {submitted ? 'Submitted' : 'Submit Work'}
            </button>
            <Modal
                closeButton
                aria-labelledby="submission-modal"
                open={visible}
                onClose={() => setVisible(false)}
            >
                <Modal.Header>
                    <h3 className="text-lg font-medium">Submit your work</h3>
                </Modal.Header>
                <Modal.Body>
                    <form className="space-y-2">
                        <div className="space-y-1">
                            <label className="text-sm">Title</label>
                            <input
                                type="text"
                                className="w-full rounded-xl border-2 border-gray-300 p-2 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-black focus:-translate-y-[2px] focus:border-black"
                                placeholder="Artwork Title"
                                {...register('title', { required: true })}
                            />
                            {errors.title && (
                                <span className="text-sm text-red-500">
                                    Title doesn`t look valid
                                </span>
                            )}
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm">Name</label>
                            <input
                                type="text"
                                className="w-full rounded-xl border-2 border-gray-300 p-2 capitalize transition-transform delay-75 duration-300 placeholder:text-sm hover:border-black focus:-translate-y-[2px] focus:border-black"
                                placeholder="Your Name"
                                defaultValue={auth.currentUser.displayName}
                                {...register('name', { required: true })}
                            />
                            {errors.name && (
                                <span className="text-sm text-red-500">
                                    Your name doesn`t look valid
                                </span>
                            )}
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm">E-mail</label>
                            <input
                                type="email"
                                className="w-full rounded-xl border-2 border-gray-300 p-2 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-black focus:-translate-y-[2px] focus:border-black"
                                placeholder="Your E-mail"
                                defaultValue={auth.currentUser.email}
                                {...register('email', { required: true })}
                            />
                            {errors.email && (
                                <span className="text-sm text-red-500">
                                    Your email doesn`t look valid
                                </span>
                            )}
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm">Description</label>
                            <textarea
                                rows="4"
                                className="section-scrollbar w-full resize-none rounded-xl border-2 border-gray-300 p-2 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-black focus:-translate-y-[2px] focus:border-black"
                                placeholder="Description of your work"
                                {...register('description', {
                                    required: true,
                                })}
                            />
                            {errors.description && (
                                <span className="text-sm text-red-500">
                                    Please fill this field
                                </span>
                            )}
                        </div>
                        <div>
                            <input
                                type="file"
                                className="block w-fit text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-blue-500 hover:file:bg-blue-100"
                                {...register('image', {
                                    validate: {
                                        lessThan10MB: (files) =>
                                            files[0]?.size < 10485760 ||
                                            'Max 10MB',
                                        acceptedFormats: (files) =>
                                            [
                                                'image/jpeg',
                                                'image/png',
                                                'image/jpg',
                                                'image/webp',
                                            ].includes(files[0]?.type) ||
                                            'Only PNG, JPG, JPEG or Webp',
                                    },
                                })}
                            />
                            {errors.image && (
                                <span className="text-sm text-red-500">
                                    Your file doesn`t look valid. Try picking
                                    another.
                                </span>
                            )}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex w-full space-x-3">
                        <button
                            onClick={() => setVisible(false)}
                            type="reset"
                            className="h-12 w-full rounded-2xl bg-gray-300 font-semibold text-gray-700"
                        >
                            Discard
                        </button>
                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={loading ? true : false}
                            type="submit"
                            className="h-12 w-full rounded-2xl bg-blue-600 font-semibold text-white disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loading
                                    color="white"
                                    type="points-opacity"
                                    size="sm"
                                />
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}
