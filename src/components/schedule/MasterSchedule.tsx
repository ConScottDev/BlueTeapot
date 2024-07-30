import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, QuerySnapshot, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import AddTaskModal from './AddTaskModal';
import GroupToggle from './GroupToggle';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface Task {
  id: string;
  name: string;
  location: string;
  date: string;
  participants: string[];
}

interface Participant {
  id: string;
  name: string;
  type: 'actor' | 'group';
}

const MasterSchedule: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [actors, setActors] = useState<Participant[]>([]);
  const [groups, setGroups] = useState<Participant[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  useEffect(() => {
    const fetchActors = async () => {
      const actorsCollection = collection(db, 'actors');
      const actorsSnapshot = await getDocs(actorsCollection);
      const actorsList = actorsSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        type: 'actor' as const,
      }));
      setActors(actorsList);
    };

    const fetchGroups = async () => {
      const groupsCollection = collection(db, 'groups');
      const groupsSnapshot = await getDocs(groupsCollection);
      const groupsList = groupsSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        type: 'group' as const,
      }));
      setGroups(groupsList);
    };

    fetchActors();
    fetchGroups();
  }, []);

  useEffect(() => {
    const tasksCollection = collection(db, 'tasks');
    const unsubscribe = onSnapshot(tasksCollection, (snapshot: QuerySnapshot) => {
      const tasksData: Task[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, 'id'>),
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, []);

  const filteredTasks = tasks.filter(task =>
    selectedParticipants.length === 0 ||
    task.participants.some(participant => selectedParticipants.includes(participant))
  );

  const events: Event[] = filteredTasks.map(task => ({
    id: task.id,
    title: task.name,
    start: new Date(task.date),
    end: new Date(task.date),
    resource: task,
  }));

  return (
    <div>
      <h1>Master Schedule</h1>
      <button onClick={() => setIsModalOpen(true)}>Add New Task</button>
      <GroupToggle
        participants={[...actors, ...groups]}
        selectedParticipants={selectedParticipants}
        onParticipantsChange={setSelectedParticipants}
      />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
      {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default MasterSchedule;