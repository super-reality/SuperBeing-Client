import axios from 'axios';
import React, {  } from 'react';
import { useState } from 'react';

const AgentEditor = ({ data, handleClick }) => {  
    const [dataUpdated, setDataUpdated] = useState(false);

    const update = async() => {
        if (!dataUpdated) {
            return;
        }

        const body = { agentName:data.agentName, data: data };
        axios.post(`${process.env.VITE_SERVER_CONNECTION_URL}/update_agent`, body).then(res => {
            if (res.data === 'ok') {
                handleClick();
            } else {
                console.log(res.data);
            }
        });
    }

  return (
      <div>
        <div className="back">
            <img alt='back' onClick={() => handleClick()} />
        </div>
        <center>
            <form>
                <p>Agent: {data.agentName}</p>
                <label>Actions: 
                    <textarea onChange={(e) => { setDataUpdated(true); data.actions = e.target.value}} defaultValue={data.actions}></textarea> 
                </label><br/><br/>
                <label>Dialogue: 
                    <textarea onChange={(e) => { setDataUpdated(true);  data.dialogue = e.target.value}} defaultValue={data.dialogue}></textarea> 
                </label><br/><br/>
                <label>Ethics: 
                    <textarea onChange={(e) => { setDataUpdated(true);  data.ethics = e.target.value}} defaultValue={data.ethics}></textarea> 
                </label><br/><br/>
                <label>Facts: 
                    <textarea onChange={(e) => { setDataUpdated(true);  data.facts = e.target.value}} defaultValue={data.facts}></textarea> 
                </label><br/><br/>
                <label>Monologue: 
                    <textarea onChange={(e) => { setDataUpdated(true);  data.monologue = e.target.value}} defaultValue={data.monologue}></textarea> 
                </label><br/><br/>
                <label>Needs and Motivations:
                    <textarea onChange={(e) => { setDataUpdated(true);  data.needsAndMotivation = e.target.value}} defaultValue={data.needsAndMotivation}></textarea> 
                </label><br/><br/>
                <label>Personality: 
                    <textarea onChange={(e) => { setDataUpdated(true);  data.personality = e.target.value}} defaultValue={data.personality}></textarea> 
                </label><br/><br/>
                <label>Relationship Matrix: 
                    <textarea onChange={(e) => { setDataUpdated(true);  data.relationshipMatrix = e.target.value}} defaultValue={data.relationshipMatrix}></textarea> 
                </label><br/><br/>
                <label>Room: 
                    <textarea onChange={(e) => { setDataUpdated(true);  data.room = e.target.value}} defaultValue={data.room}></textarea> 
                </label><br/><br/>
                <label>Starting Phrases: 
                    <textarea onChange={(e) => { setDataUpdated(true);  data.startingPhrases = e.target.value}} defaultValue={data.startingPhrases}></textarea> 
                </label><br/><br/>
                <label>Ignored Keywords: 
                    <textarea onChange={(e) => { setDataUpdated(true);  data.ignoredKeywords = e.target.value}} defaultValue={data.ignoredKeywords}></textarea> 
                </label><br/><br/>
                <input type='button' value='Update' onClick={update} />
                <input type='button' value='Delete' onClick={() => {
                    axios.post(`${process.env.VITE_SERVER_CONNECTION_URL}/delete_agent`, { agentName:data.agentName }).then(res => {
                        handleClick();
                    });
                 }} />
            </form>
        </center>
      </div>
  );
};

export default AgentEditor;
