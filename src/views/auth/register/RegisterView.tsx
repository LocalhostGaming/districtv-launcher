import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTE } from '@constants/routes';
import { Title } from '@mantine/core';

import { DiscordLoading } from './components/DiscordLoading';
import { RegisterForm } from './components/RegisterForm';

const RegisterView = () => {
  const navigate = useNavigate();
  const [registerState] = useState<'discord' | 'register'>('discord');
  const isDiscord = useMemo(() => registerState === 'discord', [registerState]);

  const handleOnCancel = () => {
    navigate(ROUTE.AUTH.LOGIN);
  };

  return (
    <div className="w-[340px]">
      {!isDiscord && (
        <Title className="mb-4 text-center" order={5}>
          SIGN UP
        </Title>
      )}

      <DiscordLoading
        show={isDiscord}
        onBack={() => navigate(ROUTE.AUTH.LOGIN)}
      />
      <RegisterForm show={!isDiscord} onCancel={handleOnCancel} />
    </div>
  );
};

export default RegisterView;
