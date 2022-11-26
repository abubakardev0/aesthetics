import { useState, useRef } from 'react';

import Image from 'next/image';

import { useStateMachine } from 'little-state-machine';

import updateAction from '@/commoncomponents/updateAction';
import Plus from '@/icons/Plus';

function Images({ formState, setValue, setError }) {
    const { state, actions } = useStateMachine({ updateAction });
    const [picture, setPicture] = useState(state.details.images);
    const errorRef = useRef();

    const handleImageUpload = (e) => {
        if (picture.length > 2) {
            errorRef.current.innerText = 'You can only upload 3 pictures';
            return;
        }
        errorRef.current.innerText = '';
        for (const file of e.target.files) {
            if (!file.name.match(/\.(jpg|jpeg|png|webp)$/)) {
                errorRef.current.innerText = 'Please select valid image';
                return;
            }
            errorRef.current.innerText = '';

            if (file.size > 20971520) {
                errorRef.current.innerText =
                    'Please select image less than 20MB';
                return;
            }
            errorRef.current.innerText = '';
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPicture((imgs) => [...imgs, reader.result]);
            };
            reader.onerror = () => {
                console.log(reader.error);
            };
        }
    };
    const prevStep = () => {
        actions.updateAction({ images: picture });
        formState((e) => e - 1);
    };
    const nextStep = () => {
        if (picture.length > 0) {
            actions.updateAction({ images: picture });
            formState((e) => e + 1);
        } else {
            errorRef.current.innerText = 'Please select atleast 1 image';
            setError('images', {
                type: 'custom',
                message: 'Please select atleast 1 image',
            });
        }
    };
    return (
        <>
            <div>
                <div className="space-y-2 px-1">
                    <h2 className="text-lg font-semibold text-black md:text-2xl 2xl:text-3xl">
                        Upload photos of your artwork
                    </h2>
                    <ul className="list-inside list-disc py-1 text-neutral-500 ">
                        <li className="text-xs 2xl:text-base">
                            For a faster valuation, please upload high-quality
                            photos of the work's front and back.
                        </li>
                    </ul>
                </div>
                <div className="flex w-full flex-col">
                    <div className="relative h-fit w-full rounded-sm border p-5 2xl:border-2">
                        <span
                            ref={errorRef}
                            className="absolute top-1 right-1 py-1 text-xs tracking-wide text-red-500 2xl:text-sm"
                        ></span>
                        <h1 className="text-lg font-semibold 2xl:text-xl">
                            Add Photos here
                        </h1>
                        <p className="text-sm text-neutral-600 md:text-base 2xl:text-lg">
                            Files Supported: JPG,JPEG, PNG, Webp
                        </p>
                        <p className="mb-6 text-sm text-neutral-600 md:text-base 2xl:text-lg">
                            Maximum Size: 20MB
                        </p>
                        <label htmlFor="image-file" className="sr-only">
                            Add Photo
                        </label>
                        <input
                            id="image-file"
                            type="file"
                            className="block w-fit text-sm text-gray-500 file:mr-4 file:rounded-full file:border file:border-black file:bg-white file:py-2 file:px-5 file:text-sm file:font-medium file:text-black  hover:file:bg-gray-100"
                            onChange={handleImageUpload}
                            multiple
                        />
                    </div>
                    {picture.length >= 1 && (
                        <div className="mt-2 h-fit w-full border py-2 px-5">
                            <h1 className="mb-2 text-lg font-semibold 2xl:text-xl">
                                Uploaded Artwork Preview:
                            </h1>
                            <div className="space-x-3">
                                {picture.map((pic, index) => (
                                    <span
                                        key={index}
                                        className="relative h-28 w-28"
                                    >
                                        <button
                                            className="absolute bottom-2 right-1 z-10 "
                                            onClick={() =>
                                                setPicture(
                                                    picture.filter(
                                                        (e, i) => i !== index
                                                    )
                                                )
                                            }
                                        >
                                            <Plus className="h-6 w-6 rotate-45" />
                                        </button>
                                        <Image
                                            src={pic}
                                            height="90"
                                            width="80"
                                            objectFit="cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                    'image_path_here';
                                            }}
                                        />
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                {setValue('images', picture)}
            </div>
            <div className="mt-5 flex space-x-3">
                <button
                    className="w-full rounded-xl bg-neutral-200 py-2 text-neutral-800 active:bg-neutral-300"
                    onClick={prevStep}
                >
                    Prev Step
                </button>
                <button
                    className="focus:shadow-outline w-full rounded-xl bg-neutral-800 p-3 font-medium tracking-wide text-neutral-100 shadow-lg focus:outline-none active:bg-neutral-900"
                    onClick={nextStep}
                >
                    Next Step
                </button>
            </div>
        </>
    );
}

export default Images;
