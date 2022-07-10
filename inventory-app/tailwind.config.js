module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-navy': '#001E6C',
        'primary-blue': '#0F52BA',
        'secondary-blue': '#5089C6',
        danger: '#D92027',
        'ternary-yellow': '#FFAA4C',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
}
