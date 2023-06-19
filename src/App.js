import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, collection, query, orderBy, updateDoc, deleteDoc } from "firebase/firestore";

function App() {
  const [option, setOption] = useState("");
  const [options, setOptions] = useState([]);
  const [votes, setVotes] = useState({});

  const firebaseConfig = {
  apiKey: "AIzaSyCfcyeGQLeUxboizsXis9tYGQTK1NVAd9o",

  authDomain: "film-214b1.firebaseapp.com",

  projectId: "film-214b1",

  storageBucket: "film-214b1.appspot.com",

  messagingSenderId: "15383734546",

  appId: "1:15383734546:web:982ba9a7c9080a38d56bcb"

  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

  useEffect(() => {
    const q = query(collection(db, "movies"), orderBy("title"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let movies = [];
      let votes = {};
      querySnapshot.forEach((doc) => {
        movies.push(doc.data().title);
        votes[doc.data().title] = doc.data().votes;
      });
      setOptions(movies);
      setVotes(votes);
    });
    return () => unsubscribe();
  }, [db]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (option && !options.includes(option)) {
      await setDoc(doc(db, "movies", option), { title: option, votes: 0 });
      setOption("");
    }
  };

  const handleVote = async (option) => {
    const docRef = doc(db, "movies", option);
    await updateDoc(docRef, { votes: votes[option] + 1 });
  };

  const handleDelete = async (optionToRemove) => {
    await deleteDoc(doc(db, "movies", optionToRemove));
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
