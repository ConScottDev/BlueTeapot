import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import GlobalStyle from './styles/globalStyles';
import Home from './pages/Home';
import MasterSchedule from './components/schedule/MasterSchedule';
import Users from './components/users/Users';
import Groups from './components/groups/groups';
import SideMenu from './components/sidemenu';
import Actors from './components/actors/actors';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <SideMenu />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<MasterSchedule />} />
            <Route path="/users" element={<Users />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="/groups" element={<Groups />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
