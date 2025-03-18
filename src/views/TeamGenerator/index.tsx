import { useCallback, useState } from 'react';
import {
  Alert,
  Button,
  Flex,
  Input,
  message,
  Space,
  Typography,
} from 'antd';

import { usePlayers } from '#hooks/usePlayers';
import { useTeams } from '#hooks/useTeams';
import { encodeTeamData } from '#hooks/useEncodeTeamData';
import { TeamGeneratedType } from '#commons/types';
import TeamPreview from '#components/TeamPreview';
import { CopyOutlined } from '@ant-design/icons';
import { useTeamValidation } from '#hooks/useTeamValidation';

const { Text } = Typography;

const TeamGenerator: React.FC = () => {
  const { players } = usePlayers();
  const { teams } = useTeams();
  const [messageApi, contextHolder] = message.useMessage();
  const [generatedTeams, setGeneratedTeams] = useState<TeamGeneratedType[]>([]);
  const [shareUrl, setShareUrl] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const generateShareableLink = useCallback(
    (teams: TeamGeneratedType[]) => {
      const encodedData = encodeTeamData(teams);
      const baseUrl = window.location.origin;

      // Get the current origin (e.g., http://localhost:3000)
      const url = `${baseUrl}/share?data=${encodedData}`;
      return url
    },
    [],
  );
  const hasEnoughPlayer = useTeamValidation({
    numberOfTeams: teams.length,
    numberOfPlayers: players.length,
  });

  const generateTeams = useCallback(
    (): TeamGeneratedType[] => {
      if (players.length === 0 || teams.length === 0) {
        console.warn('No players or teams available to generate teams.');
        return [];
      }

      if (!hasEnoughPlayer) {
        setError('Each Team must have at least 5 players. Please add player or remove team.');
        return [];
      }

      // Sort players by skill level
      const sortedPlayers = [...players].sort((a, b) => b.skill - a.skill);

      // Initialize teams with empty player arrays and total skill level
      const newGeneratedTeams: TeamGeneratedType[] = teams.map(
        (team) => ({
          ...team,
          players: [],
          totalSkill: 0,
        }),
      );

      // Distribute players to balance total skill levels
      sortedPlayers.forEach((player) => {
        // Find the team with the lowest total skill level
        const teamWithLowestSkill = newGeneratedTeams.reduce(
          (prev, curr) => curr.totalSkill < prev.totalSkill ? curr : prev,
        );

        // Add the player to the team and update its total skill level
        teamWithLowestSkill.players.push(player);
        teamWithLowestSkill.totalSkill += player.skill;
      });

      try {
        if (newGeneratedTeams.length > 0) {
          const url = generateShareableLink(newGeneratedTeams);
          setShareUrl(url);
          setGeneratedTeams(newGeneratedTeams);
        }
      } catch(err) {
        console.log('Error on shareable link generation', err);
      }
      return newGeneratedTeams;
    },
    [players, teams, generateShareableLink, hasEnoughPlayer],
  );

  const handleCopy = useCallback(
    () => {
      try {
        if (shareUrl) {
          void navigator.clipboard.writeText(shareUrl);
          messageApi.success('Link copied  !');
        }
      } catch (err) {
        console.log(err);
      }
    },
    [shareUrl, messageApi],
  );

  return (
    <Flex vertical gap={24}>
      {error && <Alert message={error} type='error' /> }
      <Space direction='vertical' size='large'>
        {!error && (
          <>
            {contextHolder}
            {shareUrl && (
              <Space align='center'>
                <Text> Share link: </Text>
                <Input
                  addonAfter={<CopyOutlined onClick={handleCopy} />}
                  value={shareUrl}
                />
              </Space>
            )}
          </>
        )}
        <Button type="primary" onClick={generateTeams}>
          Generate Teams
        </Button>
        {!error && <TeamPreview teams={generatedTeams} /> }
      </Space>
    </Flex>
  );
};

export default TeamGenerator;
