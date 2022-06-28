import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { Provider,createClient } from 'urql'
import RouteGuard from '../components/RouteGuard';


const client = createClient({
  url: 'http://localhost:4000/graphql',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
      <RouteGuard>
          <Component {...pageProps} />
      </RouteGuard>
    </ChakraProvider>
    </Provider>
  )
}

export default MyApp
