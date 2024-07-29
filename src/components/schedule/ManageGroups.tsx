import React, { useState } from 'react';

const ManageGroups: React.FC = () => {
  const [groups, setGroups] = useState<{ name: string; members: string[] }[]>([]);
  const [newGroup, setNewGroup] = useState('');

  const addGroup = () => {
    setGroups([...groups, { name: newGroup, members: [] }]);
    setNewGroup('');
  };

  return (
    <div>
      <h2>Manage Groups</h2>
      <input
        type="text"
        value={newGroup}
        onChange={e => setNewGroup(e.target.value)}
        placeholder="New group name"
      />
      <button onClick={addGroup}>Add Group</button>
      <div>
        {groups.map(group => (
          <div key={group.name}>
            <h3>{group.name}</h3>
            {/* Add functionality for group members */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageGroups;
