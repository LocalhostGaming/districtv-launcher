import { Button, Input, PasswordInput, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconArrowRight } from '@tabler/icons';

interface Props {
  form: UseFormReturnType<{
    username: string;
    password: string;
  }>;
}

const LoginForm = ({ form }: Props) => {
  return (
    <form>
      <div className="flex flex-col gap-2">
        <Input placeholder="username" {...form.getInputProps('username')} />
        <PasswordInput
          placeholder="password"
          {...form.getInputProps('password')}
        />
      </div>

      <div className="flex justify-center mt-2">
        <Text className="text-zinc-500" size="sm" variant="link" component="a">
          Forgot your password?
        </Text>
      </div>

      <div className="flex justify-center items-center mt-10">
        <Button type="submit" rightIcon={<IconArrowRight size={18} />}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
