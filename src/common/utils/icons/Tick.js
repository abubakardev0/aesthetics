function Tick({ stroke = '#010101', ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16.334 2.75H7.665c-3.02 0-4.915 2.14-4.915 5.166v8.168c0 3.027 1.885 5.166 4.915 5.166h8.668c3.031 0 4.917-2.139 4.917-5.166V7.916c0-3.027-1.886-5.166-4.916-5.166z"
                clipRule="evenodd"
            ></path>
            <path
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8.44 12l2.374 2.373 4.746-4.746"
            ></path>
        </svg>
    );
}

export default Tick;
