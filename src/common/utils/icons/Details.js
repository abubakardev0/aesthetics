function Details({ ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15.716 16.223h-7.22M15.716 12.037h-7.22M11.251 7.86H8.496"
            ></path>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15.909 2.75l-7.69.004c-2.76.017-4.468 1.833-4.468 4.603v9.196c0 2.784 1.722 4.607 4.506 4.607l7.689-.003c2.76-.017 4.47-1.834 4.47-4.604V7.357c0-2.784-1.723-4.607-4.507-4.607z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
}

export default Details;
