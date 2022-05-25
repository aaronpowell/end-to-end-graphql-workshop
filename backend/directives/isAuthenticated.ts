import { defaultFieldResolver, GraphQLSchema } from "graphql";
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { AuthenticationError } from "apollo-server-express";
import { ApolloContext } from "../apolloContext";

export function isAuthenticatedDirective(directiveName: string) {
  return {
    isAuthenticatedTypeDefs: `directive @${directiveName} on OBJECT | FIELD_DEFINITION`,
    isAuthenticatedDirectiveTransformer(schema: GraphQLSchema) {
      const typeDirectiveArgumentMaps: Record<
        string,
        Record<string, unknown>
      > = {};
      return mapSchema(schema, {
        // Executes once for each object field definition in the schema
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const directive =
            getDirective(schema, fieldConfig, directiveName)?.[0] ??
            typeDirectiveArgumentMaps[typeName];
          if (directive) {
            const { resolve = defaultFieldResolver } = fieldConfig;

            fieldConfig.resolve = async function (
              source,
              args,
              context: ApolloContext,
              info
            ) {
              if (!context.isAuthenticated) {
                throw new AuthenticationError(
                  "Operation requires an authenticated user"
                );
              }

              return await resolve(source, args, context, info);
            };
            return fieldConfig;
          }
        },

        // Executes once for each enum value definition in the schema
        [MapperKind.TYPE]: (type) => {
          const authDirective = getDirective(schema, type, directiveName)?.[0];
          if (authDirective) {
            typeDirectiveArgumentMaps[type.name] = authDirective;
          }
          return undefined;
        },
      });
    },
  };
}
