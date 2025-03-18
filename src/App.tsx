import { PlayerProvider } from "#contexts/PlayerContext";
import PlayerForm from "#views/PlayerForm";
import { Layout } from "antd";

import "./App.css";

function App() {
  return (
    <PlayerProvider>
      <Layout className="layout">
      <PlayerForm />
      </Layout>
    </PlayerProvider>
  );
}

export default App;
