import { useRef, useState } from 'react';

import Checkbox from './Checkbox';

function ChooseMaterial({ mediums, surfaces, set, state }) {
    const [selectedMediums, setSelectedMediums] = useState([]);
    const [selectedSurfaces, setSelectedSurfaces] = useState([]);
    const mediumRef = useRef();
    const surfaceRef = useRef();
    const prevStep = () => {
        state((e) => e - 1);
    };
    const nextStep = () => {
        if (selectedMediums.length > 0 && selectedSurfaces.length > 0) {
            state((e) => e + 1);
        } else {
            selectedMediums.length === 0
                ? (mediumRef.current.innerText = `Please select at least one medium`)
                : (mediumRef.current.innerText = ``);

            selectedSurfaces.length === 0
                ? (surfaceRef.current.innerText = `Please select at least one surface`)
                : (surfaceRef.current.innerText = ``);
        }
    };

    return (
        <>
            <div className="w-full">
                <h2 className="text-lg font-semibold text-black ">
                    Choose Drawing Material
                </h2>
                <div className="mt-3 flex flex-wrap gap-4">
                    <Checkbox
                        list={mediums.list}
                        selected={selectedMediums}
                        setSelected={setSelectedMediums}
                        max={3}
                    />
                    <span
                        ref={mediumRef}
                        className="text-sm text-red-500"
                    ></span>
                    {set('mediums', selectedMediums)}
                </div>
                <h2 className="mt-4 text-lg font-semibold text-black">
                    Choose Artwork Surface
                </h2>
                <div className="mt-3 flex flex-wrap gap-4">
                    <Checkbox
                        list={surfaces.list}
                        selected={selectedSurfaces}
                        setSelected={setSelectedSurfaces}
                        max={3}
                    />
                    <span
                        ref={surfaceRef}
                        className="text-sm text-red-500"
                    ></span>
                    {set('surfaces', selectedSurfaces)}
                </div>
            </div>
            <div className="mt-5 flex space-x-3">
                <button
                    className="w-full rounded-xl bg-neutral-200 py-2 text-neutral-800 hover:bg-neutral-300"
                    onClick={prevStep}
                >
                    Prev Step
                </button>
                <button
                    className="w-full rounded-xl bg-neutral-800 p-3 font-medium tracking-wide text-neutral-100 shadow-lg hover:bg-neutral-900 "
                    onClick={nextStep}
                >
                    Next Step
                </button>
            </div>
        </>
    );
}

export default ChooseMaterial;
