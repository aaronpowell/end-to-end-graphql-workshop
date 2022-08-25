import { useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import { StartNewGame } from "../components/StartNewGame";
import { PlayerResultsDocument } from "../schema";

const CompleteGame = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Navigate to="/" replace={true} />;
  }

  const { loading, data } = useQuery(PlayerResultsDocument, {
    variables: {
      gameId: id,
    },
  });

  if (loading || !data) {
    return <h1>Waiting for your answers</h1>;
  }

  return (
    <div>
      <h1>Game over man, game over</h1>
      {data.playerResults.map((result) => {
        return (
          <div key={result.question}>
            <h2>
              {result.correct ? "✅" : "❌"}
              <span
                dangerouslySetInnerHTML={{ __html: result.question }}
              ></span>{" "}
            </h2>
            <ul className="questions">
              {result.answers.map((a) => {
                return (
                  <li
                    key={a}
                    className={`${
                      a === result.submittedAnswer ? "submitted" : ""
                    } ${a === result.correctAnswer ? "correct" : ""}`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: a }}></span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      <StartNewGame />
    </div>
  );
};

export default CompleteGame;
