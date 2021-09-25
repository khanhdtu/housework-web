import "../styles.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "theme-ui";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { IoProvider } from "socket.io-react-hook";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import { theme } from "../theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

function HouseWorkApplication({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <IoProvider>
          <ThemeProvider theme={theme}>
            <ToastContainer />
            <Component {...pageProps} />
            {process.env.SHOW_REACT_QUERY_DEV_TOOLS && <ReactQueryDevtools />}
          </ThemeProvider>
        </IoProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
export default HouseWorkApplication;
