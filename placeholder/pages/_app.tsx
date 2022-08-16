import '../styles/globals.css'
import '../styles/Page2.css'
import '../styles/utilityClasses.css'
import '../styles/QuizNavigationButtons.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme, NumberInputStepper } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'monospace',
      },
      h1: {
        fontWeight: 900,
        fontSize: '1.2rem'
      },
    }
  },
})


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )

}

export default MyApp
