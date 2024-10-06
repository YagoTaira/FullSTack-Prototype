import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("/messages")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the messages!", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Messages from Backend:</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
