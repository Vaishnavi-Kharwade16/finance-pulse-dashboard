import React from 'react';
import { DashboardProvider } from "./DashboardContext"; // Adjust path if needed
import Dashboard from './Dashboard';

function App() {
  return (
    // This Provider "broadcasts" the data to everything inside it
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
}

export default App;