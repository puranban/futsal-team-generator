import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import PlayerForm from '#views/PlayerForm';
import TeamForm from '#views/TeamForm';
import TeamGenerator from '#views/TeamGenerator';
import Navbar from '#components/Navbar';

import './App.css';

function App() {
  return (
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
  );
}

export default App;
