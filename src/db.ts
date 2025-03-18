import { Player, Team } from '#commons/types';
import Dexie, { type EntityTable } from 'dexie';

// Define the database
const db = new Dexie('RandomTeamGeneratorDB') as Dexie & {
  players: EntityTable<Player, 'id'>;
  teams: EntityTable<Team, 'id'>;
};

// Schema declaration
db.version(1).stores({
  players: '++id, name, skill',
  teams: '++id, name',
});

export { db };
