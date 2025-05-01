import type { AppProps } from "next/app";
import { ApolloProvider } from "../components/ApolloProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
