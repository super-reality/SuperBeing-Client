import React, { useState } from 'react';
import Chat from './Chat';
import backButton from "./ArrowLeft.svg";
import axios from "axios";
import doCORSRequest from "./ImageRequester";

const App = () => {
  const [formInputs, setFormInputs] = useState({ agentName: '' });
  const [pageState, setPageState] = useState(0);
  const [agentImage, setAgentImage] = useState(null);

  let { agentName } = formInputs;

  const sendMessage = async (agentName) => {
    const body = { agent:agentName, command: "/become " + agentName };
    axios.post(`${process.env.VITE_SERVER_CORS_URL}/execute`, body).then(res => {
      doCORSRequest(`https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages&piprop=original&titles=${res.data.keyword}`, (data) => { 
        if (!data || data.length <= 0) {
          data = '/Logo.jpg';
        }

        setFormInputs({ agentName: res.data.agentName })
        setAgentImage(data);
        setPageState(2);
      });
    });
  };

  const onChange = (e) =>
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });

  const startConversation = () => {
    if (agentName) {
      sendMessage(agentName);
      setPageState(1);
    }
  };

  return (
    <div className="App">
      {pageState === 2 ? (
        <div className="ChatWrapper">
          <img src={agentImage} className="logo-small" />
          <div className="TalkingTo">Talking to <b>{agentName}</b></div>

          <div className="back">
            <img src={backButton} onClick={() => setPageState(0)} />
          </div>
          <Chat agentImage={agentImage} agentName={agentName} />
          </div>
      ) : (pageState === 0 || pageState === null || pageState === undefined) ? (
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
      ): (
        <div className="joinChatContainer">
            <img src="/Logo.jpg" className="logo-big" />
            <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default App;
