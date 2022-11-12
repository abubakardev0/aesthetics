import { useState, useRef } from 'react';

import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    deleteUser,
} from 'firebase/auth';

import { Input, Modal } from '@nextui-org/react';

function DeleteAccount({ user, router }) {
    const [visible, setVisible] = useState(false);
    const passRef = useRef(null);
    const errorRef = useRef(null);

    function handleDelete() {
        if (passRef.current.value === '' || passRef.current.value === null) {
            errorRef.current.innerText = 'Please enter your password';
            return;
        }
        errorRef.current.innerText = '';
        const credential = EmailAuthProvider.credential(
            user.email,
            passRef.current.value
        );
        reauthenticateWithCredential(user, credential)
            .then(() => {
                deleteUser(user)
                    .then(() => {
                        router.push('/farewell');
                    })
                    .catch((error) => {
                        errorRef.current.innerText = 'Error occured';
                    });
            })
            .catch((error) => {
                errorRef.current.innerText = 'Incorrect Password';
            });
    }

    return (
        <>
            <button
                onClick={() => setVisible(true)}
                className="h-12 w-full rounded-md bg-neutral-900 text-white hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-neutral-300"
            >
                Delete my Account
            </button>
            <Modal
                closeButton
                aria-labelledby="delete-account-modal"
                open={visible}
                onClose={() => setVisible(false)}
            >
                <Modal.Header className="inline-block text-left">
                    <h4 className="text-lg font-medium">
                        Deleting an account will do following things:
                    </h4>
                    <ul className="my-4 list-inside list-disc">
                        <li className="text-sm text-red-400">
                            Log you out on all devices.
                        </li>
                        <li className="text-sm text-red-400">
                            Delete all of you Account Information.
                        </li>
                    </ul>
                </Modal.Header>
                <Modal.Body>
                    <Input.Password
                        width="100%"
                        bordered
                        clearable
                        color="black"
                        type="password"
                        label="Current Password"
                        placeholder="Your Current Password"
                        ref={passRef}
                    />
                    <span
                        ref={errorRef}
                        style={{
                            color: 'red',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            marginTop: '3px',
                        }}
                    />
                    <div className="flex space-x-3">
                        <button
                            type="reset"
                            onClick={() => setVisible(false)}
                            className="w-full rounded-xl bg-neutral-200 py-2 text-neutral-800 hover:bg-neutral-300 active:bg-neutral-300"
                        >
                            Discard
                        </button>
                        <button
                            onClick={handleDelete}
                            className="w-full rounded-md bg-red-500 py-2 font-medium text-gray-100 hover:bg-red-600 active:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DeleteAccount;
