import { Collapse } from '@nextui-org/react';

export default function Details({ description, certificates }) {
    return (
        <section className="container mx-auto px-3 py-6 md:px-0 md:py-16">
            <div className="mb-5 flex w-full flex-col items-center justify-center space-y-5 md:mb-10">
                <Collapse
                    title="About This Artwork"
                    expanded
                    bordered
                    className="w-full md:w-3/5 lg:w-1/2"
                >
                    <p>{description ? description : 'No Description'}</p>
                </Collapse>
                <Collapse
                    title="Additional Details"
                    bordered
                    className="w-full md:w-3/5 lg:w-1/2"
                >
                    <h4 className="text-xl font-medium">Certificates</h4>
                    <p>
                        {certificates
                            ? 'It is a certified piece of artwork'
                            : 'It is not certified piece of artwork'}
                    </p>
                </Collapse>
            </div>
        </section>
    );
}
