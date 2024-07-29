import React, { useState } from 'react';

const DateViewSelector: React.FC = () => {
  const [view, setView] = useState('today');

  return (
    <div>
      <button onClick={() => setView('today')}>Today</button>
      <button onClick={() => setView('week')}>Week</button>
      <button onClick={() => setView('month')}>Month</button>
      <div>
        {/* Render schedule based on the selected view */}
        <p>Current view: {view}</p>
      </div>
    </div>
  );
};

export default DateViewSelector;
