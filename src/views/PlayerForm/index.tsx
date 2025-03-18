import { useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  Popconfirm,
  Rate,
  Space,
  Table,
  Typography,
} from 'antd';

import PlayerContext, { Player } from '#contexts/PlayerContext';
import EditModal from '#components/EditModal';

const { Title } = Typography;

interface Values {
  users: Player[];
}
const PlayerForm: React.FC = () => {
  const [form] = Form.useForm();
  const { players, addPlayer, updatePlayer, deletePlayer } = useContext(PlayerContext);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [playerId, setPlayerId] = useState<string>('');

  const onFinish = (values: Values) => {
    const newUsers = values.users.map((user) => ({
      id: uuid(),
      name: user.name,
      skill: user.skill,
    }));

    try {
      addPlayer(newUsers);
      form.resetFields();
    } catch(err) {
      console.log('Error adding player', err);
    }
  };

  const handlePlayerUpdate = useCallback(
    (id: string) => {
      setPlayerId(id);
      setIsModalOpen(true);
    },
    [],
  );

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
      render: (id: string) => {
        return (
          <Space>
            <Button type='link' onClick={() => handlePlayerUpdate(id)}>Edit</Button>
            <Popconfirm title='Sure to delete?' onConfirm={() => deletePlayer(id)}>
              <Button type='link' danger>Delete</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Flex vertical flex='1'>
      <Form
        form={form}
        name='dynamic_form_nest_item'
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        autoComplete='off'
        initialValues={{ users: [{}] }}
      >
        <Form.List name='users'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => {
                return (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                    <CloseOutlined onClick={() => remove(name)} />

                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      rules={[{ required: true, message: 'Missing player name' }]}
                    >
                      <Input placeholder={(`Player Name ${key + 1}`)} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'skill']}
                      rules={[{ required: true, message: 'Missing Score' }]}
                    >
                      <Rate character={({ index = 0 }) => index + 1} />
                    </Form.Item>
                  </Space>
                )
              })}

              <Form.Item>
                <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
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

      <Divider />
      <Space direction='vertical' size="small">
        <Title level={3}> Player List </Title>
        <Table dataSource={players} columns={columns} rowKey='id' />
      </Space>

      {isModalOpen && (
        <EditModal
          playerId={playerId}
          players={players}
          open={isModalOpen}
          setOpen={setIsModalOpen}
          onUpdatePlayer={updatePlayer}
        />
      )}
    </Flex>
  );
}

export default PlayerForm;
