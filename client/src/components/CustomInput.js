import React from "react";
import { ChatAutoComplete, useMessageInputContext } from "stream-chat-react";
import { useLeaveGame } from "./LeaveGame";

function CustomInput() {

  const { handleSubmit } = useMessageInputContext();
  const leaveGame = useLeaveGame();

  return (
    <div className="str-chat__input-flat str-chat__input-flat--send-button-active">
      <div className="str-chat__input-flat-wrapper">
        <div className="str-chat__input-flat--textarea-wrapper">
          <ChatAutoComplete />
        </div>
        <div className="action-Button">
          <button className="sendMessage-button" onClick={handleSubmit}> Send Message</button>
          <button className="leaveGame-button" onClick={leaveGame}> Leave Game</button>
        </div>
      </div>
    </div>
  );
}

export default CustomInput;
