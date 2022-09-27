import { Button, Text, useMantineTheme } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';

interface Props {
  show?: boolean;
  onBack?: () => void;
}

const DiscordLoading = ({ show, onBack }: Props) => {
  if (show === false) return null;

  const { colors } = useMantineTheme();

  const handleOnBack = () => {
    if (onBack) onBack();
  };

  return (
    <div className="flex flex-col place-content-center text-center">
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
        Waiting for Discord
      </Text>

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

export default DiscordLoading;