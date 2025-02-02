const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,js}" ],
  theme: {
    extend: {
      colors: {
        "off-white": {
          100: "#FDFEFF",
          300: "#F5F5F7",
          500: "#DFDFDF"
        },
        "educate-blue": {
          100: "#EBF2FE",
          300: "#8E92BC",
          500: "#2A59B6",
          700: "#0A2F78",
          900: "#5DD29B" // accent
        },
      },
      fontFamily: {
        plain: [ "Poppins", "sans-serif" ],
        components: [ "Plus Jakarta Sans", "sans-serif" ],
      },
      keyframes: {
        throb: {
          '50%': { transform: 'scale(1.125)' }
        },
        "slide-left": {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        "slide-right": {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
      },
      animation: {
        throb: 'throb 0.75s',
        "slide-left": 'slide-left 0.75s',
        "slide-right": 'slide-right 0.75s',
      }
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        ".v-rotate": {
          transform: "rotateX(180deg)"
        },
        ".preserve-3d": {
          transformStyle: "preserve-3d"
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden"
        },
        ".perspective": {
          perspective: "1000px"
        }
      })
    }),
    require('@tailwindcss/typography')
  ],
}

