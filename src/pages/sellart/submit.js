import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { getDoc, doc } from 'firebase/firestore';
import { Loading } from '@nextui-org/react';

import axios from 'axios';
import { auth, db } from '../../common/utils/firebase/firebase-config';
import Details from '../../modules/seller/uploadartwork/Details';
import ChooseMaterial from '../../modules/seller/uploadartwork/ChooseMaterial';
import Images from '../../modules/seller/uploadartwork/Images';
import Certification from '../../modules/seller/uploadartwork/Certification';

function ForSubmission({ mediums, surfaces }) {
    const router = useRouter();
    const [formState, setFormState] = useState(1);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        formState: { errors },
    } = useForm({ mode: 'onChange' });

    const onSubmit = useCallback(async (data) => {
        setValue('userId', auth.currentUser.uid);
        setLoading(true);
        await axios.post('/api/submit-artwork', {
            data,
        });
        setLoading(false);
    }, []);

    useEffect(() => {
        router.prefetch('/seller/dashboard');
    }, []);

    return (
        <>
            <main className="my-5 flex justify-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    name="submit-artwork"
                    id="submit-artwork"
                    className="w-full px-10 py-6 sm:w-[400px] sm:flex-col sm:rounded-xl sm:border-2 sm:border-slate-200 sm:shadow-slate-400"
                >
                    {formState === 1 && (
                        <Details
                            register={register}
                            set={setValue}
                            state={setFormState}
                            errors={errors}
                            trigger={trigger}
                        />
                    )}
                    {formState === 2 && (
                        <ChooseMaterial
                            mediums={mediums}
                            surfaces={surfaces}
                            set={setValue}
                            state={setFormState}
                        />
                    )}
                    {formState === 3 && (
                        <>
                            <Images set={setValue} state={setFormState} />
                        </>
                    )}
                    {formState === 4 && (
                        <>
                            <Certification
                                set={setValue}
                                state={setFormState}
                            />
                            <button
                                type="submit"
                                form="submit-artwork"
                                className="mt-5 w-full rounded-md bg-neutral-800 p-3 font-medium tracking-wide text-gray-100 shadow-lg hover:bg-neutral-900"
                            >
                                {loading ? (
                                    <Loading
                                        type="points-opacity"
                                        color="currentColor"
                                        size="sm"
                                    />
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </>
                    )}
                </form>
            </main>
        </>
    );
}

export default ForSubmission;

export async function getStaticProps() {
    const mediumsRef = await getDoc(doc(db, 'categories', 'mediums'));
    const surfacesRef = await getDoc(doc(db, 'categories', 'surfaces'));
    const mediums = mediumsRef.data();
    const surfaces = surfacesRef.data();

    return {
        props: {
            mediums: mediums,
            surfaces: surfaces,
        },
    };
}
