import type { AppProps } from "next/app";
import { ApolloProvider } from "../components/ApolloProvider";
import { useInitializeAuth } from "@/store/auth";

export default function App({ Component, pageProps }: AppProps) {
  useInitializeAuth();
  return (
    <ApolloProvider>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
