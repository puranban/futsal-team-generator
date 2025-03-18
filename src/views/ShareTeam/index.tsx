import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TeamGeneratedType } from '#commons/types';
import { decodeTeamData } from '#hooks/useDecodeTeamData';
import TeamPreview from '#components/TeamPreview';

const ShareTeam: React.FC = () => {
  const location = useLocation();
  const [teams, setTeams] = useState<TeamGeneratedType[]>([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const encodedData = queryParams.get('data');

    if (encodedData) {
      const decodedTeams = decodeTeamData(encodedData);
      setTeams(decodedTeams);
    }
  }, [location]);

  return <TeamPreview teams={teams} />;
};

export default ShareTeam;
