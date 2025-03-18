import { createContext, ReactNode, useState } from 'react';

export interface Player {
  id: string;
  name: string;
  skill: number;
}

interface PlayerContextType {
  players: Player[];
  addPlayer: (players: Player[]) => void;
  updatePlayer: (player: Player) => void;
  deletePlayer: (id: string) => void;
}

const PlayerContext = createContext<PlayerContextType>({
  players: [],
  addPlayer: () => {
    console.log('');
  },
  updatePlayer: () => {
    console.log('');
  },
  deletePlayer: () => {
    console.log('');
  },
});

export const PlayerProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = (newPlayers: Player[]) => {
    setPlayers([...players, ...newPlayers]);
  };

  const updatePlayer = (updatedPlayer: Player) => {
    setPlayers(players.map(p => (p.id === updatedPlayer.id ? updatedPlayer : p)));
  };

  const deletePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  return (
    <PlayerContext.Provider value={{ players, addPlayer, updatePlayer, deletePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;
