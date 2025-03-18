import { useCallback, useState } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Table,
  Space,
  Typography,
  Popconfirm,
  Flex,
} from 'antd';

import EditTeamModal from '#components/EditTeamModal';
import { useTeams } from '#hooks/useTeams';
import { Team } from '../../db';

const { Title } = Typography;
interface Values {
  teams: Team[];
}

const TeamForm: React.FC = () => {
  const [form] = Form.useForm();
  const {
    teams,
    addTeam,
    updateTeam,
    deleteTeam,
  } = useTeams();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [teamId, setTeamId] = useState<string>('');

  const onFinish = (values: Values) => {
    const newTeamList = values.teams.map(
      (user) => ({
        name: user.name,
      }),
    );

    void addTeam(newTeamList);
    form.resetFields();
  };

  const handleTeamUpdate = useCallback(
    (id: string) => {
      setTeamId(id);
      setIsModalOpen(true);
    },
    [],
  );

  const handleUpdateTeam = async (team: Team) => {
    try {
      await updateTeam(team);
    } catch (error) {
      console.error('Failed to update team:', error);
    }
  };

  const columns = [
    {
      title: 'Team Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'id',
      dataIndex: 'id',
      render: (id: string) => (
        <Space>
          <Button type='link' onClick={() => handleTeamUpdate(id)}>Edit</Button>
          <Popconfirm title='Sure you want to delete?' onConfirm={() => void deleteTeam(id)}>
            <Button type='link' danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Flex vertical flex='1'>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ teams: [{}] }}
      >
        <Form.List name='teams'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => {
                return (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                    <CloseOutlined onClick={() => remove(name)} />

                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      rules={[{ required: true, message: 'team name required !' }]}
                    >
                      <Input placeholder={(`Team Name ${key + 1}`)} />
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
                  Add Team
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type='primary' htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>

      <Space direction='vertical' size="small">
        <Title level={3}> Team List </Title>
        </Space>
      <Table dataSource={teams} columns={columns} rowKey="id" />

      {isModalOpen && (
        <EditTeamModal
          teamId={teamId}
          teams={teams}
          open={isModalOpen}
          setOpen={setIsModalOpen}
          onUpdateTeam={handleUpdateTeam}
        />
      )}
    </Flex>
  );
};

export default TeamForm;
