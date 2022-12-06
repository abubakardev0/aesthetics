import { useState } from 'react';
import { Input } from '@nextui-org/react';

const Details = ({ state, register, setValue, trigger, errors }) => {
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
            <section className="w-full space-y-4">
                <Input
                    width="100%"
                    clearable
                    bordered
                    color="black"
                    animated={false}
                    type="text"
                    label="Artist Name"
                    aria-label="Artist Name"
                    placeholder="Aida Bugg"
                    {...register('artist', {
                        required: true,
                        pattern:
                            /^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/i,
                    })}
                />
                {errors.artist && (
                    <span className="text-sm text-red-500">
                        Is artist name spelled right?
                    </span>
                )}
                <Input
                    width="100%"
                    clearable
                    bordered
                    color="black"
                    animated={false}
                    type="text"
                    label="Title of an artwork"
                    aria-label="Title of an artwork"
                    placeholder="The Sun"
                    {...register('title', {
                        required: true,
                        pattern:
                            /^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/i,
                    })}
                />
                {errors.title && (
                    <span className="text-sm text-red-500">
                        Is title of your artwork spelled right?
                    </span>
                )}
                <div className="space-y-1">
                    <label
                        htmlFor="rarity"
                        className="block text-sm text-gray-800"
                    >
                        Rarity
                    </label>
                    <select
                        id="rarity"
                        name="rarity"
                        className="block w-full rounded-xl border-[3px] border-gray-300 px-2.5 py-2.5 text-[14px] text-black transition-colors delay-75 duration-300 hover:border-black focus:border-black"
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
                </div>
                {errors.rarity && (
                    <span className="text-sm text-red-500">Required field</span>
                )}
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <Input
                            width="100%"
                            color="black"
                            label="Height"
                            bordered
                            aria-label="Height"
                            placeholder="89.5"
                            labelRight={measuringUnit}
                            {...register('height', {
                                required: true,
                                min: 0,
                                pattern: /^\d+(\.\d+)?$/,
                            })}
                        />
                        {errors.height && (
                            <span className="mt-1 text-sm text-red-500">
                                Is the height right?
                            </span>
                        )}
                    </div>
                    <div className="w-1/2">
                        <Input
                            width="100%"
                            color="black"
                            label="Width"
                            bordered
                            aria-label="Width"
                            placeholder="105"
                            labelRight={measuringUnit}
                            {...register('width', {
                                required: true,
                                pattern: /^\d+(\.\d+)?$/,
                            })}
                        />
                        {errors.width && (
                            <span className="mt-1 text-sm text-red-500">
                                Is the width right?
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="w-4/6">
                        <Input
                            width="100%"
                            color="black"
                            label="Depth (Optional)"
                            bordered
                            aria-label="Depth"
                            placeholder="5"
                            labelRight={measuringUnit}
                            {...register('depth', {
                                pattern: /^\d+(\.\d+)?$/,
                            })}
                        />
                        {errors.depth && (
                            <span className="mt-1 text-sm text-red-500">
                                Is the depth right?
                            </span>
                        )}
                    </div>
                    <label className="mb-2 self-end">
                        <input
                            type="radio"
                            name="measuringUnit"
                            value="in"
                            checked={measuringUnit === 'in'}
                            onChange={() => setmeasuringUnit('in')}
                            className="mr-2 accent-black"
                        />
                        in
                    </label>
                    <label className="mb-2 self-end">
                        <input
                            type="radio"
                            name="measuringUnit"
                            value="cm"
                            checked={measuringUnit === 'cm'}
                            onChange={() => setmeasuringUnit('cm')}
                            className="mr-2 accent-black"
                        />
                        cm
                    </label>
                </div>
                {setValue('unit', measuringUnit)}
                <button
                    className="focus:shadow-outline mt-5 w-full rounded-md bg-neutral-800 p-3 font-medium tracking-wide text-gray-100 shadow-lg hover:bg-neutral-900 focus:outline-none"
                    onClick={nextStep}
                >
                    Next Step
                </button>
            </section>
        </>
    );
};
export default Details;
