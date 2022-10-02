import { useState, useRef } from 'react';

import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from 'firebase/auth';

import { Input, Modal } from '@nextui-org/react';

import Alert from '@/commoncomponents/popups/Alert';

const ChangePassword = ({ user }) => {
    const [visible, setVisible] = useState(false);
    const [showAlert, setAlert] = useState(false);

    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();
    const errorRef = useRef();

    function changePassword() {
        if (
            currentPasswordRef.current.value === '' ||
            newPasswordRef.current.value === ''
        ) {
            errorRef.current.innerText = 'Please fill all fields';
            return;
        }
        const credential = EmailAuthProvider.credential(
            user.email,
            currentPasswordRef.current.value
        );
        reauthenticateWithCredential(user, credential)
            .then(() => {
                updatePassword(user, newPasswordRef.current.value)
                    .then(() => {
                        setAlert(true);
                    })
                    .catch((error) => {
                        errorRef.current.innerText = { error };
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
                Change Password
            </button>
            <Modal
                closeButton
                aria-labelledby="change-password-modal"
                open={visible}
                onClose={() => setVisible(false)}
            >
                <Modal.Header>
                    <h1 className="text-xl font-medium">Change Password</h1>
                </Modal.Header>
                <Modal.Body>
                    <Input.Password
                        width="100%"
                        clearable
                        color="black"
                        type="password"
                        label="Current Password"
                        placeholder="Your Current Password"
                        ref={currentPasswordRef}
                    />
                    <Input.Password
                        width="100%"
                        clearable
                        color="black"
                        type="password"
                        label="New Password"
                        placeholder="New Password"
                        ref={newPasswordRef}
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
                            className="w-full rounded-xl bg-neutral-200 py-2 text-neutral-800 hover:bg-neutral-300"
                        >
                            Discard
                        </button>
                        <button
                            onClick={changePassword}
                            className="w-full rounded-md bg-neutral-800 py-2 font-medium text-gray-100 hover:bg-neutral-900 "
                        >
                            Change
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
            <Alert
                show={showAlert}
                setShow={setAlert}
                type="success"
                message="Password Updated."
            />
        </>
    );
};

export default ChangePassword;
