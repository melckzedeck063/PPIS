/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '48': '12rem', // 192px
        '64': '16rem', // 256px
        '68' : '17rem',
        '69' : '24rem',
        '70': '36rem',
        '72' : '46rem'
      },
    },
    // screens: {
    //   'xsm' : {'min' : '320px', 'max' : '599px'},
    //   'sm': {'min': '600px', 'max': '767px'},
    //   // => @media (min-width: 640px and max-width: 767px) { ... }

    //   'md': {'min': '768px', 'max': '1023px'},
    //   // => @media (min-width: 768px and max-width: 1023px) { ... }

    //   'lg': {'min': '1024px'},
    //   // => @media (min-width: 1024px and max-width: 1279px) { ... }

    // },

  },
  plugins: [],
}
