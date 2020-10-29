import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { sentJump } from './infrastructure/postJump';
import { Jump } from './domain/Jump';
import { Response as ResponseBack } from './domain/Response';

function App() {

  let form: Jump = {} as Jump;
  form.jumps = []

  let res: ResponseBack = {} as ResponseBack;
  
  const [inputform, setInputForm] = useState(form);
  const [jumps, setJumps] = useState([""]);
  const [resBack, setResBack] = useState(res);
  const [response, setResponse] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const jump: ResponseBack = await sentJump(inputform);
    console.log(jump)
    setResBack({...jump})
    setResponse(true)
  };

  const addInput = () => {
    jumps.push("");
    setJumps([...jumps]);
    setInputForm({ ...inputform, jumps })
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
            <p>Message: </p>
            <input type="text"
                id="message"
                name="message"
                required={true}
                placeholder="My First Jump Message"
                onChange={(event) =>
                  setInputForm({ ...inputform, message: event.target.value })
                }
                value={inputform.message}
            />
            <p>Last Path: </p>
            <input type="text"
                id="last_path"
                name="last_path"
                required={true}
                placeholder="/jump"
                onChange={(event) =>
                  setInputForm({ ...inputform, last_path: event.target.value })
                }
                value={inputform.last_path}
            />
            <p>Jump Path: </p>
            <input type="text"
                id="jump_path"
                name="jump_path"
                required={true}
                placeholder="/jump"
                onChange={(event) =>
                  setInputForm({ ...inputform, jump_path: event.target.value })
                }
                value={inputform.jump_path}
            />
            <p>Jumps: </p>

            {jumps.map((n, i) => (
              <input
                key={i}
                value={n}
                required={true}
                onChange={e => {
                  jumps[i] = e.target.value;
                  setJumps([...jumps]);
                  setInputForm({ ...inputform, jumps })
                }}
              />
            ))}
            <button type="button" onClick={addInput}>Add empty input</button>
            <div>
              <button type="submit">Jump</button>
            </div>
        </form>
        {response ? (
          <div className="App-response">
              
                <p>Code: {resBack.code}</p>
                <p>Message: {resBack.message}</p>
              
          </div>
        ) : null}
      </header>
    </div>
  );
}

export default App;

