import React, { useState, useEffect } from 'react';
import { db } from '../../utils/firebase';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';

const Groups: React.FC = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [actors, setActors] = useState<any[]>([]);
  const [newGroup, setNewGroup] = useState('');
  const [selectedActors, setSelectedActors] = useState<string[]>([]);

  useEffect(() => {
    const fetchGroupsAndActors = async () => {
      const groupsCollection = collection(db, 'groups');
      const groupsSnapshot = await getDocs(groupsCollection);
      const groupsList = groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGroups(groupsList);

      const actorsCollection = collection(db, 'actors');
      const actorsSnapshot = await getDocs(actorsCollection);
      const actorsList = actorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setActors(actorsList);
    };

    fetchGroupsAndActors();
  }, []);

  const handleAddGroup = async () => {
    if (newGroup.trim() === '') return;
    const groupRef = await addDoc(collection(db, 'groups'), { name: newGroup, actors: selectedActors });
    setGroups([...groups, { id: groupRef.id, name: newGroup, actors: selectedActors }]);
    setNewGroup('');
    setSelectedActors([]);
  };

  const handleUpdateGroup = async (id: string) => {
    const groupRef = doc(db, 'groups', id);
    await updateDoc(groupRef, { actors: selectedActors });
    setGroups(groups.map(group => (group.id === id ? { ...group, actors: selectedActors } : group)));
  };

  return (
    <div>
      <h2>Groups</h2>
      <input
        type="text"
        value={newGroup}
        onChange={(e) => setNewGroup(e.target.value)}
        placeholder="Add new group"
      />
      <select multiple value={selectedActors} onChange={(e) => setSelectedActors(Array.from(e.target.selectedOptions, option => option.value))}>
        {actors.map(actor => (
          <option key={actor.id} value={actor.id}>{actor.name}</option>
        ))}
      </select>
      <button onClick={handleAddGroup}>Add Group</button>
      <ul>
        {groups.map(group => (
          <li key={group.id}>
            {group.name}
            <select multiple value={group.actors} onChange={(e) => setSelectedActors(Array.from(e.target.selectedOptions, option => option.value))}>
              {actors.map(actor => (
                <option key={actor.id} value={actor.id}>{actor.name}</option>
              ))}
            </select>
            <button onClick={() => handleUpdateGroup(group.id)}>Update Group</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Groups;
