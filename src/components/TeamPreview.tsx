import { TeamGeneratedType } from "#commons/types";
import {
  Col,
  Row,
  Flex,
  Typography,
  Input,
} from "antd";

const { Title } = Typography;
interface Props {
  teams: TeamGeneratedType[];
}

const TeamPreview: React.FC<Props> = (props: Props) => {
  const { teams } = props;
  return (
    <Row gutter={24} justify='space-between'>
      {teams.map(
        (team) => (
          <Col key={team.id} xs={24} md={12} lg={10}>
            <Flex key={team.id} vertical gap={24}>
              <Title level={4}>{team.name}</Title>

              <Flex vertical size="middle" gap={6}>
                {team.players.map(
                  (player, index) => (
                    <Flex key={index} gap={6} align="center">
                      <Input
                        addonBefore={index + 1}
                        value={player.name}
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
        ),
      )}
    </Row>
  );
}

export default TeamPreview;
