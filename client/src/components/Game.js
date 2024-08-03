import React, { useState } from "react";
import Board from "./Board/Board";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import { LeaveGameProvider } from "./LeaveGame";
import "./Chat.css";


function Game({ channel, setChannel, setRivalUsername }) {

  const leaveGame = async () => {
    await channel.stopWatching();
    setChannel(null);
    setRivalUsername("");
  };

  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  if (!playersJoined) {
    return <h2>Waiting for other player to join...</h2>;
  }

  return (
    <LeaveGameProvider leaveGame={leaveGame}>
      <div className="gameContainer">
        <Board result={result} setResult={setResult} />
        <Window>
          <MessageList
            disableDateSeparator
            closeReactionSelectorOnClick
            hideDeletedMessages
            messageActions={["react"]}
          />
          <MessageInput noFiles />
        </Window>
        {result.state === "won" && <div>{result.winner} Won The Game</div>}
        {result.state === "tie" && <div>Game Tied</div>}
      </div>
    </LeaveGameProvider>
  );
}

export default Game;
