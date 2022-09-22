const { keyframes } = require('@nextui-org/react');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                garamond: ['EB Garamond'],
                catamaran: ['Catamaran', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                hero: 'hero 8s',
                text: 'slideUp 1s',
                opacity: 'opacity 2s',
            },
            keyframes: {
                hero: {
                    '0%': {
                        transform: 'translate3d(0px, 0, 0) scale(1.1)',
                    },
                    '100%': {
                        transform: 'translate3d(0px, 0, 0) scale(1)',
                    },
                },
                slideUp: {
                    from: {
                        transform: 'translate3d(0px, 20px, 0)',
                    },
                    to: {
                        transform: 'translate3d(0px, 0px, 0)',
                    },
                },
                opacity: {
                    from: {
                        opacity: 0,
                    },
                    to: {
                        opacity: 1,
                    },
                },
            },
        },
    },
    plugins: [],
};
