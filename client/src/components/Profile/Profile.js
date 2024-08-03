import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "../Game";
import CustomInput from "../CustomInput";
import './Profile.css';
import Alert from "../Alert/Alert";

function Profile({logOut}) {

  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertLevel, setAlertLevel] = useState(null);
  const [alertKey, setAlertKey] = useState(0); // Unique key for Alert component

  const createChannel = async () => {
    console.log(channel);
    document.getElementById('join-game-input').value = '';
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) {
      setAlertMessage("User not found");
      setAlertLevel(4); // Warning level
      setAlertKey(prevKey => prevKey + 1); // Update key to force re-render
      
      return;
    } else if(response.users[0].id === client.userID){
      setAlertMessage("Same user");
      setAlertLevel(4); // Warning level
      setAlertKey(prevKey => prevKey + 1); // Update key to force re-render
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };

  return (
    <>      
    <Alert key={alertKey} message={alertMessage} level={alertLevel} /> {/* Add Alert component */}
    
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Game channel={channel} setChannel={setChannel} setRivalUsername={setRivalUsername} />
        </Channel>
      ) : (
        <div className="join-game-container">
          <h1>Welcome {client._user.name}</h1>
          <h4 className="join-game-title">Create Game</h4>
          <input id="join-game-input" className="join-game-input"
            placeholder="Username of rival..."
            onChange={(event) => {
              setRivalUsername(event.target.value);
            }}
          />
          <div className="btnss">
            <button className="join-game-button" onClick={createChannel}>
              Join/Start Game
            </button>
            <button className="logout-button" onClick={logOut}>Logout</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
