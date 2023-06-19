import React, { useState } from 'react';

function App() {
  const [option, setOption] = useState("");
  const [options, setOptions] = useState([]);
  const [votes, setVotes] = useState({});

  const onSubmit = (event) => {
    event.preventDefault();
    if (option && !options.includes(option)) {
      setOptions((oldOptions) => [...oldOptions, option]);
      setVotes((oldVotes) => ({ ...oldVotes, [option]: 0 }));
    }
    setOption("");
  };

  const handleVote = (option) => {
    setVotes((oldVotes) => ({ ...oldVotes, [option]: oldVotes[option] + 1 }));
  };

  const handleDelete = (optionToRemove) => {
    setOptions((oldOptions) => oldOptions.filter(option => option !== optionToRemove));
    setVotes((oldVotes) => {
      const newVotes = { ...oldVotes };
      delete newVotes[optionToRemove];
      return newVotes;
    });
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input value={option} onChange={(e) => setOption(e.target.value)} required />
        <button type="submit">Añadir opción</button>
      </form>
      <h2>película / film / 映画 / 영화 / фильм / filma</h2>
      {options.map((option) => (
        <div key={option}>
          {option} - {votes[option]} votos
          <button onClick={() => handleVote(option)}>Votar</button>
          <button onClick={() => handleDelete(option)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default App;
