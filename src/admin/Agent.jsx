import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter, isJson } from '../utils';

const Agent = ({ id }) => {
    const [data, setData] = useState([]);
    const [personality, setPersonality] = useState('');
    const [instanceId, setInstanceId] = useState('1');
    const [enabled, setEnabled] = useState({ value: false });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [updated, setUpdated] = useState(true);

    useEffect(async () => {
        const res = await axios.get(`${process.env.VITE_SERVER_CONNECTION_URL}/agentInstance?instanceId=` + id);

        const d = isJson(res.data.clients) ? JSON.parse(res.data.clients) : res.data.clients;
        const _data = []
        _data.splice(0, _data.length);
        for (let i = 0; i < d.length; i++) {
            _data.push(d[i]);
        }
        setData(_data);
        setPersonality(res.data.personality);
        setInstanceId(res.data.id);
        enabled.value = res.data._enabled;
        setIsLoading(false);
    }, [])

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
            enabled: enabled.value
        };
        axios.post(`${process.env.VITE_SERVER_CONNECTION_URL}/agentInstance`, { data: _data }).then(res => {
            if (res.data === 'ok') {
                navigate('/');
            } else {
                console.log(res.data);
            }
        });
    }

    function FormItem({ idx, value }) {
        return (
            <div key={idx} >
                <input type='checkbox' defaultChecked={value.enabled == 'true'} onChange={(e) => {
                    data[idx].enabled = e.target.checked.toString()
                    setUpdated(!updated);
                }}></input>

                <span className="form-item-label">{capitalizeFirstLetter(value.client)}</span>

                { value.enabled == 'true' && 
                    value.settings.map((v2, idx2) => {
                        return (
                            <div key={idx2} >
                                <span className="form-item-label">{v2.name}</span>
                                <textarea defaultValue={v2.value} onChange={(e) => { data[idx].settings[idx2] = { name: v2.name, value: e.target.value } }} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div>
            { isLoading ? 'Loading...' :
             (
                 <div>
            <div className="form-item">
                <span className="form-item-label">Enabled</span>
                    <input type='checkbox' defaultChecked={enabled.value} onChange={(e) => {
                    enabled.value = e.target.checked
                }} />
            </div>

            <div className="form-item">
                <span className="form-item-label">Personality</span>
                <input type='text' defaultValue={personality} onChange={(e) => setPersonality(e.target.value)} />
            </div>

            <div className="form-item">
                <span className="form-item-label">Instance ID</span>
                <input type='text' defaultValue={instanceId} onChange={(e) => { setInstanceId(e.target.value); request(e.target.value) }} />
            </div>

            <div className="form-item">
                <button onClick={() => update()}>Update</button>
                <button onClick={() => _delete()}>Delete</button>
            </div>


            {enabled.value && data.map((value, idx) => {
                return <FormItem idx={idx} value={value} />
            })}
            </div>
            )}
        </div>
    )
}

export default Agent;
