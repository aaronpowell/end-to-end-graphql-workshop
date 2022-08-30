import { HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

export const createLink = () => {
  const httpLink = new HttpLink({
    uri: `${
      import.meta.env.VITE_GRAPHQL_HTTP_ENDPOINT || window.location.origin
    }/api/graphql`,
  });

  console.log(import.meta.env);

  if (!import.meta.env.VITE_MULTIPLAYER) {
    return httpLink;
  }

  const swaCookie = document.cookie.split("; ").reduce<Record<string, string>>(
    (obj, cookie) => ({
      ...obj,
      [cookie.split("=")[0]]: cookie.split("=").slice(1).join("="),
    }),
    {}
  )["StaticWebAppsAuthCookie"];

  const wsLink = new GraphQLWsLink(
    createClient({
      url: `${import.meta.env.VITE_GRAPHQL_WS_ENDPOINT}/api/graphql`,
      connectionParams: {
        swaCookie,
      },
    })
  );

  return split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );
};
