const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                garamond: ['EB Garamond'],
                catamaran: ['Catamaran', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
