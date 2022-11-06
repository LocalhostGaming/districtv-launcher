import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Title } from '@mantine/core';
import { ROUTE } from '@constants/routes';

import { RegistrationState } from './constants/registrationState';
import { DiscordAuthentication } from './components/DiscordAuthentication';
import { RegisterForm } from './components/RegisterForm';

const RegisterContainer = () => {
  const navigate = useNavigate();

  const [registrationState, setRegistrationState] = useState<RegistrationState>(
    RegistrationState.DiscordAuth
  );
  const [discordToken, setDiscordToken] = useState<string | undefined>();

  const isAuthenticateDiscord = useMemo(
    () => registrationState === RegistrationState.DiscordAuth,
    [registrationState]
  );

  const handleOnCancel = () => {
    navigate(ROUTE.AUTH.LOGIN);
  };

  const handleOnVerificationSuccess = (tokens: string) => {
    setDiscordToken(tokens);
    setRegistrationState(RegistrationState.Register);
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

        {!isAuthenticateDiscord && (
          <RegisterForm onCancel={handleOnCancel} discordToken={discordToken} />
        )}
      </div>
    </Container>
  );
};

export default RegisterContainer;
