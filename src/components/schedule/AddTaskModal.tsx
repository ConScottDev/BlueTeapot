import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/scheduleSlice';
import { db } from '../../utils/firebase';
import {collection, addDoc} from 'firebase/firestore'

const AddTaskModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [taskName, setTaskName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);

  const handleSubmit = async () => {
    try {
      const taskRef = await addDoc(collection(db, 'tasks'),{
        name: taskName,
        location,
        date,
        participants,
      });
      console.log('Task added with ID: ', taskRef.id);
      onClose();
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  return (
    <div className="modal">
      <h2>Add New Task</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Task Name" required />
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="text" value={participants.join(', ')} onChange={(e) => setParticipants(e.target.value.split(',').map(p => p.trim()))} placeholder="Participants (comma separated)" />
        <button type="submit">Add Task</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default AddTaskModal;
