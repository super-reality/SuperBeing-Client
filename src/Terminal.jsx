import axios from "axios";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Terminal from "terminal-in-react";
import React from "react";

function App() {
  const endpoint = "http://localhost:65533";
  const [isConnected, setIsConnected] = useState(false);

  const [senderName, setSenderName] = useState("");
  const [agentName, setAgentName] = useState("");
  const ref = useRef("Thales Agent Chat");

  function MessageTerminal (props) {
    return(
    <Terminal
    startState="maximised"
    color="green"
    hideTopBar={true}
    allowTabs={false}
    backgroundColor="black"
    barColor="black"
    style={{ fontWeight: "bold", fontSize: "1em" }}
    commands={{
    }}
    description={{
    }}
    msg={props.message}
    commandPassThrough={handleCommand}
  />)
  }

  useEffect(() => {
    if (!isConnected) {
      connectWithServer();
    }
    if(senderName == ""){
      ref.current ="Please enter your name";
    } else if(agentName == ""){
      ref.current ="Connecting";

    } else
    if (isConnected) {
      ref.current ="Connected to " + agentName;

    }
  }, [isConnected, agentName, senderName]);

  const connectWithServer = () => {
    const socket = io(endpoint, {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      setIsConnected(true);
    });
  };

  const handleCommand = (input) => {
    if(senderName == ""){
      setSenderName(input);
      const body = { sender: senderName, command: "GET_AGENT_NAME"  };
      axios.post(`${process.env.VITE_SERVER_CONNECTION_URL}/execute`, body).then(res => {
        setAgentName(res.data.result);
      });
    }
      // TODO: Handle sender
      const body = { sender:senderName, command: input.join(" ") };
      axios.post(`${process.env.VITE_SERVER_CONNECTION_URL}/execute`, body).then(res => {
        console.log("response is", res);
        console.log(agentName + " > " + res.data.result);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "black",
      }}
    >
{ senderName == "" &&
        <MessageTerminal message={"Please enter your name"} />
}
{ senderName != "" && agentName == "" &&
        <MessageTerminal message={"Connecting to agent..."} />
}
{ senderName != "" && agentName != "" &&
        <MessageTerminal message={"Connected to " + agentName} />
}
    </div>
  );
  
}

export default App;
