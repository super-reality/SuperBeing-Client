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
    setStartingMessage(res.data.defaultGreeting);
    const resp = await axios.get(`${process.env.VITE_SERVER_CONNECTION_URL}/get_agent_image`, {
      params:
      {
        agent: res.data?.result?.title ? res.data.result.title : body.agent
      }
    })

    let _res = resp.data
    if (!_res || _res.length <= 0) {
      _res = "/Logo.png";
    }

    setFormInputs({ agentName: agentName });
    setAgentImage(_res);
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

      {
        pageState > 0 && (
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
        )
      }
      <div className="About-company" id="About_Us">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 text-center wow fadeInLeft animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <div className="about_img"><img className="img-fluid" src="/src/assets/images/about-us-img.png " /></div>
            </div>
            <div className="col-lg-7 common-padding wow fadeInRight animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <h4 className="gradient-text mb-0">About us</h4>
              <h1 className="black-heading">Our Vision and Mission</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leopulvinar dapibus leo. dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo orem ipsum dolor sit ame orem ipsum dolor sit amet , luctus nec ullamcorper mattis, pulvinar dapibus leo orem ipsum dolor sit ame orem ipsum dolor sit amet</p>
              <ul className="gradient-arrow list-unstyled mt-4 mb-0 d-flex flex-column">
                <li><img className="img-fluid" src="/src/assets/images/gradient-arrow.png " /><p>Branding the latest marketing agency</p></li>
                <li> <img className="img-fluid" src="/src/assets/images/gradient-arrow.png " /><p>Branding the latest marketing agency</p></li>
                <li> <img className="img-fluid" src="/src/assets/images/gradient-arrow.png " /><p>Branding the latest marketing agency</p></li>
                <li> <img className="img-fluid" src="/src/assets/images/gradient-arrow.png " /><p>Branding the latest marketing agency</p></li>
                <li> <img className="img-fluid" src="/src/assets/images/gradient-arrow.png " /><p>Branding the latest marketing agency</p></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="Our-AI" className="joinChatContainer text-center common-padding">
        <div className="container">
          <div className="row wow fadeInDown animated" data-wow-duration="1000ms" data-wow-delay="600ms">
            <div className="col-12">
              <div className="mainInput">
                <div className="search-bar">
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
                  <img className="img-fluid" src="/src/assets/images/gradient-search.png" onClick={startConversation} />
                </div>
                <h1 className="black-heading wow fadeInUp animated mb-5" data-wow-duration="1000ms" data-wow-delay="800ms">Try talking to these AIs</h1>
              </div>

            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <div className="ais-container">
                <AiImage
                  back={antImage}
                  name="Ant"
                  onClick={() => startConversationFromImage("ant")}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <div className="ais-container">
                <AiImage
                  back={treeImage}
                  name="Tree"
                  onClick={() => startConversationFromImage("tree")}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <div className="ais-container">
                <AiImage
                  back={rainbowImage}
                  name="Rainbow"
                  onClick={() => startConversationFromImage("rainbow")}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <div className="ais-container">
                <AiImage
                  back={sunflowerImage}
                  name="Sunflower"
                  onClick={() => startConversationFromImage("sunflower")}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <div className="ais-container">
                <AiImage
                  back={rabbitImage}
                  name="Rabbit"
                  onClick={() => startConversationFromImage("rabbit")}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <div className="ais-container">
                <AiImage
                  back={earthImage}
                  name="Earth"
                  onClick={() => startConversationFromImage("earth")}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <div className="ais-container">
                <AiImage
                  back={socratesImage}
                  name="Socrates"
                  onClick={() => startConversationFromImage("socrates")}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <div className="ais-container">
                <AiImage
                  back={galileoImage}
                  name="Galileo"
                  onClick={() => startConversationFromImage("galileo")}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <div className="ais-container">
                <AiImage
                  back={teslaImage}
                  name="Tesla"
                  onClick={() => startConversationFromImage("Nikola Tesla")}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <div className="ais-container">
                <AiImage
                  back={newtonImage}
                  name="Isaac Newton"
                  onClick={() => startConversationFromImage("Isaac Newton")}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <div className="ais-container">
                <AiImage
                  back={adaImage}
                  name="Ada Lovelace"
                  onClick={() => startConversationFromImage("Ada Lovelace")}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <div className="ais-container">
                <AiImage
                  back={rosalindImage}
                  name="Rosalind Franklin"
                  onClick={() => startConversationFromImage("Rosalind Franklin")}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <div className="ais-container">
                <AiImage
                  back={energyImage}
                  name="Mass-energy equivalence"
                  onClick={() =>
                    startConversationFromImage("Mass-energy equivalence")
                  }
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <div className="ais-container">
                <AiImage
                  back={atomImage}
                  name="Atom"
                  onClick={() => startConversationFromImage("atom")}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <div className="ais-container">
                <AiImage
                  back={caffeineImage}
                  name="Caffeine"
                  onClick={() => startConversationFromImage("caffeine")}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <div className="ais-container">
                <AiImage
                  back={cellImage}
                  name="Cell"
                  onClick={() => startConversationFromImage("cell")}
                />
              </div>

            </div>

          </div>
        </div>
      </div>

      <div id="Our-Work" className="Our-Work">
        <div className="container">
          <div className="row common-padding align-items-center">

            <div className="col-lg-6 text-center wow fadeInLeft animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <div className="video">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=Ar54k0sMWe0"
                />
                <img src="/src/assets/images/we-work-img.png" />
              </div>
            </div>
            <div className="col-lg-6 pt-4 pt-lg-0 ps-lg-5 wow fadeInRight animated animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <h4 className="gradient-text mb-0">Videos</h4>
              <h1 className="black-heading">How we work</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leopulvinar dapibus leo. dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo orem ipsum dolor sit ame orem ipsum dolor sit amet , luctus nec ullamcorper mattis, pulvinar dapibus leo orem ipsum dolor sit ame orem ipsum dolor sit amet</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer" id="Contact-Us"> 
      <div className="container">
        <div className="row common-padding">
          <h1 className="text-center black-heading wow mb-5 fadeInDown animated" data-wow-duration="1000ms" data-wow-delay="600ms">Connect With Us</h1>
          <div className="col-lg-3 col-md-6 wow fadeInDown animated" data-wow-duration="1000ms" data-wow-delay="800ms"><a className="discord" href="#"><img src="/src/assets/images/discord.png "/></a></div>
          <div className="col-lg-3 col-md-6 wow fadeInDown animated" data-wow-duration="1000ms" data-wow-delay="1000ms"><a className="fb" href="#"><img src="/src/assets/images/fb.png" /></a></div>
          <div className="col-lg-3 col-md-6 wow fadeInDown animated" data-wow-duration="1000ms" data-wow-delay="1200ms"><a className="telegram" href="#"><img src="/src/assets/images/telegram.png" /></a></div>
          <div className="col-lg-3 col-md-6 wow fadeInDown animated" data-wow-duration="1000ms" data-wow-delay="1400ms"><a className="twitter" href="#"><img src="/src/assets/images/twitter.png" /></a></div>
  
        </div>
      </div>
    </footer>

    <a href="#" id="back-to-top" title="Back to top">&uarr;</a>

    </div>

  );
};

export default App;
