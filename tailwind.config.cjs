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
     'black' : 'var(--color-background)',
     'white' : 'var(--color-background-1)',
     'soft-black' : 'var(--color-background-2)',
     'mega-soft-black':'var(--color-background-3)',
     'mygray':'var(--color-background-4)',
     'min-soft-black' : 'var(--color-background-5)',
     
     'twitter' : "var(--color-accent)",
     'twitter-gray' : "var(--color-accent-1)",
     
     'soft-white' : '#eeeeee',
     'red' : "#F4212E"
   }
 },
 plugins: [],
}

//var()