import React from 'react';
import { useState } from 'react';

const Prompts = ({ data, handleClick }) => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [dataUpdated, setDataUpdated] = useState(false);

    if (firstLoad) {
        setFirstLoad(false);
        console.log('loaded12345');
    }

    const update = async() => {
    }

    return (
        <div className="agent-editor">
        Prompts
        { firstLoad ? (
          <h1>Loading...</h1>
        ) :  (
        <div>
          <form>
            <div className="form-item">
                <span className="form-item-label">3D World Understanding Prompt</span>
                <textarea style={{ height: 100, width: 800 }} onChange={(e) => { setDataUpdated(true); }} defaultValue={''}></textarea>
            </div>
            <div className="form-item">
                <span className="form-item-label">Fact Summarization Prompt</span>
                <textarea style={{ height: 100, width: 800 }} onChange={(e) => { setDataUpdated(true); }} defaultValue={''}></textarea>
            </div>
            <div className="form-item">
                <span className="form-item-label">Opinion Form Prompt</span>
                <textarea style={{ height: 100, width: 800 }} onChange={(e) => { setDataUpdated(true); }} defaultValue={''}></textarea>
            </div>
            <div className="form-item">
                <span className="form-item-label">XREngine Room Prompt</span>
                <textarea style={{ height: 100, width: 800 }} onChange={(e) => { setDataUpdated(true); }} defaultValue={''}></textarea>
            </div>           

            <input type='button' value='Update' onClick={update} />
          </form>
        </div>
      )}
    </div>
    );
};

export default Prompts;
