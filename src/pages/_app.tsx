import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Loader from "../components/Loader";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Loader />
      <Component {...pageProps} />
    </>
  );
}
