import { useState, useRef } from 'react';
import { useStateMachine } from 'little-state-machine';

import updateAction from '@/commoncomponents/updateAction';

function UploadCertifications({ setValue }) {
    const { state, actions } = useStateMachine({ updateAction });
    const [docs, setDocs] = useState(state.details.certificates);

    const errorRef = useRef();

    const handleUploadDocument = (e) => {
        if (docs.length > 2) {
            errorRef.current.innerText = 'You can only upload 3 certifications';
            return;
        }
        errorRef.current.innerText = '';
        for (const file of e.target.files) {
            if (!file.name.match(/\.(doc|docx|pdf)$/)) {
                errorRef.current.innerText = 'Please select valid file';
                return;
            }
            errorRef.current.innerText = '';

            if (file.size > 3145728) {
                errorRef.current.innerText =
                    'Please select a file less than 3MB';
                return;
            }
            errorRef.current.innerText = '';
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setDocs((doc) => [...doc, reader.result]);
                actions.updateAction({ certificates: docs });
            };
            reader.onerror = () => {
                console.log(reader.error);
            };
        }
    };
    return (
        <>
            <div className="space-y-2 px-1">
                <h2 className="text-lg font-semibold text-black md:text-2xl 2xl:text-3xl">
                    Upload Certifications of your artwork
                </h2>
                <ul className="list-inside list-disc py-1 text-neutral-500 ">
                    <li className="text-xs 2xl:text-base">
                        If possible, include photos of any signatures or
                        certificates of authenticity.
                    </li>
                </ul>
            </div>
            <div className="flex w-full flex-col">
                <div className="relative h-fit w-full rounded-sm border p-5 2xl:border-2">
                    <span
                        ref={errorRef}
                        className="absolute top-1 right-1 text-xs text-red-500"
                    ></span>
                    <h1 className="text-lg font-semibold 2xl:text-xl">
                        Add Certifications here
                    </h1>
                    <p className="text-sm text-neutral-600 md:text-base 2xl:text-lg">
                        Files Supported: Doc, Docx, Pdf
                    </p>
                    <p className="mb-6 text-sm text-neutral-600 md:text-base 2xl:text-lg">
                        Maximum Size: 3MB
                    </p>
                    <input
                        id="certificate-file"
                        type="file"
                        className="block w-fit text-sm text-gray-500 file:mr-4 file:rounded-full file:border file:border-black file:bg-white file:py-2 file:px-5 file:text-sm file:font-medium file:text-black  hover:file:bg-gray-100"
                        onChange={handleUploadDocument}
                        multiple
                    />
                </div>
            </div>
            {setValue('certificates', docs)}
        </>
    );
}

export default UploadCertifications;
