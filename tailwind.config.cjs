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
     'black' : '#000000',
     'soft-black' : '#111111',
     'super-soft-black':'#333333',
     'mega-soft-black':'#777777',
     'mygray':"#16181C",
     'mygray-soft':"#6e6e6e",
     'white' : '#ffffff',
     'soft-white' : '#eeeeee',
     'twitter' : "#1D9BF0",
     'twitter-gray' : "#A0C5DF",
     'min-soft-black' : '#080808',
     'red' : "#F4212E"
   }
 },
 plugins: [],
}