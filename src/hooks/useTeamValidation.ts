interface Props {
  numberOfTeams: number;
  numberOfPlayers: number;
}

const DEFAULT_PAYER_NEEDED = 5;

export const useTeamValidation = (props: Props) => {
  const { numberOfPlayers, numberOfTeams } = props;

  const checkEnoughPlayerForTeam = numberOfPlayers >=
  (numberOfTeams * DEFAULT_PAYER_NEEDED);
  return checkEnoughPlayerForTeam;
}
