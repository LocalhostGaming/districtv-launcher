import { ROUTE } from '@constants/routes';
import { Input, PasswordInput, Button, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowRight, IconBrandDiscord } from '@tabler/icons';
import { useLocation } from 'wouter';

const LoginView = () => {
  const [, setLocation] = useLocation();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  return (
    <div className="p-4 h-full flex place-content-center">
      <div className="w-[340px]  text-center">
        <Title className="mb-4" order={5}>
          SIGN IN
        </Title>

        <form>
          <div className="flex flex-col gap-2">
            <Input placeholder="username" {...form.getInputProps('username')} />
            <PasswordInput
              placeholder="password"
              {...form.getInputProps('password')}
            />
          </div>

          <div className="flex justify-center mt-2">
            <Text
              className="text-zinc-500"
              size="sm"
              variant="link"
              component="a"
            >
              Forgot your password?
            </Text>
          </div>

          <div className="flex justify-center items-center mt-10">
            <Button type="submit" rightIcon={<IconArrowRight size={18} />}>
              Submit
            </Button>
          </div>
        </form>

        <div className="mt-20">
          <Button
            size="sm"
            color="dark"
            rightIcon={<IconBrandDiscord size={17} />}
            className="font-medium px-6 hover:bg-discord hover:text-white"
            variant="light"
            radius={100}
            onClick={() => setLocation(ROUTE.AUTH.REGISTER.PATH)}
          >
            Sign up with Discord
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
