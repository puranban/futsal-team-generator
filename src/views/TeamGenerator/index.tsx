import { useCallback, useContext, useState } from 'react';
import { Button, Col, Flex, Input, Row, Typography } from 'antd';

import PlayerContext, { Player } from '#contexts/PlayerContext';
import TeamContext from '#contexts/TeamContext';

interface TeamGeneratedType {
  id: string;
  name: string;
  players: Player[];
  totalSkill: number;
}

const { Title } = Typography;

const TeamGenerator: React.FC = () => {
  const { players } = useContext(PlayerContext);
  const { teams } = useContext(TeamContext);
  const [generatedTeams, setGeneratedTeams] = useState<TeamGeneratedType[]>([]);

  const generateTeams = useCallback(
    (): TeamGeneratedType[] => {
      if (players.length === 0 || teams.length === 0) {
        console.warn('No players or teams available to generate teams.');
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

      setGeneratedTeams(newGeneratedTeams);
      return newGeneratedTeams;
    },
    [players, teams],
  );

  return (
    <div>
      <Button type="primary" onClick={generateTeams}>
        Generate Teams
      </Button>

      <Row gutter={24} justify='space-between'>
        {generatedTeams.map(
          (team) => (
            <Col xs={24} md={12} lg={10}>
              <Flex key={team.id} vertical gap={24}>
                <Title level={4}>{team.name}</Title>

                <Flex vertical size="middle" gap={6}>
                  {team.players.map(
                    (player, index) => (
                      <Flex key={index} gap={6} align="center">
                        <Input
                          addonBefore={index + 1}
                          value={player.name}
                          readonly
                          style={{ cursor: 'pointer', color: '#fefefe' }}
                        />
                        <div className='skill-box'>{ player.skill }</div>
                      </Flex>
                    )
                  )}
                </Flex>

                <div className='total-skill'>
                  <div className='skill-text'> { team.totalSkill } </div>
                </div>
              </Flex>
            </Col>
          )
        )}
      </Row>
    </div>
  );
};

export default TeamGenerator;
