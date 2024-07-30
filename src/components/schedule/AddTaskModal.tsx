import React, { useState, useEffect } from 'react';
import { db } from '../../utils/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const AddTaskModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [taskName, setTaskName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [actors, setActors] = useState<any[]>([]);

  useEffect(() => {
    const fetchActors = async () => {
      const actorsCollection = collection(db, 'actors');
      const actorsSnapshot = await getDocs(actorsCollection);
      const actorsList = actorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setActors(actorsList);
    };

    fetchActors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const taskRef = await addDoc(collection(db, 'tasks'), {
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
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Task Name"
              required
            />
          </FormField>
          <FormField>
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </FormField>
          <FormField>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormField>
          <FormField>
            <select multiple value={participants} onChange={(e) => setParticipants(Array.from(e.target.selectedOptions, option => option.value))}>
              {actors.map(actor => (
                <option key={actor.id} value={actor.id}>{actor.name}</option>
              ))}
            </select>
          </FormField>
          <button type="submit">Add Task</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AddTaskModal;
