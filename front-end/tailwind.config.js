/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        se: "375px",
        //iphone SE

        xr: "414px",
        //iphone XR

        pro: "390px",
        // iph 12 pro

        pix: "393px",
        // pixel

        sg: "360px",
        // samsung galaxy

        su: "412px", 
        // samsung ultra

        gf: "280px",
        // galaxy fold
        
        a51: "412px",
        // samsung a51

        ss: "361px",
        // => @media (min-width: 640px) { ... }

        fs: "200px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
      },

    },
    colors: {
      white: "#FFFFFF",
      yellow: "#F9EC1F",
      pastelyellow: "#FFFF99",
      brown: "#DDAD42",
      lightbrown: "#DDAD41",
      blue: "#66CBEC",
      lightblue: "#BBEEFF",
      black: "#000000",
      lightgray: "#F2F2F2",
      lightgreen:"#DCFFC0",
      gray: "#C4C4C4",
      mediumgray: "#6A6A6A",
      buttonblack: "#25221B",
      buttonblackhover: "#3b362b",
      buttonyellow: "#FFFF99",
      darkgray: "#1E201E",
      grayinput: "#25221B",
      pink: "#F9CECE",
      green: "#DCFFC0"
    },
  },
  plugins: [],
}