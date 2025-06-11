"use client";

import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_URL,
  });

  const authLink = setContext((_, { headers }) => {
    const token = Cookies.get("accessToken"); // Must be non-httpOnly
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
