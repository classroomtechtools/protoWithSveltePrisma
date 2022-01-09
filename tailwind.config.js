const colors = require('tailwindcss/colors')
console.log(colors.amber)
const production = !process.env.ROLLUP_WATCH;
module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [
  ],
  purge: {
    content: [
       "./src/App.svelte",
    ],
    enabled: production // disable purge in dev
  },
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Roboto', 'serif'],
    },
    colors: {
      amber: colors.amber,
      slate: colors.slate,
      gray: colors.gray,
      sky: colors.sky,
      white: colors.white,
    }
  }
};
