/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        darkblue: '#110035',
      },
      boxShadow: {
        primary: '0px 0px 40px -8px #110015',
      },
      transitionDuration: '300ms',
      minHeight: {
        modal: '200px',
        input: '36px',
        card: '160px',
      },
      minWidth: {
        modal: '400px',
      },
      maxWidth: {
        input: '200px',
      },
      spacing: {
        cross: '4px',
        arrow: '7px',
      },
    },
  },
  plugins: [],
};
