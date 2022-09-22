import { useState, useRef } from 'react';

function UploadCertifications({ set }) {
    const [docs, setDocs] = useState([]);
    const errorRef = useRef();
    const isUploadRef = useRef();

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
            isUploadRef.current.innerText = 'Uploading...';
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setDocs((doc) => [...doc, reader.result]);
                isUploadRef.current.innerText = 'Uploaded';
            };
            reader.onerror = () => {
                console.log(reader.error);
            };
        }
    };
    return (
        <>
            <div className="space-y-2 px-1">
                <h2 className="text-lg font-semibold text-black md:text-2xl">
                    Upload Certifications of your artwork
                </h2>
                <ul className="list-inside list-disc py-1 text-neutral-500 ">
                    <li className="text-xs">
                        If possible, include photos of any signatures or
                        certificates of authenticity.
                    </li>
                </ul>
            </div>
            <div className="flex w-full flex-col">
                <div className="relative h-fit w-full border p-5">
                    <span
                        ref={errorRef}
                        className="absolute top-1 right-1 text-xs text-red-500"
                    ></span>
                    <h1 className="text-lg font-semibold">
                        Add Certifications here
                    </h1>
                    <p className="text-sm text-neutral-600 md:text-base">
                        Files Supported: Doc, Docx, Pdf
                    </p>
                    <p className="mb-6 text-sm text-neutral-600 md:text-base">
                        Maximum Size: 3MB
                    </p>
                    <label
                        ref={isUploadRef}
                        htmlFor="image-file"
                        className="mb-2 rounded-full border border-black px-5 py-2 shadow-md active:bg-neutral-800 active:text-white"
                    >
                        Add Document
                    </label>
                    <input
                        id="image-file"
                        type="file"
                        className="hidden"
                        onChange={handleUploadDocument}
                        multiple
                    />
                </div>
            </div>
            {set('certificates', docs)}
        </>
    );
}

export default UploadCertifications;
