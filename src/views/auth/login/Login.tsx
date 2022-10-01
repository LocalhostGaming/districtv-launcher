import { useNavigate } from 'react-router-dom';

import { Container, Title, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconBrandDiscord } from '@tabler/icons';
import { ROUTE } from '@constants/routes';
import { LoginForm } from './components/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  return (
    <Container>
      <div className="w-[340px] text-center">
        <Title className="mb-4" order={5}>
          SIGN IN
        </Title>

        {/* Form */}
        <LoginForm form={form} />

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
