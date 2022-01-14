import React from "react";
import { 
     Route, Routes 
} from "react-router-dom";
import Home from "../../views/Home/Home";
import Terminal from "../../views/Terminal/Terminal";
import AIEditor from "../../AIEditor";
import ConfigEditor from "../../ConfigEditor";

export default ( () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="terminal" element={<Terminal/>}/>
            <Route path="/editor" element={<AIEditor />} />
           <Route path="/config" element={<ConfigEditor />} />
        </Routes>
    )
})