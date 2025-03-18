import { useLiveQuery } from 'dexie-react-hooks';
import { db, Player } from '../db';

export const usePlayers = () => {
  // Fetch all players from the database
  const players = useLiveQuery(() => db.players.toArray(), []);

  // Add new playeys
  const addPlayer = async (player: Omit<Player, 'id'>[]) => {
    await db.players.bulkAdd(player);
  };

  // Update an existing player
  const updatePlayer = async (player: Player) => {
    await db.players.put(player);
  };

  // Delete a player by ID
  const deletePlayer = async (id: string) => {
    await db.players.delete(id);
  };

  return { players: players ?? [], addPlayer, updatePlayer, deletePlayer };
};
