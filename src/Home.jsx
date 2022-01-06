import React, { useState } from 'react';
import Chat from './Chat';
import backButton from "./ArrowLeft.svg";
import axios from "axios";
import doCORSRequest from "./ImageRequester";
import ReactPlayer from 'react-player';

const App = () => {
  const [formInputs, setFormInputs] = useState({ agentName: '' });
  const [pageState, setPageState] = useState(0);
  const [agentImage, setAgentImage] = useState(null);

  let { agentName } = formInputs;

  const sendMessage = async (agentName) => {
    const body = { agent:agentName, command: "/become " + agentName };
    axios.post(`${process.env.VITE_SERVER_CONNECTION_URL}/execute`, body).then(res => {
      doCORSRequest(`https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages&piprop=original&titles=${res.data.keyword}`, (data) => { 
        if (!data || data.length <= 0) {
          data = '/Logo.jpg';
        }

        console.log('data: ' + data);
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

  const startConversationFromImage = (ai_name) => {
    agentName = ai_name;
    startConversation();
  }

  return (
    <div className="App">
      <img src='SuperReality_Background.svg' alt='background' />
      {pageState === 2 ? (
        <div className="ChatWrapper">
          <img src='/Logo.jpg' className="logo-small" />
          <div className="TalkingTo">Talking to <b>{agentName}</b></div>

          <div className="back">
            <img src={backButton} onClick={() => setPageState(0)} />
          </div>
          <Chat agentImage={agentImage} agentName={agentName} />
          </div>
      ) : (pageState === 0 || pageState === null || pageState === undefined) ? (
        <div className="joinChatContainer">
            <img src="/Logo.jpg" className="logo-big" />
            <img
          alt="Ellipse3745209"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjQxJyBoZWlnaHQ9Jzk0JyB2aWV3Qm94PScwIDAgMjQxIDk0JyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPgo8ZyBmaWx0ZXI9J3VybCgjZmlsdGVyMF9mXzUyMF85KSc+CjxlbGxpcHNlIGN4PScxMjAuNScgY3k9JzQ3JyByeD0nOTAuNScgcnk9JzE3JyBmaWxsPScjMDc5QkVEJyBmaWxsLW9wYWNpdHk9JzAuMycvPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSdmaWx0ZXIwX2ZfNTIwXzknIHg9JzAnIHk9JzAnIHdpZHRoPScyNDEnIGhlaWdodD0nOTQnIGZpbHRlclVuaXRzPSd1c2VyU3BhY2VPblVzZScgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSdzUkdCJz4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0nMCcgcmVzdWx0PSdCYWNrZ3JvdW5kSW1hZ2VGaXgnLz4KPGZlQmxlbmQgbW9kZT0nbm9ybWFsJyBpbj0nU291cmNlR3JhcGhpYycgaW4yPSdCYWNrZ3JvdW5kSW1hZ2VGaXgnIHJlc3VsdD0nc2hhcGUnLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMTUnIHJlc3VsdD0nZWZmZWN0MV9mb3JlZ3JvdW5kQmx1cl81MjBfOScvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K"
          className='svg1'
        />
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
          <br/><br/><br/><br/>
          <b>Try talking to these AIs</b>
          <br/><br/>
          <center>
          <table>
            <tr>
              <td><img src='tree.png' alt='ai' className='ai-img' onClick={() => { startConversationFromImage('tree') }} /></td>
              <td><img src='sunflower.png' alt='ai' className='ai-img' onClick={() => { startConversationFromImage('sunflower') }} /></td>
              <td><img src='rabbit.png' alt='ai' className='ai-img' onClick={() => { startConversationFromImage('rabbit') }} /></td>
              <td><img src='ant.png' alt='ai' className='ai-img' onClick={() => { startConversationFromImage('ant') }} /></td>
              <td><img src='rainbow.png' alt='ai' className='ai-img' onClick={() => { startConversationFromImage('rainbow') }} /></td>
              <td><img src='earth.png' alt='ai' className='ai-img' onClick={() => { startConversationFromImage('earth') }} /></td>
            </tr>
            <tr>
              <td><img src='socrates.png' alt='ai' className='ai-img' onClick={() => { startConversationFromImage('socrates') }} /></td>
              <td><img src='galileo.png' alt='ai' className='ai-img' onClick={() => { startConversationFromImage('Galileo') }} /></td>
              <td><img src='tesla.png' alt='ai' className='ai-img' onClick={() => { startConversationFromImage('Nikola Tesla') }} /></td>
              <td><img src='newton.png' alt='ai' className='ai-img' onClick={() => { startConversationFromImage('Isaac Newton') }} /></td>
              <td><img src='ada.png' alt='ai' className='ai-img' onClick={() => { startConversationFromImage('Ada Lovelace') }} /></td>
              <td><img src='rosalind.png' alt='ai' className='ai-img' onClick={() => { startConversationFromImage('Rosalind Franklin') }} /></td>
            </tr>
            <tr>
              <td><img src='energy.png' alt='ai' className='ai-img' onClick={() => { startConversationFromImage('Mass–energy equivalence') }} /></td>
              <td><img src='atom.png' alt='ai' className='ai-img' onClick={() => { startConversationFromImage('atom') }} /></td>
              <td><img src='caffeine.png' alt='ai' className='ai-img' onClick={() => { startConversationFromImage('caffeine') }} /></td>
              <td><img src='cell.png' alt='ai' className='ai-img' onClick={() => { startConversationFromImage('cell (biology)') }} /></td>
              <td><img src='sun.png' alt='ai' className='ai-img' onClick={() => { startConversationFromImage('sun') }} /></td>
              <td><img src='sr.png' alt='ai' className='ai-img' onClick={() => { }} /></td>
            </tr>
          </table>
          <br/><br/><br/><br/>
          <ReactPlayer url='https://www.youtube.com/watch?v=Ar54k0sMWe0' />
          </center>
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
