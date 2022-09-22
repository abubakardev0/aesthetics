import { useState } from 'react';
import { Input } from '@nextui-org/react';

const Details = ({ register, set, state, errors, trigger }) => {
    const [measuringUnit, setmeasuringUnit] = useState('in');
    const nextStep = async () => {
        const isValid = await trigger([
            'artist',
            'title',
            'rarity',
            'height',
            'width',
        ]);
        if (isValid) {
            state((e) => e + 1);
        }
    };
    return (
        <>
            <div className="flex w-full flex-col space-y-5">
                <Input
                    width="100%"
                    clearable
                    color="black"
                    animated={false}
                    type="text"
                    label="Artist Name"
                    aria-label="Artist Name"
                    placeholder="Aida Bugg"
                    {...register('artist', {
                        required: true,
                    })}
                />
                {errors.artist && (
                    <p className="bottom-0 text-xs italic text-red-500">
                        Required field
                    </p>
                )}
                <Input
                    width="100%"
                    clearable
                    color="black"
                    animated={false}
                    type="text"
                    label="Title of an artwork"
                    aria-label="Title of an artwork"
                    placeholder="The Sun"
                    {...register('title', {
                        required: true,
                    })}
                />
                {errors.title && (
                    <p className="text-xs italic text-red-500">
                        Required field
                    </p>
                )}
                <label
                    htmlFor="rarity"
                    className="mb-2 block text-sm font-medium text-gray-500"
                >
                    Rarity
                </label>
                <select
                    id="rarity"
                    name="rarity"
                    className="block w-full rounded-xl border border-gray-100 bg-gray-100 p-2.5 text-[14px] text-gray-400"
                    required
                    value={state.rarity}
                    {...register('rarity', {
                        required: true,
                    })}
                >
                    <option disabled>Select your classification</option>
                    <option value="open">Open Edition</option>
                    <option value="unique">Unique</option>
                    <option value="limited">Limited Edition</option>
                    <option value="unknown">Unknown Edition</option>
                </select>
                {errors.rarity && (
                    <p className="text-xs italic text-red-500">
                        Required field
                    </p>
                )}
                <div className="flex space-x-4">
                    <div>
                        <Input
                            width="100%"
                            clearable
                            color="black"
                            type="number"
                            label="Height"
                            aria-label="Height"
                            placeholder="10"
                            labelRight={measuringUnit}
                            {...register('height', {
                                required: true,
                                pattern: /^\d+(\.\d+)?$/,
                            })}
                        />
                        {errors.height && (
                            <p className="mt-1 text-xs italic text-red-500">
                                Required field
                            </p>
                        )}
                    </div>
                    <div>
                        <Input
                            width="100%"
                            clearable
                            color="black"
                            type="number"
                            label="Width"
                            aria-label="Width"
                            placeholder="10"
                            labelRight={measuringUnit}
                            {...register('width', {
                                required: true,
                                pattern: /^\d+(\.\d+)?$/,
                            })}
                        />
                        {errors.width && (
                            <p className="mt-1 text-xs italic text-red-500">
                                Required field
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid grid-flow-col place-content-center gap-6">
                    <Input
                        width="100%"
                        clearable
                        color="black"
                        type="number"
                        label="Depth (Optional)"
                        aria-label="Depth"
                        placeholder="10"
                        labelRight={measuringUnit}
                        {...register('depth', {
                            pattern: /^\d+(\.\d+)?$/,
                        })}
                    />
                    <label className="mb-2 place-self-end">
                        <input
                            type="radio"
                            name="measuringUnit"
                            value="in"
                            checked={measuringUnit === 'in'}
                            onChange={() => setmeasuringUnit('in')}
                            className="mr-2"
                        />
                        in
                    </label>
                    <label className="mb-2 place-self-end">
                        <input
                            type="radio"
                            name="measuringUnit"
                            value="cm"
                            checked={measuringUnit === 'cm'}
                            onChange={() => setmeasuringUnit('cm')}
                            className="mr-2"
                        />
                        cm
                    </label>
                </div>
                {set('unit', measuringUnit)}
                <button
                    className="focus:shadow-outline mt-5 w-full rounded-md bg-neutral-800 p-3 font-medium tracking-wide text-gray-100 shadow-lg hover:bg-neutral-900 focus:outline-none"
                    onClick={nextStep}
                >
                    Next Step
                </button>
            </div>
        </>
    );
};
export default Details;
