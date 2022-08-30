import { useClientPrincipal } from "@aaronpowell/react-static-web-apps-auth";
import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { OtherPlayers } from "../components/OtherPlayers";
import { AddPlayerScreenDocument } from "../schema";

const JoinGame = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const clientPrincipal = useClientPrincipal();
  const [name, setName] = useState("");
  const [addPlayerToGame, { loading, data }] = useMutation(
    AddPlayerScreenDocument
  );

  useEffect(() => {
    if (data) {
      navigate(`/game/waiting/${id}`);
    }
  }, [data, id, navigate]);

  useEffect(() => {
    if (clientPrincipal.loaded && clientPrincipal.clientPrincipal) {
      setName(clientPrincipal.clientPrincipal.userDetails);
    }
  }, [clientPrincipal]);

  if (!id) {
    return <Navigate to="/" replace={true} />;
  }

  if (!clientPrincipal.loaded) {
    return (
      <div>
        <h1>Loading user info</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Join the game: {id}</h1>
      <div>
        <label htmlFor="name">Enter your name </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <button
          disabled={!name || loading}
          onClick={() =>
            addPlayerToGame({
              variables: { id: id, name },
            })
          }
        >
          Join the game
        </button>
        {import.meta.env.VITE_MULTIPLAYER && <OtherPlayers id={id} />}
      </div>
    </div>
  );
};

export default JoinGame;
