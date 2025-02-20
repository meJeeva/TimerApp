/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'montserrat-rg': 'Montserrat-Regular',
        'montserrat-b': 'Montserrat-Bold',
        'montserrat-sb': 'Montserrat-SemiBold',
        'montserrat-m': 'Montserrat-Medium',
      },
      colors: {
        primary: '#1a8cff',
      },
    },
  },
  plugins: [],
};