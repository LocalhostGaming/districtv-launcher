import { ActionIcon, Group } from '@mantine/core';
import { IconWindowMinimize, IconX } from '@tabler/icons';

import styles from './ControlButtons.module.css';

const ControlButtons = () => {
  const handleOnMinimize = async () => {
    window.electron.emit('minimize-window');
  };

  const handleOnClose = async () => {
    window.electron.emit('close-window');
  };

  return (
    <Group className={styles['control-buttons']} spacing="xs">
      {/* Minimize Button */}
      <ActionIcon
        className={styles['control-buttons__button']}
        onClick={() => handleOnMinimize()}
      >
        <IconWindowMinimize size={16} />
      </ActionIcon>

      {/* Close Button */}
      <ActionIcon
        className={styles['control-buttons__button']}
        onClick={() => handleOnClose()}
      >
        <IconX size={17} />
      </ActionIcon>
    </Group>
  );
};

export default ControlButtons;