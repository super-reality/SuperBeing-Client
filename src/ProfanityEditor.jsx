import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ProfanitySelectedEditor from "./ProfanitySelectedEditor";

const ProfanityEditor = () => {
  const [editor, setEditor] = useState(0);

  return (
    <div className="App">
      <div>
      <button><Link to="/" className="btn btn-primary">back</Link></button>
        { editor === 0 ? (
            <div>
                <h1>Profanity Editor</h1>
                <button onClick={() => setEditor(1)}>Bad Words</button><br/><br/>
                <button onClick={() => setEditor(2)}>Sensitive Words</button><br/><br/>
                <button onClick={() => setEditor(3)}>Sensitive Phrases</button><br/><br/>
                <button onClick={() => setEditor(4)}>Leading Statements</button><br/><br/>
            </div>
        ) : (
            <div>
                <button onClick={() => setEditor(0)}>Back</button>
                <ProfanitySelectedEditor editorId={editor} /> 
            </div>
        )}
         
      </div>
    </div>
  );
};

export default ProfanityEditor;
