import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Loading } from '@nextui-org/react';

import Loader from '@/commoncomponents/Loader';

import { getDoc, doc } from 'firebase/firestore';

import axios from 'axios';
import { auth, db } from '@/firebase/firebase-config';
import Details from '@/seller/uploadartwork/Details';
import ChooseMaterial from '@/seller/uploadartwork/ChooseMaterial';
import Images from '@/seller/uploadartwork/Images';
import UploadCertifications from '@/seller/uploadartwork/Certification';

function FormSubmission({ mediums, surfaces }) {
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

    if (!auth.currentUser) {
        router.push('/auth/login');
        return <Loader />;
    }

    const onSubmit = useCallback(async (data) => {
        setValue('uid', auth.currentUser.uid);
        setLoading(true);
        axios
            .post('/api/submit-artwork', {
                data,
            })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        router.prefetch('/seller/dashboard');
    }, []);

    return (
        <>
            <main className="grid place-content-center py-10 md:gap-5">
                <div className="flex w-full items-center justify-center px-2 pt-3 sm:w-[500px]">
                    <Steps
                        current={formState}
                        number={1}
                        description="Details"
                        isLast={false}
                    />
                    <Steps
                        current={formState}
                        number={2}
                        description="Choose Material"
                        isLast={false}
                    />
                    <Steps
                        current={formState}
                        number={3}
                        description="Upload Images"
                        isLast={false}
                    />
                    <Steps
                        current={formState}
                        number={4}
                        description="Upload Certifications"
                        isLast={true}
                    />
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    name="submit-artwork"
                    id="submit-artwork"
                    className="mt-5 w-full place-self-center px-5 py-6 sm:w-[400px] sm:flex-col sm:rounded-xl sm:border-2 sm:border-slate-200 sm:shadow-slate-400"
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
                            <UploadCertifications
                                set={setValue}
                                state={setFormState}
                            />
                            <div className="mt-5 flex space-x-3">
                                <button
                                    className="w-full rounded-xl bg-neutral-200 py-2 text-neutral-800 active:bg-neutral-300"
                                    onClick={() => setFormState((e) => e - 1)}
                                >
                                    Prev Step
                                </button>
                                <button
                                    type="submit"
                                    form="submit-artwork"
                                    className="w-full rounded-md bg-neutral-800 p-3 font-medium tracking-wide text-neutral-100 shadow-lg hover:bg-neutral-900"
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
                            </div>
                        </>
                    )}
                </form>
            </main>
        </>
    );
}

export default FormSubmission;

const Steps = ({ current, number, isLast }) => {
    return (
        <>
            <div className="relative mx-2 flex items-center">
                <div
                    className={`${
                        current > number
                            ? 'bg-neutral-800 text-neutral-100'
                            : 'bg-none text-neutral-800'
                    } ${
                        current === number
                            ? 'bg-neutral-200 text-neutral-800'
                            : 'bg-none text-neutral-800'
                    } h-8 w-8 rounded-full  border-2 border-neutral-800 py-0.5 text-center transition duration-500 ease-in-out md:h-12 md:w-12 md:py-3`}
                >
                    {number}
                </div>
            </div>
            {!isLast && (
                <div className="flex-auto border-t-2 border-neutral-800 transition duration-500 ease-in-out" />
            )}
        </>
    );
};

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
