/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
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
      brown: "#873A21",
      lightbrown: "#DDAD42",
      blue: "#80C9E8",
      black: "#000000",
      offwhite: "#F5F5F5",
    },
  },
  plugins: [],
}