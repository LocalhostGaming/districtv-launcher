import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Title } from '@mantine/core';
import { ROUTE } from '@constants/routes';

import { RegisterState } from './constants/state';
import { Discord } from './components/Discord';
import { RegisterForm } from './components/RegisterForm';

const RegisterContainer = () => {
  const navigate = useNavigate();

  const [registerState] = useState<RegisterState>(RegisterState.DISCORD);
  const isDiscord = useMemo(
    () => registerState === RegisterState.DISCORD,
    [registerState]
  );

  const handleOnCancel = () => {
    navigate(ROUTE.AUTH.LOGIN);
  };

  return (
    <Container>
      <div className="w-[340px]">
        {!isDiscord && (
          <Title className="mb-4 text-center" order={5}>
            SIGN UP
          </Title>
        )}

        <Discord show={isDiscord} onBack={handleOnCancel} />
        <RegisterForm show={!isDiscord} onCancel={handleOnCancel} />
      </div>
    </Container>
  );
};

export default RegisterContainer;
