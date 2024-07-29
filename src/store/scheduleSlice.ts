import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  name: string;
  location: string;
  participants: string[];
  date: string;
}

interface ScheduleState {
  tasks: Task[];
}

const initialState: ScheduleState = {
  tasks: [],
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    toggleParticipant: (state, action: PayloadAction<{ taskId: string; participant: string }>) => {
      const task = state.tasks.find(task => task.id === action.payload.taskId);
      if (task) {
        task.participants = task.participants.includes(action.payload.participant)
          ? task.participants.filter(p => p !== action.payload.participant)
          : [...task.participants, action.payload.participant];
      }
    },
  },
});

export const { addTask, toggleParticipant } = scheduleSlice.actions;
export default scheduleSlice.reducer;
