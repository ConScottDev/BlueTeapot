import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store';
import GlobalStyle from './styles/globalStyles';
import Home from './pages/Home';
import Login from './pages/Login';
import UserCalendar from './pages/UserCalendar';
import MyCalendar from './components/calendar'; // Import Calendar component

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/userCalendar" element={<UserCalendar />} />
          <Route path="/calendar" element={< MyCalendar/>} />
          <Route path="/" element={<Home />} /> {/* Default route */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
