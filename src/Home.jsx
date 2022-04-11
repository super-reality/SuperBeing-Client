import axios from "axios";
import React, { useCallback, useState } from "react";
import ReactPlayer from "react-player";
import Chat from "./Chat";
import { isJson } from "./utils";
import { v4 as uuidv4 } from "uuid";
export const id = uuidv4();
export const senderName = "Guest_" + id;

import Logo from "/src/assets/images/Logo.png";
import bannerImage from "/src/assets/images/Super-reality-bg.jpg";
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
import gradientArrow from "/src/assets/images/gradient-arrow.png";
import aboutImage from "/src/assets/images/about-us-img.png";
import gradientSearch from "/src/assets/images/gradient-search.png";
import workImage from "/src/assets/images/we-work-img.png";
import discord from "/src/assets/images/discord.png";
import facebook from "/src/assets/images/fb.png";
import telegram from "/src/assets/images/telegram.png";
import twitter from "/src/assets/images/twitter.png";

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
    // const resp = await axios.get(`${process.env.VITE_SERVER_CONNECTION_URL}/get_agent_image`, {
    //   params:
    //   {
    //     agent: res.data?.result?.title ? res.data.result.title : body.agent
    //   }
    // })

    // let _res = resp.data
    // if (!_res || _res.length <= 0) {
    //   _res = "/Logo.png";
    // }

    setFormInputs({ agentName: agentName });
    // setAgentImage(_res);
  };

  const onChange = useCallback(
    (e) => setFormInputs({ ...formInputs, [e.target.name]: e.target.value }),
    [formInputs]
  );

  const startConversation = useCallback(async () => {
    if (formInputs.agentName !== null && formInputs.agentName !== "") {
      setPageState(1);
      await sendMessage(formInputs.agentName);
      setPageState(2);
    }
  }, [formInputs]);

  const startConversationFromImage = async (ai_name, image = "/Logo.png") => {
    setPageState(1);
    setAgentImage(image);
    await sendMessage(ai_name);
    setPageState(2);
  };

  return (
    <div className="App">
      <div className="overlay">
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
      </div>
      <div className="wrapper">
        <header className="main-header">
          <div className="top-bar">
            <div className="container">
              <div className="row">
                <div
                  className="col-6 wow fadeInLeft animated"
                  data-wow-duration="1000ms"
                  data-wow-delay="600ms"
                >
                  <ul className="header-info d-flex list-unstyled mb-0">
                    <li>
                      <a href="#">
                        <i className="fa fa-envelope me-3"></i>Quick Email
                      </a>
                    </li>
                  </ul>
                </div>
                <div
                  className="col-6 wow fadeInRight animated"
                  data-wow-duration="1000ms"
                  data-wow-delay="600ms"
                >
                  <ul className="top-social-icon d-flex list-unstyled justify-content-end mb-0">
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-google-plus" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="banner" id="#home">
            <img src={bannerImage} className="img-fluid" alt="banner image" />
            <nav className="navbar navbar-expand-lg menu-bar">
              <div className="container">
                <div className="row">
                  <div className="menu-wrap d-flex align-items-center">
                    <div className="col-lg-2 full-width">
                      <button
                        type="button"
                        className="navbar-toggler"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                      >
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon mb-0"></span>
                      </button>
                      <div className="website-logo">
                        <img
                          src={Logo}
                          className="img-fluid"
                          alt="this is logo image"
                        />
                      </div>
                    </div>
                    <div
                      id="navbarCollapse"
                      className="col-lg-10 justify-content-end collapse navbar-collapse"
                    >
                      <div className="navbar-nav flex-links">
                        <ul className="navigation-links d-flex list-unstyled mb-0 align-items-center">
                          <li className="nav-item nav-link active">
                            <a href="#home" className="nav-anchor">
                              Home
                            </a>
                          </li>
                          <li className="nav-item nav-link">
                            <a href="#About_Us" className="nav-anchor">
                              About Us
                            </a>
                          </li>
                          <li className="nav-item nav-link">
                            <a href="#Our-AI" className="nav-anchor">
                              Our AI's
                            </a>
                          </li>
                          <li className="nav-item nav-link">
                            <a href="#Our-Work" className="nav-anchor">
                              Videos
                            </a>
                          </li>
                          <li className="nav-item nav-link">
                            <a href="#" className="nav-anchor">
                              Meme Paper
                            </a>
                          </li>
                          <li className="nav-item nav-link">
                            <a href="#" className="nav-anchor">
                              Buy Super
                            </a>
                          </li>
                          <li className="nav-item nav-link">
                            <a href="#Contact-Us" className="nav-anchor">
                              Contact Us
                            </a>
                          </li>
                          <li className="nav-item nav-link Admin">
                            <a href="#">Admin</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <div className="container">
              <div className="row">
                <div className="text">
                  <div
                    className="col-lg-6 col-md-8 wow fadeInLeft animated"
                    data-wow-duration="1000ms"
                    data-wow-delay="600ms"
                  >
                    <div className="text-wrap">
                      <h1 className="heading gradient-text">super reality</h1>
                      <h3 className="tagline">future of eductaion</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </p>
                    </div>
                    <div
                      className="col-lg-6 col-md-4 wow fadeInLeft animated"
                      data-wow-duration="1000ms"
                      data-wow-delay="600ms"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="About-company" id="About_Us">
          <div className="container">
            <div className="row align-items-center">
              <div
                className="col-lg-5 text-center wow fadeInLeft animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="about_img">
                  <img className="img-fluid" src={aboutImage} alt="about" />
                </div>
              </div>
              <div
                className="col-lg-7 common-padding wow fadeInRight animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <h4 className="gradient-text mb-0">About us</h4>
                <h1 className="black-heading">Our Vision and Mission</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo. dolor sit amet, consectetur adipiscing elit. Ut elit
                  tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leopulvinar dapibus leo. dolor sit amet, consectetur
                  adipiscing elit. Ut elit tellus, luctus nec ullamcorper
                  mattis, pulvinar dapibus leo orem ipsum dolor sit ame orem
                  ipsum dolor sit amet , luctus nec ullamcorper mattis, pulvinar
                  dapibus leo orem ipsum dolor sit ame orem ipsum dolor sit amet
                </p>
                <ul className="gradient-arrow list-unstyled mt-4 mb-0 d-flex flex-column">
                  <li>
                    <img
                      className="img-fluid"
                      src={gradientArrow}
                      alt="arrow"
                    />
                    <p>Branding the latest marketing agency</p>
                  </li>
                  <li>
                    {" "}
                    <img
                      className="img-fluid"
                      src={gradientArrow}
                      alt="arrow"
                    />
                    <p>Branding the latest marketing agency</p>
                  </li>
                  <li>
                    {" "}
                    <img
                      className="img-fluid"
                      src={gradientArrow}
                      alt="arrow"
                    />
                    <p>Branding the latest marketing agency</p>
                  </li>
                  <li>
                    {" "}
                    <img
                      className="img-fluid"
                      src={gradientArrow}
                      alt="arrow"
                    />
                    <p>Branding the latest marketing agency</p>
                  </li>
                  <li>
                    {" "}
                    <img
                      className="img-fluid"
                      src={gradientArrow}
                      alt="arrow"
                    />
                    <p>Branding the latest marketing agency</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          id="Our-AI"
          className="joinChatContainer text-center common-padding"
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="mainInput">
                  <div
                    className="search-bar wow fadeInDown animated"
                    data-wow-duration="1000ms"
                    data-wow-delay="600ms"
                  >
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
                    <img
                      className="img-fluid"
                      src={gradientSearch}
                      alt="search"
                      onClick={startConversation}
                    />
                  </div>
                  <h1
                    className="black-heading wow fadeInDown animated mb-5"
                    data-wow-duration="1000ms"
                    data-wow-delay="800ms"
                  >
                    Try talking to these AIs
                  </h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="ais-container">
                  <AiImage
                    back={antImage}
                    name="Ant"
                    onClick={() => startConversationFromImage("ant", antImage)}
                  />
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="ais-container">
                  <AiImage
                    back={treeImage}
                    name="Tree"
                    onClick={() =>
                      startConversationFromImage("tree", treeImage)
                    }
                  />
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="ais-container">
                  <AiImage
                    back={rainbowImage}
                    name="Rainbow"
                    onClick={() =>
                      startConversationFromImage("rainbow", rainbowImage)
                    }
                  />
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="ais-container">
                  <AiImage
                    back={sunflowerImage}
                    name="Sunflower"
                    onClick={() =>
                      startConversationFromImage("sunflower", sunflowerImage)
                    }
                  />
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="ais-container">
                  <AiImage
                    back={rabbitImage}
                    name="Rabbit"
                    onClick={() =>
                      startConversationFromImage("rabbit", rabbitImage)
                    }
                  />
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="ais-container">
                  <AiImage
                    back={earthImage}
                    name="Earth"
                    onClick={() =>
                      startConversationFromImage("earth", earthImage)
                    }
                  />
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="ais-container">
                  <AiImage
                    back={socratesImage}
                    name="Socrates"
                    onClick={() =>
                      startConversationFromImage("socrates", socratesImage)
                    }
                  />
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="ais-container">
                  <AiImage
                    back={galileoImage}
                    name="Galileo"
                    onClick={() =>
                      startConversationFromImage("galileo", galileoImage)
                    }
                  />
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="ais-container">
                  <AiImage
                    back={teslaImage}
                    name="Tesla"
                    onClick={() =>
                      startConversationFromImage("Nikola , teslaImageTesla")
                    }
                  />
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="ais-container">
                  <AiImage
                    back={newtonImage}
                    name="Isaac Newton"
                    onClick={() =>
                      startConversationFromImage("Isaac , newtonImageNewton")
                    }
                  />
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="ais-container">
                  <AiImage
                    back={adaImage}
                    name="Ada Lovelace"
                    onClick={() =>
                      startConversationFromImage("Ada , adaImageLovelace")
                    }
                  />
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="ais-container">
                  <AiImage
                    back={rosalindImage}
                    name="Rosalind Franklin"
                    onClick={() =>
                      startConversationFromImage(
                        "Rosalind , rosalindImageFranklin"
                      )
                    }
                  />
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="ais-container">
                  <AiImage
                    back={energyImage}
                    name="Mass-energy equivalence"
                    onClick={() =>
                      startConversationFromImage(
                        "Mass-, energyImageenergy equivalence"
                      )
                    }
                  />
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="ais-container">
                  <AiImage
                    back={atomImage}
                    name="Atom"
                    onClick={() =>
                      startConversationFromImage("atom", atomImage)
                    }
                  />
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="ais-container">
                  <AiImage
                    back={caffeineImage}
                    name="Caffeine"
                    onClick={() =>
                      startConversationFromImage("caffeine", caffeineImage)
                    }
                  />
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-6 wow zoomIn animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="ais-container">
                  <AiImage
                    back={cellImage}
                    name="Cell"
                    onClick={() =>
                      startConversationFromImage("cell", cellImage)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="Our-Work" className="Our-Work">
          <div className="container">
            <div className="row common-padding align-items-center">
              <div
                className="col-lg-6 text-center wow fadeInLeft animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="video">
                  <ReactPlayer url="https://www.youtube.com/watch?v=Ar54k0sMWe0" />
                  <img src={workImage} alt="work" />
                </div>
              </div>
              <div
                className="col-lg-6 pt-4 pt-lg-0 ps-lg-5 wow fadeInRight animated animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <h4 className="gradient-text mb-0">Videos</h4>
                <h1 className="black-heading">How we work</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo. dolor sit amet, consectetur adipiscing elit. Ut elit
                  tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leopulvinar dapibus leo. dolor sit amet, consectetur
                  adipiscing elit. Ut elit tellus, luctus nec ullamcorper
                  mattis, pulvinar dapibus leo orem ipsum dolor sit ame orem
                  ipsum dolor sit amet , luctus nec ullamcorper mattis, pulvinar
                  dapibus leo orem ipsum dolor sit ame orem ipsum dolor sit amet
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer" id="Contact-Us">
          <div className="container">
            <div className="row common-padding">
              <h1
                className="text-center black-heading wow mb-5 fadeInDown animated"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                Connect With Us
              </h1>
              <div
                className="col-lg-3 col-md-6 wow fadeInDown animated"
                data-wow-duration="1000ms"
                data-wow-delay="800ms"
              >
                <a className="discord" href="#">
                  <img src={discord} alt="discord" />
                </a>
              </div>
              <div
                className="col-lg-3 col-md-6 wow fadeInDown animated"
                data-wow-duration="1000ms"
                data-wow-delay="1000ms"
              >
                <a className="fb" href="#">
                  <img src={facebook} alt="fb" />
                </a>
              </div>
              <div
                className="col-lg-3 col-md-6 wow fadeInDown animated"
                data-wow-duration="1000ms"
                data-wow-delay="1200ms"
              >
                <a className="telegram" href="#">
                  <img src={telegram} alt="telegram" />
                </a>
              </div>
              <div
                className="col-lg-3 col-md-6 wow fadeInDown animated"
                data-wow-duration="1000ms"
                data-wow-delay="1400ms"
              >
                <a className="twitter" href="#">
                  <img src={twitter} alt="twitter" />
                </a>
              </div>
            </div>
          </div>
        </footer>

        <a href="#" id="back-to-top" title="Back to top">
          &uarr;
        </a>
      </div>
    </div>
  );
};

export default App;
