/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors:{
        //Adding the variables we create into root tailwind.js to tell tailwind to make use of our css variables
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        negative: 'var(--color-negative)',
        positive: 'var(--color-positive)',
        'primary-background': 'var(--background-primary)',
        'sec-background': 'var(background-sec)',
        'primary-text': 'var(--color-text-primary)'
      },
    },
    backgroundColor: (theme) => ({
      ...theme('colors')
    })
  },
  variants: {
    backgroundColor: ['active']
  },
  plugins: [],
}

