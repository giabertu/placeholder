import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'monospace',
        boxSizing: 'border-box'
      },
      h1: {
        fontWeight: 900,
        fontSize: '1.2rem'
      },
    }
  },
  config,
 
  
})

export default theme;