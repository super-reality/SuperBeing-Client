import axios from "axios";
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Link } from "react-router-dom";
import AgentEditor from "./AgentEditor";
import Chat from './Chat';
import doCORSRequest from "./ImageRequester";

const AIEditor = () => {
  //Editor IDs: 0 -> x, 1 -> y, 2 -> z
  const [currentEditor, setCurrentEditor] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const [agents, setAgents] = useState([]);
  const [currentAgentData, setCurrentAgentData] = useState(null);

  const test = [ "t", "e", "s", "t" ];
  if (firstLoad) {
    axios.get(`${process.env.VITE_SERVER_CONNECTION_URL}/get_agents`).then(res => {
      agents.splice(0, agents.length);
      for(let i = 0; i < res.data.length; i++) {
        agents.push(res.data[i]);
      }
      setFirstLoad(false);
    });
  }

  return (
    <div className="App">
      { currentEditor === 0 ? (
      <div>
      <button><Link to="/" className="btn btn-primary">back</Link></button>
        { firstLoad ? (
          <h1>Loading...</h1>
        ) : (
          <h1>Agents:</h1> 
          )}
          {agents.map((agent, idx) => {
            return (
              <div
                key={idx}
              >
              <button onClick={() => { 
                axios.get(`${process.env.VITE_SERVER_CONNECTION_URL}/get_agent?agent=${agent}`).then(res => {
                  res.data.agentName = agent;
                  setCurrentAgentData(res.data);
                  setCurrentEditor(1);
                });
              }}>{agent}</button>
              </div>
            );
          })}
      </div>
      ) : (
        <AgentEditor data={currentAgentData} handleClick={() => {setCurrentEditor(0); setCurrentAgentData(null);} } />
      )}
    </div>
  );
};

export default AIEditor;
