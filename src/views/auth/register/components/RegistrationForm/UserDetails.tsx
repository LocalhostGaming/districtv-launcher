import { TextInput, Space, Loader } from '@mantine/core';
import { IconCircleCheck, IconCircleX } from '@tabler/icons';
import { useContext } from 'react';
import { RegisterContext } from '../../RegisterContext';

interface Props {
  checkingUsername?: boolean;
  usernameExists?: boolean;
}

export const UserDetails = ({ checkingUsername, usernameExists }: Props) => {
  const { form } = useContext(RegisterContext);

  return (
    <>
      {/* Username Input */}
      <TextInput
        label="Username"
        {...form.getInputProps('username')}
        rightSection={
          // eslint-disable-next-line no-nested-ternary
          checkingUsername ? (
            <Loader size="xs" />
          ) : // eslint-disable-next-line no-nested-ternary
          usernameExists && !checkingUsername ? (
            <IconCircleX size={18} className="text-red-500" />
          ) : form.values.username ? (
            <IconCircleCheck size={18} className="text-green-500" />
          ) : null
        }
      />

      <Space h="md" />

      {/* Email Input */}
      <TextInput label="Email" disabled {...form.getInputProps('email')} />
    </>
  );
};
