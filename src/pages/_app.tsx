import { SessionProvider as NextAuthProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";

import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";

import "../../public/assets/fonts/styles.css";
import { GlobalStyles } from "../styles/global-styles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <NextNProgress color={theme.colors.info} height={10} />
        <Component {...pageProps} />;
        <GlobalStyles />
      </ThemeProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
