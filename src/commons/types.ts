export interface Player {
  id?: string;
  name: string;
  skill: number;
}

export interface Team {
  id?: string;
  name: string;
}
export interface TeamGeneratedType {
  id?: string;
  name: string;
  players: Player[];
  totalSkill: number;
}
