import React, { useState } from "react";

export default function Home() {
        
    const [agentName, setAgentName] = useState("");

    // If agent state has not been set
    // Show form to enter agent name

    return(
        <>
        { agentName == ""
        <div>No agent set</div>
        }
        { agentName != ""
        <div>Hello {agentName}!</div>
        }
        </>
    )
}