import React, { useState } from "react";
import axios from "axios";
import { Wave } from "better-react-spinkit";
import ScrollToBottom from "react-scroll-to-bottom";
import AnimatedTypingText from "./AnimatedTypingText";
import { senderName } from "./Home";

import backButton from "./assets/svg/ArrowLeft.svg";

const Chat = ({ agentImage, agentName, handleClick, startingMessage }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [firstLoad, setFirstLoad] = useState(false);
  const [firstMessage, setFirstMessage] = useState(false);
  const [typing, setTyping] = useState(false);

  const sendMessage = async () => {
    if (!agentName) {
      console.log("Not sending message, not yet connected");
    }
    setTyping(true);

    if (currentMessage) {
      const messageData = {
        message: currentMessage,
        isAgent: false,
      };

      const body = {
        sender: senderName,
        agent: agentName,
        command: currentMessage,
      };
      axios
        .post(`${process.env.VITE_SERVER_CONNECTION_URL}/execute`, body)
        .then((res) => {
          console.log("response is", res);
          const messageData = {
            message: (res && res.data && res.data.result) || agentName,
            isAgent: true,
          };
          setMessageList((list) => [...list, messageData]);
          setTyping(false);
        });

      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  if (firstLoad === false && agentName) {
    const messageData = {
      message: startingMessage,
      isAgent: true,
    };
    setMessageList((list) => [...list, messageData]);
    setFirstLoad(true);
    setFirstMessage(true);
  }

  return (
    <div className="chat-window">
      <div className="chat-title">
        <img
          className="chat-back"
          src={backButton}
          onClick={() => handleClick()}
        />
        {agentName && (
          <div className="chat-talking-to">
            Talking to <b>{agentName}</b>
          </div>
        )}
      </div>

      <div className="chat-body">
        {firstMessage ? (
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent, idx) => {
              return (
                <div className="message" key={idx}>
                  {messageContent.isAgent ? (
                    <div className="message-content-agent">
                      <img src={agentImage} className="image-chat" />
                      <div className="message-text">
                        {messageContent.message}
                      </div>
                    </div>
                  ) : (
                    <div className="message-content-user">
                      <div className="message-text">
                        {messageContent.message}
                      </div>
                      <img src="User_Icon.svg" className="image-chat" />
                    </div>
                  )}
                </div>
              );
            })}
          </ScrollToBottom>
        ) : (
          <>
            <Wave
              className="loadingSpinner"
              size={100}
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
          </>
        )}
      </div>
      {firstMessage ? (
        <div className="chat-footer">
          {typing ? (
            <i style={{ marginBottom: "8px" }}>
              <AnimatedTypingText text={agentName + " is typing"} />
            </i>
          ) : null}
          <div className="mainInput" style={{ width: "100%" }}>
            <input
              type="text"
              name="message"
              placeholder="What would you like to say?"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Chat;
