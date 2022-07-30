function Search({ stroke = '#2D2D2D', ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <circle
                cx="11.767"
                cy="11.767"
                r="8.989"
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            ></circle>
            <path
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M18.018 18.485L21.542 22"
            ></path>
        </svg>
    );
}

export default Search;
