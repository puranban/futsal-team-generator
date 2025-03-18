import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import { PlayerProvider } from '#contexts/PlayerContext';
import { TeamProvider } from '#contexts/TeamContext';
import PlayerForm from '#views/PlayerForm';
import TeamForm from '#views/TeamForm';
import TeamGenerator from '#views/TeamGenerator';

import './App.css';
import Navbar from '#components/Navbar';

function App() {
  return (
    <PlayerProvider>
      <TeamProvider>
        <Layout className='layout'>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<PlayerForm />} />
              <Route path="/teams" element={<TeamForm />} />
              <Route path="/generate-teams" element={<TeamGenerator />} />
            </Routes>
          </Router>
        </Layout>
      </TeamProvider>
    </PlayerProvider>
  );
}

export default App;
