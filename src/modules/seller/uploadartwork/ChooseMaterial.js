import { useRef, useState } from 'react';
import { useStateMachine } from 'little-state-machine';

import updateAction from '@/commoncomponents/updateAction';
import Checkbox from './Checkbox';

function ChooseMaterial({ mediums, surfaces, formState, setValue, setError }) {
    const { state, actions } = useStateMachine({ updateAction });
    const [selectedMediums, setSelectedMediums] = useState(
        state.details.mediums
    );
    const [selectedSurfaces, setSelectedSurfaces] = useState(
        state.details.surfaces
    );

    const mediumRef = useRef();
    const surfaceRef = useRef();
    const prevStep = () => {
        actions.updateAction({
            mediums: selectedMediums,
            surfaces: selectedSurfaces,
        });
        formState((e) => e - 1);
    };
    const nextStep = async () => {
        if (selectedMediums.length > 0 && selectedSurfaces.length > 0) {
            actions.updateAction({
                mediums: selectedMediums,
                surfaces: selectedSurfaces,
            });
            formState((e) => e + 1);
        } else {
            setError('mediums', {
                type: 'custom',
                message: 'criteria not fulfilled',
            });
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
                <div className="mt-3">
                    <div className="flex flex-wrap gap-4">
                        <Checkbox
                            list={mediums.list}
                            selected={selectedMediums}
                            setSelected={setSelectedMediums}
                            max={3}
                        />
                    </div>
                    <span ref={mediumRef} className="text-sm text-red-500" />
                    {setValue('mediums', selectedMediums)}
                </div>
                <h2 className="mt-4 text-lg font-semibold text-black">
                    Choose Artwork Surface
                </h2>
                <div className="mt-3">
                    <div className="flex flex-wrap gap-4">
                        <Checkbox
                            list={surfaces.list}
                            selected={selectedSurfaces}
                            setSelected={setSelectedSurfaces}
                            max={3}
                        />
                    </div>
                    <span ref={surfaceRef} className="text-sm text-red-500" />
                    {setValue('surfaces', selectedSurfaces)}
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
