import { useState } from 'react';

import Image from 'next/image';
import { Modal } from '@nextui-org/react';

export default function Submission({ winner }) {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <button
                onClick={() => setVisible(true)}
                className="rounded-full border-[2px] border-white bg-white px-5 py-2.5 font-medium text-black transition-colors duration-300 hover:bg-gray-200 active:bg-gray-200"
            >
                View Winner
            </button>
            <Modal
                closeButton
                aria-labelledby="winner-modal"
                open={visible}
                onClose={() => setVisible(false)}
            >
                <Modal.Header>
                    <h3 className="text-lg font-medium">Winner</h3>
                </Modal.Header>
                <Modal.Body>
                    <section className="grid place-content-center gap-3">
                        <div className="relative h-48 w-48 overflow-hidden rounded-md bg-slate-200 drop-shadow-md md:h-60 md:w-60 lg:h-72 lg:w-72 2xl:h-80 2xl:w-80">
                            <Image
                                src={winner.image}
                                layout="fill"
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium capitalize">
                                {winner.title}
                            </h3>
                            <p>
                                by{' '}
                                <span className="capitalize">
                                    {winner.name}
                                </span>
                            </p>
                        </div>
                    </section>
                </Modal.Body>
                <Modal.Footer>Competitions by Aesthetics</Modal.Footer>
            </Modal>
        </>
    );
}
