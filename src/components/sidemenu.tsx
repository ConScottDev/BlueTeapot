import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu: React.FC = () => {
  return (
    <div className="side-menu">
      <ul>
        <li><Link to="/schedule">Schedule</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/actors">Actors</Link></li>
        <li><Link to="/groups">Groups</Link></li>
      </ul>
    </div>
  );
};

export default SideMenu;