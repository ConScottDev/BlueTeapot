import React, { useState, useEffect } from 'react';
import { db } from '../../utils/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Actors: React.FC = () => {
  const [actors, setActors] = useState<any[]>([]);
  const [newActor, setNewActor] = useState('');

  useEffect(() => {
    const fetchActors = async () => {
      const actorsCollection = collection(db, 'actors');
      const actorsSnapshot = await getDocs(actorsCollection);
      const actorsList = actorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setActors(actorsList);
    };

    fetchActors();
  }, []);

  const handleAddActor = async () => {
    if (newActor.trim() === '') return;
    const actorRef = await addDoc(collection(db, 'actors'), { name: newActor });
    setActors([...actors, { id: actorRef.id, name: newActor }]);
    setNewActor('');
  };

  const handleDeleteActor = async (id: string) => {
    await deleteDoc(doc(db, 'actors', id));
    setActors(actors.filter(actor => actor.id !== id));
  };

  return (
    <div>
      <h2>Actors</h2>
      <input
        type="text"
        value={newActor}
        onChange={(e) => setNewActor(e.target.value)}
        placeholder="Add new actor"
      />
      <button onClick={handleAddActor}>Add Actor</button>
      <ul>
        {actors.map(actor => (
          <li key={actor.id}>
            {actor.name} <button onClick={() => handleDeleteActor(actor.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Actors;
