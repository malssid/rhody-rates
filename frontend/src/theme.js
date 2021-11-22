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
      },
    },
  },
  styles: {
    global: {
      body: {
        bgImage: "url(wavebg.svg)",
        bgRepeat: "no-repeat",
        bgSize: "cover",
        backgroundAttachment: "fixed",
      },
      html: {
        height: "100%",
        overflowX: "hidden",
        overflowY: "hidden"
      },
      a: {
        textDecor: "none",
      },
    },
  },
});

export default theme;
