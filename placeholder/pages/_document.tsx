import { ColorModeScript } from "@chakra-ui/react"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import theme from '../theme'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
         {/* <link rel="preconnect" href="https://fonts.googleapis.com"></link>
         <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link> */}
         <link href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap" rel="stylesheet"></link>

        </Head>
          
         
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
