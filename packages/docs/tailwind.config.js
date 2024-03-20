/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    maxWidth: {
      954: '954px',
    },
    borderRadius: {
      8: '8px',
      20: '20px',
    },
    gap: {
      20: '20px',
    },
    colors: {
      white: '#FFFFFF',
      blue: {
        100: '#E9F3FF',
        200: '#d6e9ff',
        500: '#1781FE',
      },
    },
    spacing: {
      8: '8px',
      14: '14px',
      20: '20px',
      25: '25px',
      40: '40px',
      60: '60px',
      100: '100px',
      400: '400px',
    },
    fontSize: {
      20: '20px',
      22: '22px',
      26: '26px',
      38: '38px',
      44: '44px',
      54: '54px',
    },
    fontWeight: {
      400: '400',
      600: '600',
      700: '700',
      800: '800',
    },
    extend: {},
  },
  plugins: [],
};
