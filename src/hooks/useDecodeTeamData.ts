import { Player } from "#commons/types";

interface TeamGeneratedType {
  id?: string;
  name: string;
  players: Player[];
  totalSkill: number;
}

export const decodeTeamData = (encodedData: string) => {
  const data = atob(encodedData); // Decode from base64
  return JSON.parse(data) as TeamGeneratedType[];
};
