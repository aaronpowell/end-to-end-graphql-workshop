import { useSubscription } from "@apollo/client";
import { useState } from "react";
import { PlayerJoinedDocument } from "../schema";

export const OtherPlayers = ({ id }: { id: string }) => {
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  useSubscription(PlayerJoinedDocument, {
    variables: { gameId: id },
    onSubscriptionData: (opts) => {
      const name = opts.subscriptionData.data?.playerJoined?.player.name;
      if (name) {
        setPlayerNames((value) => [...value, name]);
      }
    },
  });

  return (
    <>
      <h2>Your competitors</h2>
      <ul>
        {playerNames.map((player) => (
          <li key={player}>{player}</li>
        ))}
      </ul>
    </>
  );
};
