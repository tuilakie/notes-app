"use client";

import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/lib/apollo";

interface IGraphQlProviderProps {
  children: React.ReactNode;
}

export const GraphQlProvider: React.FC<IGraphQlProviderProps> = ({
  children,
}) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
