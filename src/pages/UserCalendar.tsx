import React, { useEffect, useState } from 'react';
import { db, auth } from '../utils/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const UserCalendar: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      return;
    }

    // Create a query to fetch tasks where the user is a participant
    const q = query(
      collection(db, 'tasks'),
      where('participants', 'array-contains', user.email)
    );

    // Set up a real-time listener for the query
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    }, (error) => {
      console.error("Error fetching user tasks: ", error);
    });

    // Clean up the listener when the component unmounts or user changes
    return () => unsubscribe();

  }, [user]);

  return (
    <div>
      <h1>Your Calendar</h1>
      <div>
        {tasks.map(task => (
          <div key={task.id}>
            <h3>{task.name}</h3>
            <p>{task.location}</p>
            <p>{task.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCalendar;
