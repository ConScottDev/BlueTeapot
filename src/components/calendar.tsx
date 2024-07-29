import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { db } from '../utils/firebase';
import { collection, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format } from 'date-fns';
import moment from 'moment'

// Define Event type
interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location: string;
  participants: string[];
}

const localizer = momentLocalizer(moment);

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const eventsCollection = collection(db, 'events');

    const unsubscribe = onSnapshot(eventsCollection, (snapshot: QuerySnapshot) => {
      const eventsData: Event[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Event, 'id'>), // Spread the document data
        start: new Date((doc.data() as any).start.toDate()),
        end: new Date((doc.data() as any).end.toDate())
      }));
      setEvents(eventsData);
    }, (error) => {
      console.error("Error listening to events: ", error);
    });

    return () => unsubscribe();
  }, []);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    // Handle slot selection to add new events
    console.log(`Selected slot: ${format(start, 'Pp')} - ${format(end, 'Pp')}`);
  };

  return (
    <div>
      <h1>Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectSlot={handleSelectSlot}
        selectable
      />
    </div>
  );
};

export default MyCalendar;
