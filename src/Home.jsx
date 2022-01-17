import axios from "axios";
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Link } from "react-router-dom";
import Chat from './Chat';
import doCORSRequest from "./ImageRequester";

const App = () => {
  const [formInputs, setFormInputs] = useState({ agentName: '' });
  const [pageState, setPageState] = useState(0);
  const [agentImage, setAgentImage] = useState(null);

  const sendMessage = async (agentName) => {
    const body = { agent:agentName, command: "/become " + agentName };
    const res = await axios.post(`${process.env.VITE_SERVER_CONNECTION_URL}/execute`, body);
      console.log("response body is", body)
      const imageRes = await axios.post(process.env.VITE_SERVER_CORS_URL +`https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages&piprop=original&titles=${res.data.keyword}`);
      let imageParsedRes;
    console.log("imageRes is", imageRes)
      const pages = imageRes.data.query?.pages;
        if (pages && pages.length > 0) {
            imageParsedRes = pages[0].original?.source;
        }

        if (!imageParsedRes || imageParsedRes.length <= 0) {
          imageParsedRes = '/Logo.png';
        }

        setFormInputs({ agentName: res.data.agentName })
        setAgentImage(imageParsedRes);
  };

  const onChange = (e) =>
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });

  const startConversation = async () => {
    if (formInputs.agentName !== null && formInputs.agentName !== "") {
      setPageState(1);
      await sendMessage(formInputs.agentName);
      setPageState(2);

    }
  };

  const startConversationFromImage = (ai_name) => {
    setFormInputs({agentName: ai_name});
    startConversation();
  }


  return (
    <div className="App">
      <button><Link to="/editor" className="btn btn-primary">go to editor</Link></button>
      <img src='SuperReality_Background.svg' width="100%" alt='background' />
      {pageState > 0 && (
        <div className="ChatWrapper">
          <Chat agentImage={agentImage} handleClick={() => setPageState(0)} agentName={formInputs.agentName} />
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
              <td><img src='shakespeare.png' alt='ai' className='ai-img' onClick={() => { startConversationFromImage('shakespeare') }} /></td>
            </tr>
            </tbody>
          </table>
          <br/><br/><br/><br/>
          <ReactPlayer url='https://www.youtube.com/watch?v=Ar54k0sMWe0' />
          </center>
        </div>
      )}
    </div>
  );
};

export default App;
