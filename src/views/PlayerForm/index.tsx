import { useCallback, useState } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Popconfirm,
  Rate,
  Row,
  Space,
  Table,
  Typography,
} from 'antd';

import EditPlayerModal from '#components/EditPlayerModal';
import { usePlayers } from '#hooks/usePlayers';
import { Player } from '#commons/types';

const { Title } = Typography;

interface Values {
  users: Omit<Player, 'id'>[];
}
const PlayerForm: React.FC = () => {
  const [form] = Form.useForm();
  const {
    players,
    addPlayer,
    updatePlayer,
    deletePlayer,
  } = usePlayers();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [playerId, setPlayerId] = useState<string>('');

  const onFinish = (values: Values) => {
    const newUsers = values.users.map(
      (user) => ({
        name: user.name,
        skill: user.skill,
      }),
    );

    void addPlayer(newUsers);
    form.resetFields();
  };

  const handlePlayerUpdate = useCallback(
    (id: string) => {
      setPlayerId(id);
      setIsModalOpen(true);
    },
    [],
  );

  const handleUpdatePlayer = async (player: Player) => {
    try {
      await updatePlayer(player);
    } catch (error) {
      console.error('Failed to update player:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Skill Level',
      dataIndex: 'skill',
      key: 'skill',
      render: (skill: number) => <Rate character={({ index = 0 }) => index + 1} value={skill} />,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => (
        <Space>
          <Button type='link' onClick={() => handlePlayerUpdate(id)}>Edit</Button>
          <Popconfirm title='Sure you want to delete?' onConfirm={() => void deletePlayer(id)}>
            <Button type='link' danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Flex vertical>
      <Row>
        <Col md={24} lg={16} xl={12}>
          <Card>
            <Form
              form={form}
              name='dynamic_form_nest_item'
              onFinish={onFinish}
              autoComplete='off'
              initialValues={{ users: [{}] }}
            >
              <Form.List name='users'>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => {
                      return (
                        <Space
                          key={key}
                          wrap
                          align='baseline'
                          style={{ display: 'flex', marginBottom: 8 }}
                        >
                          <CloseOutlined onClick={() => remove(name)} />

                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            rules={[{ required: true, message: 'player name required !' }]}
                          >
                            <Input  placeholder={(`Player Name ${key + 1}`)} />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'skill']}
                            rules={[{ required: true, message: 'score required !' }]}
                          >
                            <Rate character={({ index = 0 }) => index + 1} />
                          </Form.Item>
                        </Space>
                      )
                    })}

                    <Form.Item>
                      <Button
                        type='dashed'
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Add Player
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item>
                <Button type='primary' htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>

      <Divider />
      <Space direction='vertical' size="small">
        <Title level={3}> Player List </Title>
        <Table dataSource={players} columns={columns} rowKey='id' />
      </Space>

      {isModalOpen && (
        <EditPlayerModal
          playerId={playerId}
          players={players}
          open={isModalOpen}
          setOpen={setIsModalOpen}
          onUpdatePlayer={handleUpdatePlayer}
        />
      )}
    </Flex>
  );
}

export default PlayerForm;
