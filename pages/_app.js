import axios from "axios";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";

import Layout from "../components/layout/Layout";
import Header from "../components/header/header";
import { getSingleBook } from "./books/[id]";
import "../styles/global.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1 * 60 * 60 * 1000,
      staleTime: 1 * 60 * 60 * 1000,
    },
  },
});

axios.defaults.baseURL = "https://www.themealdb.com/api/json/v1/1/";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (localStorage.getItem("savedBooks")) {
      const savedBooks = JSON.parse(localStorage.getItem("savedBooks"));
      savedBooks.forEach((bookId) => {
        queryClient.prefetchQuery(["singleBook", bookId], getSingleBook);
      });
    } else {
      localStorage.setItem("savedBooks", JSON.stringify([]));
    }
  }, []);

  return (
    <>
      <Header />
      <Head>
        <title>Book Universe</title>
        <meta
          name="description"
          content="Book Universe is a listing website of the books"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontSize: "1.4rem",
            },
          }}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
