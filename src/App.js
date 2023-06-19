import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit, reset } = useForm();
  const [options, setOptions] = useState([]);
  const [votes, setVotes] = useState({});

  const onSubmit = (data) => {
    if (data.option && !options.includes(data.option)) {
      setOptions((oldOptions) => [...oldOptions, data.option]);
      setVotes((oldVotes) => ({ ...oldVotes, [data.option]: 0 }));
    }
    reset();
  };

  const handleVote = (option) => {
    setVotes((oldVotes) => ({ ...oldVotes, [option]: oldVotes[option] + 1 }));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("option")} required />
        <button type="submit">Añadir opción</button>
      </form>
      <h2>película / film / 映画 / 영화 / фильм / filma</h2>
      {options.map((option) => (
        <div key={option}>
          {option} - {votes[option]} votos
          <button onClick={() => handleVote(option)}>Votar</button>
        </div>
      ))}
    </div>
  );
}

export default App;
