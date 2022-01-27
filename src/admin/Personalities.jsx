import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Personality from "./Personality";
import NewPersonality from "./NewPersonality";

const AIEditor = () => {
  const [currentEditor, setCurrentEditor] = useState(0);
  const [agents, setAgents] = useState();
  const [currentAgentData, setCurrentAgentData] = useState(null);

  useEffect(() => {
    console.log("loading");
    if (!agents) {

    axios.get(`${process.env.VITE_SERVER_CONNECTION_URL}/get_agents`).then(res => {
      console.log("res is", res)
      let newAgents = [];
      for(let i = 0; i < res.data.length; i++) {
        newAgents.push(res.data[i]);
      }
      setAgents(newAgents);

      axios.get(`${process.env.VITE_SERVER_CONNECTION_URL}/get_agent?agent=${newAgents[0]}`).then(res => {
        res.data.agentName = newAgents[0];
        setCurrentAgentData(res.data);
      });
    });
  } else {
    console.log("agents", agents);
  }
}, [agents])

  return (
    <div className="App">
      <div>
        { !agents ? (
          <h1>Loading...</h1>
        ) :  (
          <div>
          <h1>Agents:</h1> 
          <select name="agents" id="agents" onChange={(event) => { 
            const agent = agents[event.target.options.selectedIndex];
            setCurrentAgentData(null);
            axios.get(`${process.env.VITE_SERVER_CONNECTION_URL}/get_agent?agent=${agent}`).then(res => {
              res.data.agentName = agent;
              setCurrentAgentData(res.data);
            });
          }}>
            {agents.map((agent, idx) =>
              <option value={agent} key={idx}>{agent}</option>
          )}
          </select>
          </div>
          )}
          {currentAgentData &&
          <Personality data={currentAgentData} handleClick={(e) => {e.preventDefault(); setCurrentAgentData(null);} } />
          }
      </div>
    </div>
  );
};

export default AIEditor;
