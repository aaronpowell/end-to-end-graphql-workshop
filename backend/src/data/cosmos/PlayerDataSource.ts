import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { ApolloContext } from "../../apolloContext";
import { ModelType } from "../types";
import type { IPlayerDataSource, PlayerModel } from "../types";

export class PlayerDataSource
  extends CosmosDataSource<PlayerModel, ApolloContext>
  implements IPlayerDataSource
{
  async getPlayer(id: string) {
    return await this.findOneById(id);
  }

  async createPlayer(
    id: string,
    name: string,
    identityProvider: string,
    userDetails: string,
    userRoles: string[]
  ) {
    const existing = await this.findManyByQuery({
      query: "SELECT TOP 1 * FROM c WHERE c.id = @id AND c.modelType = @type",
      parameters: [
        { name: "@id", value: id },
        { name: "@type", value: ModelType.Player },
      ],
    });

    if (existing.resources[0]) {
      return existing.resources[0];
    }

    const player: PlayerModel = {
      modelType: ModelType.Player,
      id,
      name,
      identityProvider,
      userDetails,
      userRoles,
    };

    const savedUser = await this.createOne(player);

    if (savedUser.statusCode !== 201 || !savedUser.resource) {
      throw "Failed to save user";
    }

    return savedUser.resource;
  }
}
