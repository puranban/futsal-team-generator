import { createContext, ReactNode, useState } from 'react';

export interface Team {
  id: string;
  name: string;
}

interface TeamContextType {
  teams: Team[];
  addTeam: (team: Team[]) => void;
  updateTeam: (team: Team) => void;
  deleteTeam: (id: string) => void;
}

const TeamContext = createContext<TeamContextType>({
  teams: [],
  addTeam: () => {
    console.log('');
  },
  updateTeam: () => {
    console.log('');
  },
  deleteTeam: () => {
    console.log('');
  },
});

export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>([]);

  const addTeam = (newTeams: Team[]) => {
    setTeams([...teams, ...newTeams]);
  };

  const updateTeam = (updatedTeam: Team) => {
    setTeams(teams.map(t => (t.id === updatedTeam.id ? updatedTeam : t)));
  };

  const deleteTeam = (id: string) => {
    setTeams(teams.filter(t => t.id !== id));
  };

  return (
    <TeamContext.Provider value={{ teams, addTeam, updateTeam, deleteTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

export default TeamContext;
