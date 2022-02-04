import axios from "axios";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import Chat from "./Chat";
import { isJson } from "./utils";
import { v4 as uuidv4 } from "uuid";

export const id = uuidv4();
export const senderName = "Guest_" + id;

import treeImage from "./assets/images/tree.png";
import sunflowerImage from "./assets/images/sunflower.png";
import rabbitImage from "./assets/images/rabbit.png";
import antImage from "./assets/images/ant.png";
import rainbowImage from "./assets/images/rainbow.png";
import earthImage from "./assets/images/earth.png";
import socratesImage from "./assets/images/socrates.png";
import galileoImage from "./assets/images/galileo.png";
import teslaImage from "./assets/images/tesla.png";
import newtonImage from "./assets/images/newton.png";
import adaImage from "./assets/images/ada.png";
import rosalindImage from "./assets/images/rosalind.png";
import energyImage from "./assets/images/energy.png";
import atomImage from "./assets/images/atom.png";
import caffeineImage from "./assets/images/caffeine.png";
import cellImage from "./assets/images/cell.png";
import sunImage from "./assets/images/sun.png";
import shakespeareImage from "./assets/images/shakespeare.png";
import AiImage from "./AiImage";

const App = () => {
  const [formInputs, setFormInputs] = useState({ agentName: "" });
  const [pageState, setPageState] = useState(0);
  const [agentImage, setAgentImage] = useState(null);
  const [startingMessage, setStartingMessage] = useState("");

  const sendMessage = async (agentName) => {
    const body = {
      agent: agentName,
      command: "/become " + agentName,
      speaker: senderName,
      id: id,
    };
    const res = await axios.post(
      `${process.env.VITE_SERVER_CONNECTION_URL}/execute`,
      body
    );
    setStartingMessage(res.data.startingMessage);
    var x = new XMLHttpRequest();
    x.open(
      "GET",
      (process.env.VITE_SERVER_CORS_URL.endsWith("/")
        ? process.env.VITE_SERVER_CORS_URL
        : process.env.VITE_SERVER_CORS_URL + "/") +
        `https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages&piprop=original&titles=${
          res.data?.result?.title ? res.data.result.title : body.agent
        }`
    );
    x.onload = x.onerror = function () {
      let res = "";
      if (
        x &&
        x.responseText &&
        x.responseText.length > 0 &&
        isJson(x.responseText)
      ) {
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
        res = "/Logo.png";
      }

      setFormInputs({ agentName: agentName });
      setAgentImage(res);
    };
    x.send();
  };

  const onChange = (e) =>
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });

  const startConversation = async () => {
    if (formInputs.agentName !== null && formInputs.agentName !== "") {
      setPageState(1);
      await sendMessage(formInputs.agentName);
      setPageState(2);
      setFormInputs({ agentName: "" });
    }
  };

  const startConversationFromImage = async (ai_name) => {
    setPageState(1);
    await sendMessage(ai_name);
    setPageState(2);
  };

  return (
    <div className="App">
      <img
        src="SuperReality_Background.svg"
        style={{ position: "absolute" }}
        width="100%"
        alt="background"
      />
      {pageState > 0 && (
        <div className="ChatWrapper">
          <Chat
            agentImage={agentImage}
            handleClick={() => {
              window.location.reload(false);
              setPageState(0);
            }}
            agentName={formInputs.agentName}
            startingMessage={startingMessage}
          />
        </div>
      )}
      {pageState === 0 && (
        <div className="joinChatContainer">
          <img src="/Logo.png" className="logo-big" />
          <div className="mainInput">
            <input
              type="text"
              placeholder="Who or what do you want to talk to?"
              name="agentName"
              value={formInputs.agentName}
              onKeyPress={(event) => {
                event.key === "Enter" && startConversation();
              }}
              onChange={onChange}
            />
            <button onClick={startConversation} />
          </div>
          <div style={{ marginTop: "2em" }}>
            <b>Try talking to these AIs</b>
          </div>
          <div className="ais-container">
            <AiImage
              back={treeImage}
              name="Tree"
              onClick={() => startConversationFromImage("tree")}
            />
            <AiImage
              back={sunflowerImage}
              name="Sunflower"
              onClick={() => startConversationFromImage("sunflower")}
            />
            <AiImage
              back={rabbitImage}
              name="Rabbit"
              onClick={() => startConversationFromImage("rabbit")}
            />
            <AiImage
              back={antImage}
              name="Ant"
              onClick={() => startConversationFromImage("ant")}
            />
            <AiImage
              back={rainbowImage}
              name="Rainbow"
              onClick={() => startConversationFromImage("rainbow")}
            />
            <AiImage
              back={earthImage}
              name="Earth"
              onClick={() => startConversationFromImage("earth")}
            />
            <AiImage
              back={socratesImage}
              name="Socrates"
              onClick={() => startConversationFromImage("socrates")}
            />
            <AiImage
              back={galileoImage}
              name="Galileo"
              onClick={() => startConversationFromImage("galileo")}
            />
            <AiImage
              back={teslaImage}
              name="Tesla"
              onClick={() => startConversationFromImage("Nikola Tesla")}
            />
            <AiImage
              back={newtonImage}
              name="Isaac Newton"
              onClick={() => startConversationFromImage("Isaac Newton")}
            />
            <AiImage
              back={adaImage}
              name="Ada Lovelace"
              onClick={() => startConversationFromImage("Ada Lovelace")}
            />
            <AiImage
              back={rosalindImage}
              name="Rosalind Franklin"
              onClick={() => startConversationFromImage("Rosalind Franklin")}
            />
            <AiImage
              back={energyImage}
              name="Mass-energy equivalence"
              onClick={() =>
                startConversationFromImage("Mass-energy equivalence")
              }
            />
            <AiImage
              back={atomImage}
              name="Atom"
              onClick={() => startConversationFromImage("atom")}
            />
            <AiImage
              back={caffeineImage}
              name="Caffeine"
              onClick={() => startConversationFromImage("caffeine")}
            />
            <AiImage
              back={cellImage}
              name="Cell"
              onClick={() => startConversationFromImage("cell (biology)")}
            />
            <AiImage
              back={sunImage}
              name="Sun"
              onClick={() => startConversationFromImage("sun")}
            />
            <AiImage
              back={shakespeareImage}
              name="Shakespeare"
              onClick={() => startConversationFromImage("shakespeare")}
            />
          </div>
          <ReactPlayer
            style={{
              margin: "3em auto",
              maxWidth: "100%",
              width: "100%",
            }}
            url="https://www.youtube.com/watch?v=Ar54k0sMWe0"
          />
        </div>
      )}
    </div>
  );
};

export default App;
