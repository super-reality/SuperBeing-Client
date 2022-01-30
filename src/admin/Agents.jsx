import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter, isJson } from '../utils';

const Agents = () => {
    const [firstLoad, setFiratLoad] = useState(true);
    const [data, setData] = useState([]);
    const [personality, setPersonality] = useState('');
    const [instanceId, setInstanceId] = useState('1');
    const [dataUpdated, setDataUpdated] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const navigate = useNavigate();

    const request = async (id) => {
        axios.get(`${process.env.VITE_SERVER_CONNECTION_URL}/get_agent_instances?instanceId=` + id).then(res => {
            const d = isJson(res.data.clients) ? JSON.parse(res.data.clients) : res.data.clients;
            data.splice(0, data.length);
            for(let i = 0; i < d.length; i++) {
                data.push(d[i]);
            }
            setPersonality(res.data.personality);
            setInstanceId(res.data.id);
            console.log(res.data._enabled);
            setEnabled(res.data._enabled.toString() == 'true');
            setFiratLoad(false);
        });
    }

    if (firstLoad) {
        request(1);
    }

    const _delete = () => {
        axios.get(`${process.env.VITE_SERVER_CONNECTION_URL}/delete_agent_instance?instanceId=` + instanceId).then(res => {
            if (res.data === 'ok') {
                navigate('/');
            } else {
                console.log(res.data);
            }
        });
    }

    const update = () => {
        const _data = {
            id: instanceId,
            personality: personality,
            clients: data,
            enabled: enabled
        };
        axios.post(`${process.env.VITE_SERVER_CONNECTION_URL}/update_agent_instances`, { data: _data }).then(res => {
            if (res.data === 'ok') {
                navigate('/');
            } else {
                console.log(res.data);
            }
        });
    }

    <button onClick={() => { _delete(value.key) }}>delete</button>
    return (
        <div className="agent-editor">
            Agents
            <div>
                { firstLoad ? (
                <h1>Loading...</h1>
                ) : (
                    <div>
                        <label>Enabled:
                            <input type='checkbox' defaultChecked={enabled} onChange={(e) => { 
                                        setDataUpdated(true); setEnabled(e.target.checked)}}></input><br/><br/>
                        </label>
                        <label>Personality:
                            <input type='text' defaultValue={personality} onChange={(e) => setPersonality(e.target.value)} />
                        </label><br/><br/><br/><br/>
                        <label>Instance ID:
                            <input type='text' defaultValue={instanceId} onChange={(e) => { setInstanceId(e.target.value); request(e.target.value) }} />
                        </label><br/><br/><br/><br/>
                        <button onClick={() => update()}>Update</button><br/>
                        <button onClick={() => _delete()}>Delete</button>
                        <br/><br/><br/><br/>
                        {data.map((value, idx) => {
                            return (
                            <div
                                key={idx}
                            >
                                <input type='checkbox' defaultChecked={value.enabled == 'true'} onChange={(e) => { 
                                    setDataUpdated(true); data[idx].enabled = e.target.checked.toString()}}></input><label>{capitalizeFirstLetter(value.client)}:</label><br/><br/>
                                    <div>
                                        {value.settings.map((v2, idx2) => {
                                            return (
                                            <div
                                                key={idx2}
                                            >
                                                <label>{v2.name}: 
                                                    { (v2.value?.length > 0 && (v2.value?.toLowerCase() === 'true' || v2.value?.toLowerCase() === 'false')) ? ( 
                                                        <input type='checkbox' id={idx2} name={idx2} defaultChecked={v2.value?.toLowerCase().trim() == 'true' ? true : false} onChange={(e) => {
                                                        setDataUpdated(true); data[idx].settings[idx2] = {name: v2.name, value: (e.target.checked.toString()) }
                                                        }}/>
                                                    ) : (
                                                        <textarea onChange={(e) => { setDataUpdated(true); data[idx].settings[idx2] = { name: v2.name, value: e.target.value }}} defaultValue={v2.value}></textarea> 
                                                    )}  
                                                </label><br/><br/>
                                            </div>
                                            );
                                        })}
                                    </div>
                                <br/><br/>
                            </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Agents;
