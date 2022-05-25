import { DataSource } from "apollo-datasource";
import { ModelType } from "../types";
import type { IPlayerDataSource, PlayerModel } from "../types";

export class PlayerDataSource extends DataSource implements IPlayerDataSource {
  constructor(private players: PlayerModel[]) {
    super();
  }

  getPlayer(id: string): Promise<PlayerModel | undefined> {
    return Promise.resolve(this.players.find((u) => u.id === id));
  }
  createPlayer(
    id: string,
    name: string,
    identityProvider: string,
    userDetails: string,
    userRoles: string[]
  ): Promise<PlayerModel> {
    const existing = this.players.find((u) => u.name === name);

    if (existing) {
      return Promise.resolve(existing);
    }

    const player: PlayerModel = {
      modelType: ModelType.Player,
      id,
      name,
      identityProvider,
      userDetails,
      userRoles,
    };

    this.players.push(player);

    return Promise.resolve(player);
  }
}
