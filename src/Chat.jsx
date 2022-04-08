import React, { useState } from "react";
import axios from "axios";
import { Wave } from "better-react-spinkit";
import ScrollToBottom from "react-scroll-to-bottom";
import AnimatedTypingText from "./AnimatedTypingText";
import { senderName } from "./Home";


import sendImage from '/src/assets/images/send-btn.png';

import singleton from "./speechUtils";

const Chat = ({ agentImage, agentName, handleClick, startingMessage }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [firstLoad, setFirstLoad] = useState(false);
  const [firstMessage, setFirstMessage] = useState(false);
  const [typing, setTyping] = useState(false);
  const [recording, setRecording] = useState(false);

  window.onbeforeunload = () => {
    if (recording && !singleton.getInstance().streamStreaming) {
      singleton.getInstance().socket?.emit("endGoogleCloudStream", "");
    }
  };

  const startRecording = async () => {
    setRecording(true);
    singleton.getInstance().initRecording(async (text) => await sendMessageWithText(text));
  };
  const stopRecording = () => {
    singleton.getInstance().stopRecording();
    setRecording(false);
  };

  const sendMessageWithText = async (msg) => {
    if (!agentName) {
      console.log("Not sending message, not yet connected");
    }
    setTyping(true);

    if (msg) {
      const messageData = {
        message: msg,
        isAgent: false,
      };

      const body = {
        sender: senderName,
        agent: agentName,
        command: msg,
      };
      axios
        .post(`${process.env.VITE_SERVER_CONNECTION_URL}/execute`, body)
        .then((res) => {
          console.log("response is", res);
          const messageData = {
            message: res.data.message || 'error',
            isAgent: true,
          };
          setMessageList((list) => [...list, messageData]);
          setTyping(false);
        });

      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

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
            message: res.data.message || 'error',
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
      <i className="fa fa-times close-btn" aria-hidden="true"
        onClick={() => handleClick()}>
      </i>
      <div className="chat-title">
        {agentName && (
          <div className="chat-talking-to">
            <h1>Talking to <b>{agentName}</b></h1>
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
                      <div className="gradient-border">
                        <img src={agentImage} className="image-chat" />

                        {/* <img src="src/assets/images/ant.png" className="image-chat" /> */}
                      </div>
                      <div className="message-text">
                        {messageContent.message}
                      </div>
                    </div>
                  ) : (
                    <div className="message-content-user">
                      <div className="message-text">
                        {messageContent.message}
                      </div>
                      <div className="gradient-border">
                        <img src="User_Icon.svg" className="image-chat" />
                      </div>
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
            />
          </>
        )}
      </div>
      {firstMessage ? (
        <div className="chat-footer">
          <div className="typing-wrap">
            {typing ? (
              <i style={{ marginBottom: "8px" }}>
                <AnimatedTypingText text={agentName + " is typing"} />
              </i>
            ) : null}
          </div>
          <div className="input-wrap">
            <div className="mainInput">
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
              <button className="send-btn" onClick={sendMessage} >
                <img src={sendImage} />
              </button>
              <br />
            </div>
            <button className="record-btn"
              onClick={recording ? stopRecording : startRecording}
              type="button"
            >
              {!recording ? "Record" : "Stop Recording"}
            </button>
            <br />
          </div>
        </div>
      ) : null}
    </div>

  );
};

export default Chat;
