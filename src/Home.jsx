import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import backButton from "./ArrowLeft.svg";
import axios from "axios";
import connectionUrl from "./connectionUrl";

const App = () => {
  const [formInputs, setFormInputs] = useState({ agentName: '' });
  const [showChat, setShowChat] = useState(false);
  const [agentImage, setAgentImage] = useState(null);

  const { agentName } = formInputs;

  const sendMessage = async (agentName) => {
    const body = { agent:agentName, command: "/become " + agentName };
    axios.post(`${connectionUrl}/execute`, body).then(res => {
    console.log("res");
      console.log(res);
      if(res.data.image){
        console.log("Has agent image")
        setAgentImage(res.data.image);
      }
    });
  };

  const onChange = (e) =>
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });

  const startConversation = () => {
    if (agentName) {
      sendMessage(agentName);
      // TODO, should have a little fade from UI to this, and maybe loading indicator
      // So request has time to process
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {showChat ? (
        <div className="ChatWrapper">
          <img src="/Logo.jpg" className="logo-small" />
          <div className="TalkingTo">Talking to <b>{agentName}</b></div>

          <div className="back">
            <img src={backButton} onClick={() => setShowChat(false)} />
          </div>
          <Chat agentImage={agentImage} agentName={agentName} />
          </div>
      ) : (
        <div className="joinChatContainer">
            <img src="/Logo.jpg" className="logo-big" />
          <input
            type="text"
            placeholder="Who or what do you want to talk to?"
            name="agentName"
            value={agentName}
            onKeyPress={(event) => {
              event.key === 'Enter' && startConversation();
            }}
            onChange={onChange}
          />
          <button onClick={startConversation} />
        </div>
      )}
    </div>
  );
};

export default App;
