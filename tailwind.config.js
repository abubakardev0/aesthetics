const { keyframes } = require('@nextui-org/react');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        extend: {
            fontFamily: {
                garamond: ['EB Garamond'],
                catamaran: ['Catamaran', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                hero: 'hero 8s',
                text: 'slideUp 1s',
                textRight: 'slideRight 1s ease infinite',
                opacity: 'opacity 2s',
                spinning: 'spinning 12s linear infinite',
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
                spinning: {
                    '0%': {
                        transform: 'rotate(0deg)',
                    },
                    '100%': {
                        transform: 'rotate(360deg)',
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
                slideRight: {
                    from: {
                        transform: 'translate3d(0px, 0px, 0)',
                    },
                    to: {
                        transform: 'translate3d(20px, 0px, 0)',
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
