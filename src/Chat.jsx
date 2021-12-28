import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import axios from "axios";
import sendButton from "./ArrowRight.svg";

const senderName = "Guest";

const Chat = ({ agentName }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage) {
        const messageData = {
            message: currentMessage,
            isAgent: false
          };

    const body = { sender:senderName, agent:agentName, command: currentMessage };
    axios.post(`http://localhost:65535/execute`, body).then(res => {
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

  return (
    <div className="chat-window">
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, idx) => {
            return (
              <div
                className="message"
                id={messageContent.isAgent ? 'other' : 'you'}
                key={idx}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          name="message"
          placeholder="hello..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        /><button onClick={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
