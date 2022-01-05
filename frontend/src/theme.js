import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Encode Sans",
    body: "Roboto",
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: "Roboto",
        fontWeight: "500",
      },
    },
  },
  styles: {
    global: {
      body: {
        bgColor: "#e8e9ef",
      },
      html: {
        height: "100%",
        overflowX: "hidden",
        overflowY: "hidden",
      },
      a: {
        textDecor: "none",
      },
    },
  },
});

export default theme;
