import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post("http://localhost:5000/generate", { message });
      setResponse(res.data.response);
    } catch (err) {
      console.error("Error generating response", err);
      setError("An error occurred while generating the response.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat with TextGenie</h1>
        <br></br>
        <br></br>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            cols="50"
            placeholder="Enter your message here..."
          />
          <br />
          <br></br>
          <button type="submit">Generate</button>
        </form>
        
        <h2>Response:</h2>
        <p>{response}</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
    </div>
  );
}

export default App;
