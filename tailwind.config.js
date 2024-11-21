/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    colors: {
      primary: '#ffffff',
      gold: '#FFD700',
    },
    animation: {
      'spin-slow': 'spin 15s linear infinite',
      pulse: 'pulse 4s infinite',
      slide: 'slide 10s linear infinite',
    },
    keyframes: {
      pulse: {
        '0%, 100%': { opacity: 0.6 },
        '50%': { opacity: 1 },
      },
      slide: {
        '0%': { transform: 'translateX(-50%)' },
        '100%': { transform: 'translateX(50%)' },
      },
    },
  },
};
export const plugins = [];
