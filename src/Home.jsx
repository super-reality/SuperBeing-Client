import axios from "axios";
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Link } from "react-router-dom";
import Chat from './Chat';
import { isJson } from "./utils";

const App = () => {
  const [formInputs, setFormInputs] = useState({ agentName: '' });
  const [pageState, setPageState] = useState(0);
  const [agentImage, setAgentImage] = useState(null);
  const [startingMessage, setStartingMessage] = useState('');

  const sendMessage = async (agentName) => {
    const body = { agent:agentName, command: "/become " + agentName };
    const res = await axios.post(`${process.env.VITE_SERVER_CONNECTION_URL}/execute`, body);
    setStartingMessage(res.data.startingMessage);
    var x = new XMLHttpRequest();
    x.open('GET', (process.env.VITE_SERVER_CORS_URL.endsWith('/') ? process.env.VITE_SERVER_CORS_URL : process.env.VITE_SERVER_CORS_URL + '/') + `https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages&piprop=original&titles=${(res?.data?.result?.title ? res.data.result.title : body.agent)}`);
    x.onload = x.onerror = function() {
        let res = '';
            if (x && x.responseText && x.responseText.length > 0 && isJson(x.responseText)) {
            const json = JSON.parse(x.responseText).query;
            if (json) {
                const pages = json.pages;
                if (pages && pages.length > 0) {
                    const original = pages[0].original;
                    if (original) {
                        res = original.source;
                    }
                }
            }
        }
        
        if (!res || res.length <= 0) {
          res = '/Logo.png';
        }

        setFormInputs({ agentName: agentName });
        setAgentImage(res);
    }
    x.send();
  };

  const onChange = (e) => 
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });

  const startConversation = async () => {
    if (formInputs.agentName !== null && formInputs.agentName !== "") {
      setPageState(1);
      await sendMessage(formInputs.agentName);
      setPageState(2);
      setFormInputs({ agentName: '' });
    }
  };

  const startConversationFromImage = async (ai_name) => {
    setPageState(1);
    await sendMessage(ai_name);
    setPageState(2);
  }


  return (
    <div className="App">
      <img src='SuperReality_Background.svg' width="100%" alt='background' />
      {pageState > 0 && (
        <div className="ChatWrapper">
          <Chat agentImage={agentImage} handleClick={() => { window.location.reload(false); setPageState(0); }} agentName={formInputs.agentName} startingMessage={startingMessage} />
          </div>
      )}
      {pageState === 0 && (
        <div className="joinChatContainer">
            <img src="/Logo.png" className="logo-big" />
          <input
            type="text"
            placeholder="Who or what do you want to talk to?"
            name="agentName"
            value={formInputs.agentName}
            onKeyPress={(event) => {
              event.key === 'Enter' && startConversation();
            }}
            onChange={onChange}
          />
          <button onClick={startConversation} />
          <br/><br/><br/><br/>
          <b>Try talking to these AIs</b>
          <br/><br/>
          <center>
          <table>
            <tbody>
            <tr>
              <td><img src='tree.png' alt='ai' className='ai-img' onClick={async () => { await startConversationFromImage('tree') }} /></td>
              <td><img src='sunflower.png' alt='ai' className='ai-img' onClick={async () => { await startConversationFromImage('sunflower') }} /></td>
              <td><img src='rabbit.png' alt='ai' className='ai-img' onClick={async () => { await startConversationFromImage('rabbit') }} /></td>
              <td><img src='ant.png' alt='ai' className='ai-img' onClick={async () => { await startConversationFromImage('ant') }} /></td>
              <td><img src='rainbow.png' alt='ai' className='ai-img' onClick={async () => { await startConversationFromImage('rainbow') }} /></td>
              <td><img src='earth.png' alt='ai' className='ai-img' onClick={async () => { await startConversationFromImage('earth') }} /></td>
            </tr>
            <tr>
              <td><img src='socrates.png' alt='ai' className='ai-img' onClick={async () => { await startConversationFromImage('socrates') }} /></td>
              <td><img src='galileo.png' alt='ai' className='ai-img' onClick={async () => { await startConversationFromImage('Galileo') }} /></td>
              <td><img src='tesla.png' alt='ai' className='ai-img' onClick={async () => { await startConversationFromImage('Nikola Tesla') }} /></td>
              <td><img src='newton.png' alt='ai' className='ai-img' onClick={async () => { await startConversationFromImage('Isaac Newton') }} /></td>
              <td><img src='ada.png' alt='ai' className='ai-img' onClick={async () => { await startConversationFromImage('Ada Lovelace') }} /></td>
              <td><img src='rosalind.png' alt='ai' className='ai-img' onClick={async () => { await startConversationFromImage('Rosalind Franklin') }} /></td>
            </tr>
            <tr>
              <td><img src='energy.png' alt='ai' className='ai-img' onClick={async () => { await startConversationFromImage('Mass–energy equivalence') }} /></td>
              <td><img src='atom.png' alt='ai' className='ai-img' onClick={async () => { await startConversationFromImage('atom') }} /></td>
              <td><img src='caffeine.png' alt='ai' className='ai-img' onClick={async () => { await startConversationFromImage('caffeine') }} /></td>
              <td><img src='cell.png' alt='ai' className='ai-img' onClick={async () => { await startConversationFromImage('cell (biology)') }} /></td>
              <td><img src='sun.png' alt='ai' className='ai-img' onClick={async () => { await startConversationFromImage('sun') }} /></td>
              <td><img src='shakespeare.png' alt='ai' className='ai-img' onClick={async () => { await startConversationFromImage('shakespeare') }} /></td>
            </tr>
            </tbody>
          </table>
          <br/><br/><br/><br/>
          <ReactPlayer url='https://www.youtube.com/watch?v=Ar54k0sMWe0' />
          </center>
          <div className='App'>
          <button><Link to="/editor" className="btn btn-primary">go to agent editor</Link></button>
          <button><Link to="/config" className="btn btn-primary">go to config editor</Link></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
