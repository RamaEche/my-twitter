/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./index.html",
   "./src/**/*.{js,jsx}",
 ],
 theme: {
   extend: {},
   fontFamily:{
     'arial' : ['arial', 'sans-serif']
   },
   colors:{
     'background' : 'var(--color-background)',
     'background-1' : 'var(--color-background-1)',
     'background-2' : 'var(--color-background-2)',
     'background-3':'var(--color-background-3)',
     'background-4':'var(--color-background-4)',
     'background-5' : 'var(--color-background-5)',
     'background-6' : 'var(--color-background-6)',
     
     'accent' : "var(--color-accent)",
     'accent-1' : "var(--color-accent-1)",
     'accent-2' : "#A0C5DF",
     
     'soft-white' : '#eeeeee',
     'twitter' : '#1D9BF0',
     'red' : "#F4212E"
   }
 },
 plugins: [],
}