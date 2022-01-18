import axios from "axios";
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AgentEditor from "./AgentEditor";

const ConfigEditor = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [config, setConfig] = useState(null);
  const [dataUpdated, setDataUpdated] = useState(false);
  const navigate = useNavigate();

  if (firstLoad) {
    axios.get(`${process.env.VITE_SERVER_CONNECTION_URL}/get_config`).then(res => {
        setConfig(res.data.config);
        setFirstLoad(false);  
    });
  }

  const update = async() => {
    if (!dataUpdated) {
        console.log('data is the same');
        return;
    }

    const body = { config: config };
    axios.post(`${process.env.VITE_SERVER_CONNECTION_URL}/update_config`, body).then(res => {
        if (res.data === 'ok') {
          navigate('/');
        } else {
            console.log(res.data);
        }
    });
  }

  return (
    <div className="App">
      <div>
      <button><Link to="/" className="btn btn-primary">back</Link></button>
        { firstLoad ? (
          <h1>Loading...</h1>
        ) : (
            <div>
                <h1>Config:</h1> 
            <form>
                    {config.map((value, idx) => {
                        return (
                        <div
                            key={idx}
                        >
                            <label>{value.key}: 
                                <textarea onChange={(e) => { setDataUpdated(true); config[idx] = {key: value.key, value: e.target.value }}} defaultValue={value.value}></textarea> 
                            </label><br/><br/>
                        </div>
                        );
                })}
                <input type='button' value='Update' onClick={update} />
                </form>
          </div>
        )}
         
      </div>
    </div>
  );
};

export default ConfigEditor;
