import { Input, PasswordInput, Space } from '@mantine/core';

interface Props {
  show?: boolean;
}

export const PasswordForm = ({ show }: Props) => {
  if (show === false) return null;

  return (
    <>
      {/* Username Input */}
      <Input.Wrapper label="Password">
        <PasswordInput />
      </Input.Wrapper>

      <Space h="md" />

      {/* Email Input */}
      <Input.Wrapper label="Confirm Password">
        <PasswordInput />
      </Input.Wrapper>
    </>
  );
};
