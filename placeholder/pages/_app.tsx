import '../styles/globals.css'
import '../styles/MentorTalk.css'
import '../styles/utilityClasses.css'
import '../styles/components/QuizNavigationButtons.css'
import '../styles/SignIn.css'
import '../styles/IconMessage.css'
import type { AppProps } from 'next/app'
import theme from '../theme'
import { ChakraProvider, NumberInputStepper } from '@chakra-ui/react'

import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from "../redux/store"


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp