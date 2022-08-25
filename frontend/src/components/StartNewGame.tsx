import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateGameDocument } from "../schema";

export const StartNewGame = () => {
  const [creating, setCreating] = useState(false);
  const [createGame, { loading, called, data, error }] =
    useMutation(CreateGameDocument);

  const navigate = useNavigate();

  useEffect(() => {
    if (creating) {
      createGame();
    }
  }, [creating, createGame]);

  useEffect(() => {
    if (!loading && called && !error && data && data.createGame) {
      navigate(`/game/join/${data.createGame.id}`);
    } else if (error) {
      console.error(error);
    }
  }, [loading, called, data, error, navigate]);

  return (
    <button disabled={creating} onClick={() => setCreating(true)}>
      Start a new game
    </button>
  );
};
