import '../styles/globals.css'
import '../styles/MentorTalk.css'
import '../styles/utilityClasses.css'
import '../styles/QuizNavigationButtons.css'
import type { AppProps } from 'next/app'
import theme from '../theme'
import { ChakraProvider, NumberInputStepper } from '@chakra-ui/react'
import { setFlagsFromString } from 'v8'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp