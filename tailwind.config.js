/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
    screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
    },
    textShadow: {
        'default': '0 0px 2px #00ff00',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.2)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.15)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
        'none': 'none',
    },
    screens: {
        'sm': '576px',
        // => @media (min-width: 576px) { ... }
        'md': '768px',
        // => @media (min-width: 768px) { ... }
        'lg': '992px',
        // => @media (min-width: 992px) { ... }
        'xl': '1200px',
        // => @media (min-width: 1200px) { ... }
    },
    fontFamily: {
        body: ['Roboto'],
        title: ['Murecho']
    },
    keyframes: {
        progressAnimationStrike: {
            '0%': {
                width: '0'
            },
            '100%': {
                width: '100%'
            },
        },
        progressAnimation: {
            '0%': {
                width: '0%',
                backgroundColor: '#b3ffb3',
            },
            '100%': {
                width: '85%',
                backgroundColor: '#00ff00',
            },
        },
    },
    animation: {
        progressAnimationStrike: 'progressAnimationStrike 6s',
        progressAnimation: 'progressAnimation 6s',
        colorAnimation: 'colorAnimation 1s infinite',
    },
    extend: {
        colors: {
            'first': '#353535',
            'second': '#3c6e71',
            'third': '#d9d9d9',
            'fourth': '#284b63',
            'green': '#355070',
            'turquoise': '#6d597a',
            'blue': '#b56576',
            'light-blue': '#e56b6f',
            'purple': '#eaac8b',
            'red': '#ff2d55',
            'transparent': 'transparent !important'
        },
        backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        boxShadow: {
            'items-shadow': '0px 0px 0px 0px rgba(87, 87, 76, 0.06), 8px 11px 30px 0px rgba(87, 87, 76, 0.06), 33px 42px 54px 0px rgba(87, 87, 76, 0.05), 75px 95px 73px 0px rgba(87, 87, 76, 0.03), 133px 169px 86px 0px rgba(87, 87, 76, 0.01), 207px 264px 94px 0px rgba(81, 87, 76, 0.00)'
        }
    },
};
export const plugins = [
    require('@tailwindcss/typography'),
    require('tailwindcss-textshadow'),
];