import { ROUTE } from '@constants/routes';
import { Button, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { RegisterForm } from './components/RegisterForm';

const RegisterView = () => {
  const [, setLocation] = useLocation();
  const [registerState] = useState<'discord' | 'register'>('register');
  const isDiscord = useMemo(() => registerState === 'discord', [registerState]);

  const handleOnCancel = () => {
    setLocation(ROUTE.AUTH.LOGIN.PATH);
  };

  return (
    <div className="w-[340px]">
      {!isDiscord && (
        <Title className="mb-4 text-center" order={5}>
          SIGN UP
        </Title>
      )}

      <RegisterForm show={!isDiscord} onCancel={handleOnCancel} />

      {isDiscord && (
        <div className="mt-20 flex place-content-center">
          <Button
            size="sm"
            color="dark"
            leftIcon={<IconArrowLeft size={17} />}
            className="font-medium px-6"
            variant="light"
            radius={100}
            onClick={() => setLocation(ROUTE.AUTH.LOGIN.PATH)}
          >
            Back to Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default RegisterView;
