import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import backButton from "./ArrowLeft.svg";

const App = () => {
  const [formInputs, setFormInputs] = useState({ agentName: '' });
  const [showChat, setShowChat] = useState(false);

  const { agentName } = formInputs;

  const onChange = (e) =>
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });

  const startConversation = () => {
    if (agentName) {
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
          <Chat agentName={agentName} />
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
