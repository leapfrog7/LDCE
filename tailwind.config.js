/** @type {import('tailwindcss').Config} */
module.exports = {
 
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'aobr': "url('../Images/aobr.svg')",
        
      },
    },
  },
  plugins: [],
 
  corePlugins: {
    preflight: false,
},

}
