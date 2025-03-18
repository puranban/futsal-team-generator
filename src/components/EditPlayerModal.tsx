import { useCallback, useMemo } from 'react';
import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  Modal,
  Rate,
  Space,
} from 'antd';
import { Player } from '#commons/types';

interface Props {
  playerId: string;
  players: Player[];
  onUpdatePlayer: (player: Player) => Promise<void>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditPlayerModal: React.FC<Props> = (props: Props) => {
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
    setOpen(false);
  };

  const onFinish = useCallback(
    (val: Player)=> {
      const updatedPlayer = {
        id: playerId,
        name: val.name,
        skill: val.skill,
      }
      void onUpdatePlayer(updatedPlayer);
      setOpen(false);
    },
    [onUpdatePlayer, playerId, setOpen],
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
        <Space
          size='large'
          align='baseline'
          style={{ display: 'flex', marginBottom: 8 }}
        >
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

export default EditPlayerModal;
