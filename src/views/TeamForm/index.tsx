import { useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Table, Space, Typography, Popconfirm, Flex } from 'antd';

import TeamContext, { Team } from '#contexts/TeamContext';
import EditTeamModal from '#components/EditTeamModal';

const { Title } = Typography;
interface Values {
  teams: Team[];
}

const TeamForm: React.FC = () => {
  const [form] = Form.useForm();
  const { teams, addTeam, updateTeam, deleteTeam } = useContext(TeamContext);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [teamId, setTeamId] = useState<string>('');

  const onFinish = (values: Values) => {
    const newTeamList = values.teams.map((user) => ({
      id: uuid(),
      name: user.name,
    }));

    try {
      addTeam(newTeamList);
      form.resetFields();
    } catch(err) {
      console.log('Error adding player', err);
    }
  };

  const handleTeamUpdate = useCallback(
    (id: string) => {
      setTeamId(id);
      setIsModalOpen(true);
    },
    [],
  );

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
          <Popconfirm title='Sure you want to delete?' onConfirm={() => deleteTeam(id)}>
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
          onUpdateTeam={updateTeam}
        />
      )}
    </Flex>
  );
};

export default TeamForm;
