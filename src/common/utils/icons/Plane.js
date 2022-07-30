import React from 'react';

const Plane = ({ width, height }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width || 40}
            height={height || 40}
            viewBox="0 0 23.76 26.917"
        >
            <path
                fill="#707070"
                d="M20.459.365l-5.31 3.469-13.994 9.143a2.68 2.68 0 00.264 4.516l5.3 2.487v4.437c0 2.439 2.747 3.444 4.019 1.5l2.032-3.107 5.193 2.429a2 2 0 001.944-.137 2.56 2.56 0 001.109-1.814l2.761-20.352C24.06.828 22.064-.681 20.459.365zM8.951 24.417v-3.4l1.7.794zm9.865-1.509l-7.137-3.338 6.506-10.635c.5-.815-.441-1.761-1.1-1.115l-9.814 9.689-5-2.345 19.3-12.618z"
                data-name="Paper Plane"
                transform="translate(-.043 -.025)"
            ></path>
        </svg>
    );
};
export default Plane;
