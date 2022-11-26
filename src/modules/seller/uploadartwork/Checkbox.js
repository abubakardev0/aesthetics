import { useRef } from 'react';

const Checkbox = ({ list, selected, setSelected, max = 3 }) => {
    const errorRef = useRef();
    const select = (event) => {
        const current = event.target.name;
        if (selected.includes(current)) {
            setSelected(selected.filter((medium) => medium !== current));
        } else {
            if (selected.length >= max) {
                errorRef.current.innerText = `You can select up to ${max} options`;
                return;
            }
            errorRef.current.innerText = ``;
            setSelected((m) => [...m, current]);
        }
    };
    return (
        <>
            {list.map((item, index) => (
                <label key={index}>
                    <input
                        checked={selected.includes(item) ? true : false}
                        type="checkbox"
                        name={item}
                        onChange={select}
                        className="peer hidden"
                    />
                    <div className="w-fit rounded-full border-2 border-gray-300 px-3 py-2 text-sm capitalize peer-checked:border-blue-400 peer-checked:bg-blue-400 peer-checked:text-white 2xl:text-base">
                        {item}
                    </div>
                </label>
            ))}
            <span ref={errorRef} className="text-sm text-red-500"></span>
        </>
    );
};
export default Checkbox;
