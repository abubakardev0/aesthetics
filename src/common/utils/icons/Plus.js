const Plus = ({
    fill = 'currentColor',
    stroke = 'currentColor',
    filled,
    size,
    height,
    width,
    label,
    ...props
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke={stroke}
            strokeWidth={2}
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
            />
        </svg>
    );
};

export default Plus;
