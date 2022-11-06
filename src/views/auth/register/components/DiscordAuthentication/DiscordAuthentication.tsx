import { useDiscordApi } from '@api/discord';
import { Button, Text, UnstyledButton, useMantineTheme } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { DiscordAuthState } from '../../enums';

interface Props {
  onBack?: () => void;
  onSuccess: (tokens: string) => void;
}

const { getAuthorizationUrl, verifyToken } = useDiscordApi();

const DiscordAuthentication = ({ onBack, onSuccess }: Props) => {
  const { colors } = useMantineTheme();

  const [authState, setAuthState] = useState<DiscordAuthState>(
    DiscordAuthState.AuthUrlRequest
  );
  const [discordError, setDiscordError] = useState<string>();

  const handleOnBack = () => {
    if (onBack) onBack();
  };

  const requestDiscordAuthorization = async () => {
    try {
      setDiscordError(undefined);

      const data = await getAuthorizationUrl();

      setAuthState(DiscordAuthState.Authenticating);

      if (data?.url) {
        window.electron.emit('discord-auth', data.url);
      }
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setDiscordError(e.response?.data?.message || e.message);
        throw new Error(e.message);
      }
      setDiscordError('Something went wrong.');
      throw e;
    }
  };

  const handleOnVerifyTokens = async (params: string[]) => {
    setAuthState(DiscordAuthState.Verifying);

    const urlString = params?.[0];

    const url = new URL(urlString);

    if (!url) setDiscordError('Invalid Authentication Code');

    const [discordCode, discordState] = url.search.split('&');
    const [, qCode] = discordCode.split('=');
    const [, qState] = discordState.split('=');

    if (!qCode || !qState) setDiscordError('Invalid Authentication Code');

    try {
      const data = await verifyToken(qCode, qState);
      onSuccess(data.tokens);
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setDiscordError(e.response?.data?.message || e.message);
        throw new Error(e.message);
      }

      setDiscordError('Something went wrong.');
      throw e;
    }
  };

  useEffect(() => {
    if (authState === DiscordAuthState.AuthUrlRequest) {
      requestDiscordAuthorization();
    }

    window.electron.on('discord', handleOnVerifyTokens);

    return () => {
      window.electron.removeAllListeners('discord');
    };
  }, []);

  return (
    <div className="flex flex-col place-content-center text-center">
      {!discordError ? (
        <>
          <div className="mb-2">
            <svg
              width="28"
              height="28"
              viewBox="-4 -4 46 46"
              xmlns="http://www.w3.org/2000/svg"
              stroke={colors.discord[0]}
            >
              <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)" strokeWidth="6">
                  <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                  <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              </g>
            </svg>
          </div>

          <Text size="sm" weight={500}>
            {authState === DiscordAuthState.AuthUrlRequest &&
              'Requesting Authentication URL'}

            {authState === DiscordAuthState.Authenticating &&
              'Waiting for Discord'}

            {authState === DiscordAuthState.Verifying &&
              'Verifying Discord Account'}
          </Text>
        </>
      ) : (
        <div>
          <Text size="sm" weight={500}>
            {discordError}
            <UnstyledButton
              className="font-semibold text-discord cursor-pointer hover:text-indigo-300 ml-2 text-sm"
              onClick={() => requestDiscordAuthorization()}
            >
              Try Again
            </UnstyledButton>
          </Text>
        </div>
      )}

      <div className="mt-20 flex place-content-center">
        <Button
          size="sm"
          color="dark"
          leftIcon={<IconArrowLeft size={17} />}
          className="font-medium px-4"
          variant="light"
          radius={100}
          onClick={() => handleOnBack()}
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default DiscordAuthentication;
