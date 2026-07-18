/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          deep: '#201333',
          mid: '#2c1d47',
          soft: '#402a5c',
        },
        gold: {
          DEFAULT: '#eab958',
          soft: '#f3d48a',
        },
        blush: '#f0a6c8',
        sage: '#93ac86',
        cream: {
          DEFAULT: '#fbf3e6',
          dim: '#d9c9e8',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'cursive'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
