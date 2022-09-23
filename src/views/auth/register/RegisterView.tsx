import { ROUTE } from '@constants/routes';
import { Title } from '@mantine/core';
import { useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { DiscordLoading } from './components/DiscordLoading';
import { RegisterForm } from './components/RegisterForm';

const RegisterView = () => {
  const [, setLocation] = useLocation();
  const [registerState] = useState<'discord' | 'register'>('discord');
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

      <DiscordLoading onBack={() => setLocation(ROUTE.AUTH.LOGIN.PATH)} />
      <RegisterForm show={!isDiscord} onCancel={handleOnCancel} />
    </div>
  );
};

export default RegisterView;
