import { Button, Text, UnstyledButton, useMantineTheme } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { useEffect, useState } from 'react';

interface Props {
  show?: boolean;
  onBack?: () => void;
}

enum STATE {
  INIT,
  AUTH,
  VERIFY,
}

const Discord = ({ show, onBack }: Props) => {
  if (show === false) return null;

  const { colors } = useMantineTheme();

  const [state, setState] = useState<STATE>(STATE.INIT);
  const [error, setError] = useState<string>();

  const handleOnBack = () => {
    if (onBack) onBack();
  };

  const requestDiscordAuthorization = () => {
    window.electron.emit(
      'discord-auth',
      import.meta.env.VITE_APP_DISCORD_AUTH_URL
    );
  };

  const handleDiscordRedirect = (urlString: string) => {
    setState(STATE.VERIFY);

    const url = new URL(urlString);

    if (!url) setError('Invalid Authentication Code');

    const [, code] = url.search.split('=');

    if (!code) setError('Invalid Authentication Code');
  };

  useEffect(() => {
    if (state === STATE.INIT) {
      requestDiscordAuthorization();
      setState(STATE.AUTH);
    }

    window.electron.on('protocol-params', (params) => {
      handleDiscordRedirect(params?.[0]);
    });
  }, []);

  return (
    <div className="flex flex-col place-content-center text-center">
      {!error ? (
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
            {state === STATE.AUTH && 'Waiting for Discord'}
            {state === STATE.VERIFY && 'Verifying Discord Account'}
          </Text>
        </>
      ) : (
        <div>
          <Text size="sm" weight={500}>
            {error}
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

export default Discord;
