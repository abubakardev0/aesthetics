import React from 'react';

function Home({ ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <g
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                transform="translate(2.4 2)"
            >
                <path d="M6.679 14.135h5.815" data-name="Stroke 1"></path>
                <path
                    d="M0 11.713c0-5.631.614-5.238 3.919-8.3C5.365 2.246 7.615 0 9.558 0s4.237 2.235 5.7 3.41c3.305 3.065 3.918 2.672 3.918 8.3C19.172 20 17.213 20 9.586 20S0 20 0 11.713z"
                    data-name="Stroke 2"
                ></path>
            </g>
        </svg>
    );
}

export default Home;
