const blue = "#07c";

export const theme = {
  breakpoints: ["40em", "52em", "64em"],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  colors: {
    blue,
    lightgray: "#f6f6ff",
    text: "rgb(68, 68, 68)",
    thread_bg: "#3f3c62",
    thread_header: "#2e2d52",
    thread_footer: "#474b7b",
    thread_text: "#b2b2d8",
    thread_selected: "#373658",
    chat_header: "#5d5c8d", //#5d5c8e
    chat_placeholder: "#b2b2d8", // #504aa4
    thread_placeholder: "#e1ddff",
    chat_icon: "#ccc6f2",
    chat_bg: "#ddddf7", //#ccc6f2
    chat_bubble_me: "#849ffe",
    chat_bubble_them: "#fff"
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    main: "montserrat, sans-serif",
    mono: "Menlo, monospace"
  },
  shadows: {
    small: "0 0 4px rgba(0, 0, 0, .125)",
    large: "0 0 24px rgba(0, 0, 0, .125)",
    special: "0 0 16px 4px rgba(0, 0, 0, .125)"
  },
  radii: {
    card: "17px"
  },
  buttons: {
    primary: {
      color: "#fff",
      backgroundColor: blue
    },
    outline: {
      color: "text",
      backgroundColor: "#dedcf7",
      // boxShadow: "inset 0 0 0 2px",
      border: "2px rebeccapurple solid",
      borderRadius: 20
    },
    gradient: {
      backgroundImage:
        "linear-gradient( 87deg, rgb(210,48,120) 6%, rgb(254,97,97) 74%, rgb(255,121,85) 100%)",

      boxShadow: "0px 10px 27px 0px rgba(0, 0, 0, 0.1);"
    }
  },
  borders: {
    crimson: "2px crimson dashed",
    lime: "2px limegreen dashed",
    purp: "2px rebeccapurple dashed",
    primary: "1px #ccc solid"
  },
  variants: {
    card: {
      p: 2,
      bg: "white",
      boxShadow: "card",
      borderRadius: 2
    },
    badge: {
      display: "inline-block",
      p: 1,
      color: "white",
      bg: "primary",
      borderRadius: 2
    },
    minshew: {
      color: "#fff",
      backgroundColor: "yellow",
      boxShadow: "inset 0 0 0 2px",
      border: "2px limegreen solid"
    }
  }
};
