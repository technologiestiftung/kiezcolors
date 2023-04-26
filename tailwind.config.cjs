const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
    colors: {
      gray: {
        100: "#EDEDED",
        200: "#E0E0E0",
        300: "#C7C7C7",
        400: "#ADADAD",
        500: "#949494",
      },
      primary: "#2f2fa2",
      secondary: "#f64c72",
      white: "#ffffff",
    },
    fontFamily: {
      outfit: [""],
    },
  },

  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2f2fa2",

          secondary: "#f64c72",

          accent: "#37CDBE",

          neutral: "#3D4451",

          "base-100": "#FFFFFF",

          info: "#3ABFF8",

          success: "#36D399",

          warning: "#FBBD23",

          error: "#F87272",
        },
      },
    ],
  },
};

module.exports = config;
