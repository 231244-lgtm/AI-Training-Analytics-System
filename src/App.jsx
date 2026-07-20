import "./App.css";

import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import TrainerProfiles from "./pages/TrainerProfiles";
import Analytics from "./pages/Analytics";
import Feedback from "./pages/Feedback";
import Recommendations from "./pages/Recommendations";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/trainer-profiles" element={<TrainerProfiles />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;