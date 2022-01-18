import axios from "axios";
import {
  Wave
} from 'better-react-spinkit';
import React, { useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { v4 as uuidv4 } from 'uuid';
import backButton from "./ArrowLeft.svg";

const senderName = "Guest_" + uuidv4();

const Chat = ({ agentImage, agentName, handleClick, startingMessage }) => {  
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [firstLoad, setFirstLoad] = useState(false);
  const [firstMessage, setFirstMessage] = useState(false);

  const sendMessage = async () => {
    if(!agentName){
      console.log("Not sending message, not yet connected")
    }
      console.log("agentImage", agentImage)
    if (currentMessage) {
        const messageData = {
            message: currentMessage,
            isAgent: false
          };

    const body = { sender:senderName, agent:agentName, command: currentMessage };
    axios.post(`${process.env.VITE_SERVER_CONNECTION_URL}/execute`, body).then(res => {
      console.log("response is", res);
      const messageData = {
        message: res.data.result,
        isAgent: true
      };
      setMessageList((list) => [...list, messageData]);
    });

      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  if (firstLoad === false && agentName) {
    const messageData = {
      message: startingMessage,
      isAgent: true
    };
    console.log('starting: ' + startingMessage);
    setMessageList((list) => [...list, messageData]);
    setFirstLoad(true);
    setFirstMessage(true);
  }

  return (
    <div className="chat-window">
                <div className="back">
            <img src={backButton} onClick={() => handleClick()} />
          </div>
    {agentName && <div className="TalkingTo">Talking to <b>{agentName}</b></div>}

      <div className="chat-body">
      { firstMessage ? (
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, idx) => {
            return (
              <div
                className="message"
                id={messageContent.isAgent ? 'other' : 'you'}
                key={idx}
              >
                <div>
                    {messageContent.isAgent ? ( 
                      <div className="message-content-agent">
                        <img src={agentImage} className="image-chat-agent" />
                        &nbsp;&nbsp;
                        {messageContent.message}
                      </div>
                    ) : (
                      <div className="message-content-user">     
                        {messageContent.message}
                        &nbsp;&nbsp;               
                        <img src='User_Icon.svg' className="image-chat-user" />  
                      </div>
                    )}
                                    </div>
              </div>
            );
          })}
        </ScrollToBottom>
        ) : (
          <>
          <Wave className="loadingSpinner" size={100} style={{marginLeft:"auto", marginRight:"auto"}} />
        <span style={{width:100, textAlign:"center"}}>Loading...</span>
        </>
        )}
      </div>
      { firstMessage ? (
      <div className="chat-footer">
        <input
          type="text"
          name="message"
          placeholder="What would you like to say?"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        /><button onClick={sendMessage} />
      </div>
    ) : (
      <h1></h1>
    )}
    </div>
  );
};

export default Chat;
