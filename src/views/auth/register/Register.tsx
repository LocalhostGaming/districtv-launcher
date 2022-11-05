import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Title } from '@mantine/core';
import { ROUTE } from '@constants/routes';

import { useDiscordApi } from '@api/discord';
import { AxiosError } from 'axios';
import { RegisterState } from './constants/state';
import { Discord } from './components/Discord';
import { RegisterForm } from './components/RegisterForm';
import { DiscordAuthState } from './enums';

const { getAuthorizationUrl, verifyToken } = useDiscordApi();

const RegisterContainer = () => {
  const navigate = useNavigate();

  const [registerState, setRegisterState] = useState<RegisterState>(
    RegisterState.DISCORD
  );
  const [discordToken, setDiscordToken] = useState<string | undefined>();

  const isDiscord = useMemo(
    () => registerState === RegisterState.DISCORD,
    [registerState]
  );

  const handleOnCancel = () => {
    navigate(ROUTE.AUTH.LOGIN);
  };

  const handleOnVerificationSuccess = (token: string) => {
    setDiscordToken(token);
    setRegisterState(RegisterState.REGISTER);
  };

  // Discord Component State & Functions
  const [discordAuthState, setDiscordAuthState] = useState<DiscordAuthState>(
    DiscordAuthState.AuthUrlRequest
  );
  const [discordError, setDiscordError] = useState<string>();

  const requestDiscordAuthorization = async () => {
    try {
      const data = await getAuthorizationUrl();

      if (data?.url) {
        window.electron.emit('discord-auth', data.url);
      }
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        throw new Error(e.message);
      }

      throw e;
    }
  };

  const handleDiscordRedirect = async (params: string[]) => {
    setDiscordAuthState(DiscordAuthState.Verifying);

    const urlString = params?.[0];

    const url = new URL(urlString);

    if (!url) setDiscordError('Invalid Authentication Code');

    const [discordCode, discordState] = url.search.split('&');
    const [, qCode] = discordCode.split('=');
    const [, qState] = discordState.split('=');

    if (!qCode || !qState) setDiscordError('Invalid Authentication Code');

    try {
      const data = await verifyToken(qCode, qState);
      handleOnVerificationSuccess(data.tokens);
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        throw new Error(e.message);
      }

      throw e;
    }
  };

  useEffect(() => {
    if (discordAuthState === DiscordAuthState.AuthUrlRequest) {
      requestDiscordAuthorization();
      setDiscordAuthState(DiscordAuthState.Authenticating);
    }

    window.electron.on('discord', handleDiscordRedirect);

    return () => {
      window.electron.removeAllListeners('discord');
    };
  });

  return (
    <Container>
      <div className="w-[340px]">
        {!isDiscord && (
          <Title className="mb-4 text-center" order={5}>
            SIGN UP
          </Title>
        )}

        <Discord
          show={isDiscord}
          onBack={handleOnCancel}
          discordError={discordError}
          state={discordAuthState}
          onRetry={requestDiscordAuthorization}
        />
        <RegisterForm
          show={!isDiscord}
          onCancel={handleOnCancel}
          discordToken={discordToken}
        />
      </div>
    </Container>
  );
};

export default RegisterContainer;
