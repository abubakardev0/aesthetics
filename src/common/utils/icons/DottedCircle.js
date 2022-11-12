export default function DottedCircle({ ...props }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" {...props}>
            <circle
                cx="21"
                cy="21"
                r="20.5"
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeDasharray="2, 2"
            ></circle>
        </svg>
    );
}
