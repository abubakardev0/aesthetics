import { useRef } from 'react';
import { Input, Textarea } from '@nextui-org/react';

import { db } from '@/firebase/firebase-config';

import { doc, updateDoc } from 'firebase/firestore';

function EditDetails({ title, description, price }) {
    const titleRef = useRef(null);
    const priceRef = useRef(null);
    const Ref = useRef(null);
    async function handleUpdate() {
        return;
    }

    return (
        <div className="mx-auto h-[70vh] w-[450px] space-y-10 pt-10">
            <Input
                bordered
                fullWidth
                clearable
                labelPlaceholder="Title"
                color="default"
                initialValue={title}
            />
            <Input
                bordered
                fullWidth
                clearable
                labelPlaceholder="Price"
                color="default"
                initialValue={price}
            />
            <Textarea
                rows={6}
                bordered
                fullWidth
                color="default"
                labelPlaceholder="Description"
                initialValue={description ? description : 'No Description'}
            />

            <button className="w-full rounded-xl bg-neutral-800 p-3 font-medium tracking-wide text-neutral-100 shadow-lg hover:bg-neutral-900 ">
                Update
            </button>
        </div>
    );
}

export default EditDetails;
