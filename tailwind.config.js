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
            },
        },
    },
    plugins: [],
};
