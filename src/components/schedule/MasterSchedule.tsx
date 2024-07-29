import React, { useEffect, useState } from 'react';
import AddTaskModal from './AddTaskModal';
import { db } from '../../utils/firebase';
import { collection, onSnapshot, QuerySnapshot, getDocs } from 'firebase/firestore';

// Define the Task and Person types
interface Task {
  id: string;
  name: string;
  location: string;
  date: string;
  participants: string[];
}

interface Person {
  name: string;
  isVisible: boolean;
}

const MasterSchedule: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    // Create a reference to the tasks collection
    const tasksCollection = collection(db, 'tasks');

    // Set up a listener for real-time updates
    const unsubscribe = onSnapshot(tasksCollection, (snapshot: QuerySnapshot) => {
      const tasksData: Task[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, 'id'>) // Spread the document data
      }));
      setTasks(tasksData);
    }, (error) => {
      console.error("Error listening to tasks: ", error);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch people from Firestore
    const fetchPeople = async () => {
      const peopleCollection = collection(db, 'people');
      const snapshot = await getDocs(peopleCollection);
      const peopleData = snapshot.docs.map(doc => ({
        name: doc.id,
        isVisible: true // Initially, all people are visible
      }));
      setPeople(peopleData);
    };

    fetchPeople();
  }, []);

  const togglePersonVisibility = (name: string) => {
    setPeople(prevPeople =>
      prevPeople.map(person =>
        person.name === name
          ? { ...person, isVisible: !person.isVisible }
          : person
      )
    );
  };

  const filteredTasks = tasks.filter(task =>
    task.participants.some(participant =>
      people.find(person => person.name === participant)?.isVisible
    )
  );

  return (
    <div>
      <h1>Master Schedule</h1>
      <button onClick={() => setIsModalOpen(true)}>Add New Task</button>
      <div>
        {people.map(person => (
          <div key={person.name}>
            <label>
              <input
                type="checkbox"
                checked={person.isVisible}
                onChange={() => togglePersonVisibility(person.name)}
              />
              {person.name}
            </label>
          </div>
        ))}
      </div>
      <div>
        {filteredTasks.map(task => (
          <div key={task.id}>
            <h3>{task.name}</h3>
            <p>{task.location}</p>
            <p>{task.date}</p>
            <p>Participants: {task.participants.join(', ')}</p>
          </div>
        ))}
      </div>
      {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default MasterSchedule;
