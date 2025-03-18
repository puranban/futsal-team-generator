import { useCallback, useMemo } from 'react';
import { Button, Flex, Form, FormProps, Input, Modal, Rate, Space } from 'antd';
import { Player } from '#contexts/PlayerContext';

interface Props {
  playerId: string;
  players: Player[];
  onUpdatePlayer: (player: Player) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditModal: React.FC<Props> = (props: Props) => {
  const {
    players,
    playerId,
    onUpdatePlayer,
    open,
    setOpen,
  } = props;

  const [form] = Form.useForm();

  const initialValue = useMemo(
    () => players.find((p) => p.id === playerId),
    [players, playerId],
  );

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const onFinish = useCallback(
    (val: Player)=> {
    console.log('Success:', val);
    const newPlayer = {
      id: playerId,
      name: val.name,
      skill: val.skill,
    }
    onUpdatePlayer(newPlayer);
  },
  [onUpdatePlayer, playerId],
  );

  const onFinishFailed: FormProps<Player>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title='Edit Player'
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
            rules={[{ required: true, message: 'player name required !' }]}
          >
            <Input placeholder='Player Name' />
          </Form.Item>
          <Form.Item
            name='skill'
            rules={[{ required: true, message: 'score required !' }]}
          >
            <Rate character={({ index = 0 }) => index + 1} />
          </Form.Item>
        </Space>

        <Form.Item>
          <Flex gap={12}>
            <Button type='primary' htmlType="submit">
              Submit
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

export default EditModal;
