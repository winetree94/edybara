/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    borderRadius: {
      8: '8px',
      20: '20px',
    },
    gap: {
      20: '20px',
    },
    colors: {
      yellow: {
        100: '#ffed91',
      },
      black: '#000000',
      white: '#FFFFFF',
      purple: {
        100: '#ece9ff',
        200: '#ffe0e0',
      },
      blue: {
        100: '#E9F3FF',
        200: '#d6e9ff',
        300: '#c3e0ff',
        500: '#1781FE',
      },
    },
    spacing: {
      0: '0',
      8: '8px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
      24: '24px',
      25: '25px',
      30: '30px',
      40: '40px',
      50: '50px',
      60: '60px',
      70: '70px',
      100: '100px',
      250: '250px',
      400: '400px',
    },
    fontSize: {
      16: '16px',
      20: '20px',
      22: '22px',
      24: '24px',
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
    extend: {
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
        // serif: ['Merriweather', 'serif'],
      },
      backgroundSize: {
        100: '100%',
      },
      backgroundImage: {
        'homepage-1': 'url("/img/backgrounds/PC_1-1.png")',
        'homepage-2': 'url("/img/backgrounds/PC_5-1.png")',
      },
    },
  },
  plugins: [],
};
