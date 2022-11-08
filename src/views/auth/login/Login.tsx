import { useNavigate } from 'react-router-dom';

import { Container, Title, Button } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconBrandDiscord } from '@tabler/icons';
import { ROUTE } from '@constants/routes';
import { LoginType } from '@interface/auth';
import { useAuthApi } from '@api/auth';
import { AxiosError } from 'axios';
import { showNotification } from '@mantine/notifications';
import { LoginSchema } from '@schema/auth';
import { LoginForm } from './components/LoginForm';

const { login } = useAuthApi();

const Login = () => {
  const navigate = useNavigate();
  const form = useForm({
    validate: zodResolver(LoginSchema),
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleOnSubmit = async (values: LoginType) => {
    try {
      const response = await login(values);
      window.electron.storage.set('access_token', response.access_token);

      navigate(ROUTE.DASHBOARD.PLAY);
    } catch (error) {
      if (error instanceof AxiosError) {
        showNotification({
          color: 'red',
          message:
            error.response?.data.message ||
            error.message ||
            'Something went wrong',
        });
        return;
      }

      showNotification({
        color: 'red',
        message: 'Something went wrong',
      });
    }
  };

  return (
    <Container>
      <div className="w-[340px] text-center">
        <Title className="mb-4" order={5}>
          SIGN IN
        </Title>

        {/* Form */}
        <LoginForm form={form} onSubmit={handleOnSubmit} />

        <div className="mt-20">
          <Button
            size="sm"
            color="dark"
            rightIcon={<IconBrandDiscord size={17} />}
            className="font-medium px-6 hover:bg-discord hover:text-white"
            variant="light"
            radius={100}
            onClick={() => navigate(ROUTE.AUTH.REGISTER)}
          >
            Sign up with Discord
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Login;
