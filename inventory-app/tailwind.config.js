module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-navy': '#001E6C',
        'primary-blue': '#0F52BA',
        danger: '#D92027',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
