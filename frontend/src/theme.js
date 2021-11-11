import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  // fonts: {
  //   heading: "Montserrat",
  //   body: "Noto Sans",
  // },
  // components: {
  //   Button: {
  //     baseStyle: {
  //       fontFamily: "Noto Sans"
  //     }
  //   }
  // },
  
  styles: {
    global: {
      body: {
        bgImage: "url(wavebg.svg)",
        bgRepeat: "no-repeat",
        bgSize: "cover",
        backgroundAttachment: "fixed"
      },
      html: {
        height: "100%",
        overflowX: "hidden"
      },
      a: {
        textDecor: "none"
      }
    },
  },
});

export default theme;