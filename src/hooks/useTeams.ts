import { useLiveQuery } from 'dexie-react-hooks';
import { db, Team } from '../db';

export const useTeams = () => {
  // Fetch all teams from the database
  const teams = useLiveQuery(() => db.teams.toArray(), []);

  // Add new teams
  const addTeam = async (team: Omit<Team, 'id'>[]) => {
    await db.teams.bulkAdd(team);
  };

  // Update an existing team
  const updateTeam = async (team: Team) => {
    await db.teams.put(team);
  };

  // Delete a team by ID
  const deleteTeam = async (id: string) => {
    await db.teams.delete(id);
  };

  return { teams: teams ?? [], addTeam, updateTeam, deleteTeam };
};
