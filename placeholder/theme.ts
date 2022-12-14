import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
const theme = extendTheme({
  styles: {
    global: {
      html: {
        overflowY: "overlay",
      },
      body: {
        padding: 0,
        margin: 0,
        fontFamily: 'Consolas',
        boxSizing: 'border-box'
      },
      h1: {
        fontWeight: 900,
        fontSize: '1.2rem'
      },
      svg: {
        display: 'inline',
      }
    }
  },
  config,


})

export default theme;