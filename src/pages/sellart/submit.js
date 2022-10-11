import { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebase-config';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Loading } from '@nextui-org/react';

import EmptyLayout from '@/layouts/EmptyLayout';
import PrivateRoute from '@/commoncomponents/routes/Private';
import Details from '@/seller/uploadartwork/Details';
import ChooseMaterial from '@/seller/uploadartwork/ChooseMaterial';
import Images from '@/seller/uploadartwork/Images';
import UploadCertifications from '@/seller/uploadartwork/Certification';
import Arrow from '@/icons/Arrow';

function FormSubmission({ mediums, surfaces }) {
    const router = useRouter();
    const [formState, setFormState] = useState(1);
    const [loading, setLoading] = useState(false);
    const errorRef = useRef(null);
    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log('submit');
        setLoading(true);
        try {
            const res = await axios.post('/api/submit-artwork', {
                data,
            });
            if (res.status === 200) {
                setFormState((e) => e + 1);
            }
        } catch (error) {
            errorRef.current.innerText =
                'There was an error while submitting the form. Please try again later.';
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        router.prefetch('/seller/');
    }, []);

    return (
        <PrivateRoute>
            <button
                onClick={() => router.back()}
                className="fixed left-2 top-2 rounded-full border bg-white p-2 hover:bg-gray-50 md:left-6 md:top-8"
            >
                <Arrow className="h-6 w-6 -rotate-180" />
            </button>
            <main className="grid place-content-center pt-12 pb-5 md:gap-5 md:py-10">
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
                <section className="mt-5 w-full place-self-center px-5 py-6 sm:w-[400px] sm:flex-col sm:rounded-xl sm:border-2 sm:border-slate-200 sm:shadow-slate-400">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        name="submit-artwork"
                        id="submit-artwork"
                    >
                        {formState === 1 && (
                            <Details
                                state={setFormState}
                                register={register}
                                setValue={setValue}
                                errors={errors}
                                trigger={trigger}
                            />
                        )}
                        {formState === 2 && (
                            <ChooseMaterial
                                mediums={mediums}
                                surfaces={surfaces}
                                state={setFormState}
                                setValue={setValue}
                                setError={setError}
                            />
                        )}
                        {formState === 3 && (
                            <>
                                <Images
                                    state={setFormState}
                                    setValue={setValue}
                                    setError={setError}
                                />
                            </>
                        )}
                        {formState === 4 && (
                            <>
                                <UploadCertifications
                                    state={setFormState}
                                    setValue={setValue}
                                />
                                {setValue('uid', auth.currentUser.uid)}
                                {console.log('logged')}
                                <div className="mt-5 flex space-x-3">
                                    <button
                                        className="w-full rounded-xl bg-neutral-200 py-2 text-neutral-800 active:bg-neutral-300"
                                        onClick={() =>
                                            setFormState((e) => e - 1)
                                        }
                                    >
                                        Prev Step
                                    </button>
                                    <button
                                        disabled={loading ? true : false}
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
                                <span
                                    ref={errorRef}
                                    className="mt-2 text-base text-red-500"
                                />
                            </>
                        )}
                    </form>
                    {formState === 5 && (
                        <>
                            <h4 className="my-2 text-center text-xl font-medium">
                                Thanks for uploading your artwork!
                            </h4>
                            <p className="text-center">
                                If your artwork is accepted, we will notify you
                                by email. In the event that your application is
                                rejected, you will be notified by email with
                                feedback.
                            </p>
                            <div className="mt-5 flex space-x-3">
                                <button
                                    onClick={() => router.push('/')}
                                    className="w-full rounded-xl bg-neutral-200 py-3 text-neutral-800 active:bg-neutral-300"
                                >
                                    Go to Home
                                </button>
                                <button
                                    onClick={() => router.push('/seller/')}
                                    className="focus:shadow-outline w-full rounded-xl bg-neutral-800 py-3 px-1 font-medium tracking-wide text-neutral-100 shadow-lg focus:outline-none active:bg-neutral-900"
                                >
                                    Go to Dashboard
                                </button>
                            </div>
                        </>
                    )}
                </section>
            </main>
        </PrivateRoute>
    );
}

export default FormSubmission;

FormSubmission.title = 'Submit Artwork';
FormSubmission.Layout = EmptyLayout;

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
