import React from 'react';

import ErrorIcon from '@/icons/Error';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.log({ error, errorInfo });
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="grid h-screen w-screen place-content-center overflow-hidden">
                    <ErrorIcon
                        className="h-16 w-16 place-self-center"
                        strokeWidth={2}
                    />
                    <p>
                        For some reason, we couldn't load. We're quite sorry
                        about this!
                    </p>
                    <button
                        type="button"
                        onClick={() => this.setState({ hasError: false })}
                        className="mt-4 w-fit place-self-center rounded-sm border border-[#2d2d2d] px-5 py-2 transition-colors duration-300 hover:bg-[#2d2d2d] hover:text-white"
                    >
                        Try again?
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
