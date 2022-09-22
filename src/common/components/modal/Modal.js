import { forwardRef, useState, useImperativeHandle } from 'react';

const Modal = ({ children }, ref) => {
    const [visible, setVisible] = useState(false);
    const handleModal = () => {
        setVisible(!visible);
    };

    useImperativeHandle(
        ref,
        () => ({
            handler: () => handleModal(),
        }),
        [handleModal]
    );

    return <>{visible && children}</>;
};

export default forwardRef(Modal);
