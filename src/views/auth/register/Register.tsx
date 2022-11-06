import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Title } from '@mantine/core';
import { ROUTE } from '@constants/routes';
import { RegisterState } from './constants/state';
import { DiscordAuthentication } from './components/DiscordAuthentication';
import { RegisterForm } from './components/RegisterForm';

const RegisterContainer = () => {
  const navigate = useNavigate();

  const [registerState, setRegisterState] = useState<RegisterState>(
    RegisterState.DISCORD
  );
  const [discordToken, setDiscordToken] = useState<string | undefined>();

  const isAuthenticateDiscord = useMemo(
    () => registerState === RegisterState.DISCORD,
    [registerState]
  );

  const handleOnCancel = () => {
    navigate(ROUTE.AUTH.LOGIN);
  };

  const handleOnVerificationSuccess = (tokens: string) => {
    setDiscordToken(tokens);
    setRegisterState(RegisterState.REGISTER);
  };

  return (
    <Container>
      <div className="w-[340px]">
        {!isAuthenticateDiscord && (
          <Title className="mb-4 text-center" order={5}>
            SIGN UP
          </Title>
        )}

        {isAuthenticateDiscord && (
          <DiscordAuthentication
            onBack={handleOnCancel}
            onSuccess={handleOnVerificationSuccess}
          />
        )}

        <RegisterForm
          show={!isAuthenticateDiscord}
          onCancel={handleOnCancel}
          discordToken={discordToken}
        />
      </div>
    </Container>
  );
};

export default RegisterContainer;
