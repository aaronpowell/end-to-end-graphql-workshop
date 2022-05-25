import { useMutation, useSubscription } from "@apollo/client";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { GameStatusDocument, GameState, StartGameDocument } from "../schema";

const WaitingToStart = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Navigate to="/" replace={true} />;
  }

  const navigator = useNavigate();

  const { data } = useSubscription(GameStatusDocument, {
    variables: { gameId: id },
    onSubscriptionData: (opt) => {
      if (opt.subscriptionData.data?.gameChanged?.state === GameState.Started) {
        navigator(`/game/play/${id}`);
      }
    },
  });

  const [startGame, { loading }] = useMutation(StartGameDocument, {
    variables: { id },
  });

  if (data?.gameChanged.state === GameState.Started) {
    return <Navigate to={`/game/play/${id}`} replace={true} />;
  }

  return (
    <div>
      <h1>Waiting for everyone to join the game</h1>
      <button disabled={loading} onClick={() => startGame()}>
        Start the game
      </button>
    </div>
  );
};

export default WaitingToStart;
