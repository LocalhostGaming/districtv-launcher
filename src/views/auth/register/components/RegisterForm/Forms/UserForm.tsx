import { Input, Space } from '@mantine/core';

interface Props {
  show?: boolean;
}

export const UserForm = ({ show }: Props) => {
  if (show === false) return null;

  return (
    <>
      {/* Username Input */}
      <Input.Wrapper label="Username">
        <Input defaultValue="cypriuxgaming" />
      </Input.Wrapper>

      <Space h="md" />

      {/* Email Input */}
      <Input.Wrapper label="Email">
        <Input disabled defaultValue="cypriuxgaming@gmail.com" />
      </Input.Wrapper>
    </>
  );
};
