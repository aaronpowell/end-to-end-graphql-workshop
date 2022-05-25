import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { cosmosDataSources, inMemoryDataSources } from "./data/index";
import { join } from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { resolvers } from "./resolvers";
import "dotenv/config";
import {
  getUserInfo,
  isAuthenticated,
} from "@aaronpowell/static-web-apps-api-auth";
import { isAuthenticatedDirective } from "./directives/isAuthenticated";
import express from "express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { GraphQLSchema } from "graphql";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import cors from "cors";

const typeDefs = loadFilesSync(join(__dirname, "schema.graphql"));

const { isAuthenticatedDirectiveTransformer, isAuthenticatedTypeDefs } =
  isAuthenticatedDirective("isAuthenticated");

const schema = makeExecutableSchema({
  typeDefs: [...typeDefs, isAuthenticatedTypeDefs],
  resolvers,
});

async function startApolloServer(baseSchema: GraphQLSchema) {
  const app = express();
  app.use(cors());
  const httpServer = http.createServer(app);

  const schema = isAuthenticatedDirectiveTransformer(baseSchema);

  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: "/api/graphql",
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer(
    {
      schema,
      context: (ctx) => {
        const swaCookie = ctx.connectionParams?.swaCookie;

        const req = { headers: { "x-ms-client-principal": swaCookie } };

        return {
          dataSources: cosmosDataSources(),
          user: getUserInfo(req),
          isAuthenticated: isAuthenticated(req),
        };
      },
    },
    wsServer
  );

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    context: ({ req }) => ({
      user: getUserInfo(req),
      isAuthenticated: isAuthenticated(req),
    }),
    dataSources: cosmosDataSources,
  });
  await server.start();
  server.applyMiddleware({ app, path: "/api/graphql" });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(schema);
