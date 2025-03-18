import { Flex, Layout } from 'antd';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import { PlayerProvider } from '#contexts/PlayerContext';
import { TeamProvider } from '#contexts/TeamContext';
import PlayerForm from '#views/PlayerForm';
import TeamForm from '#views/TeamForm';

import './App.css';

function App() {
  return (
    <PlayerProvider>
      <TeamProvider>
        <Layout className='layout'>
          <Router>
            <nav>
              <Flex gap={24}>
                <Link to="/">Players</Link>
                <Link to="/teams">Teams</Link>
                <Link to="/generate">Generate Teams</Link>
              </Flex>
            </nav>
            <Routes>
              <Route path="/" element={<PlayerForm />} />
              <Route path="/teams" element={<TeamForm />} />
              {/* <Route path="/generate" element={<TeamGenerator />} /> */}
            </Routes>
          </Router>
        </Layout>
      </TeamProvider>
    </PlayerProvider>
  );
}

export default App;
