import React from 'react';

function Order({ ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <g data-name="vuesax/linear/box" transform="translate(-108 -188)">
                <g strokeLinecap="round" strokeLinejoin="round">
                    <path d="M111.17 195.44l8.83 5.11 8.77-5.08"></path>
                    <path d="M120 209.61v-9.07" data-name="Vector"></path>
                    <path
                        d="M117.93 190.48l-5.34 2.96a4.719 4.719 0 00-2.2 3.73v5.65a4.719 4.719 0 002.2 3.73l5.34 2.97a4.792 4.792 0 004.15 0l5.34-2.97a4.719 4.719 0 002.2-3.73v-5.65a4.719 4.719 0 00-2.2-3.73l-5.34-2.97a4.758 4.758 0 00-4.15.01z"
                        data-name="Vector"
                    ></path>
                </g>
            </g>
        </svg>
    );
}

export default Order;
