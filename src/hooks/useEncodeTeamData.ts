import { Player } from "../db";

interface TeamGeneratedType {
  id?: string;
  name: string;
  players: Player[];
  totalSkill: number;
}

export const encodeTeamData = (teams: TeamGeneratedType[]) => {
  const data = JSON.stringify(teams);
  return btoa(data); // Convert to base64
};
