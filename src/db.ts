import Dexie, { type EntityTable } from 'dexie';

export interface Player {
  id?: string;
  name: string;
  skill: number;
}

export interface Team {
  id?: string;
  name: string;
}

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
