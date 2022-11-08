import { PasswordInput, Space } from '@mantine/core';
import { useContext } from 'react';
import { RegisterContext } from '../../RegisterContext';

export const UserPassword = () => {
  const { form } = useContext(RegisterContext);

  return (
    <>
      {/* Username Input */}
      <PasswordInput label="Password" {...form.getInputProps('password')} />

      <Space h="md" />

      {/* Email Input */}
      <PasswordInput
        label="Confirm Password"
        {...form.getInputProps('confirmPassword')}
      />
    </>
  );
};
