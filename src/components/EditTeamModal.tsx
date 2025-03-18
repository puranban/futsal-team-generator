import { useCallback, useMemo } from 'react';
import { Button, Flex, Form, FormProps, Input, Modal, Space } from 'antd';
import { Team } from '#contexts/TeamContext';

interface Props {
  teamId: string;
  teams: Team[];
  onUpdateTeam: (team: Team) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditTeamModal: React.FC<Props> = (props: Props) => {
  const {
    teamId,
    teams,
    onUpdateTeam,
    open,
    setOpen,
  } = props;

  const [form] = Form.useForm();

  const initialValue = useMemo(
    () => teams.find((t) => t.id === teamId),
    [teamId, teams],
  );

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const onFinish = useCallback(
    (val: Team)=> {
      console.log('Success:', val);
      const updatedTeam = {
        id: teamId,
        name: val.name,
      }
      onUpdateTeam(updatedTeam);
      setOpen(false);
    },
    [onUpdateTeam, teamId, setOpen],
  );

  const onFinishFailed: FormProps<Team>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title='Edit Team'
      open={open}
      footer={null}
    >
      <Form
        name='basic'
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        initialValues={initialValue}
      >
        <Space size='large' style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
          <Form.Item
            name='name'
            rules={[{ required: true, message: 'team name required !' }]}
          >
            <Input placeholder='Team Name' />
          </Form.Item>
        </Space>

        <Form.Item>
          <Flex gap={12}>
            <Button type='primary' htmlType="submit">
              Update
            </Button>
            <Button type='default' onClick={handleCancel}>
              Cancel
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTeamModal;
