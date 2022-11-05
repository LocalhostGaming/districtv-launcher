import { Button, Container } from '@mantine/core';
import { useDiscordService } from '@service/discord';
import { IconArrowRight } from '@tabler/icons';
import { useEffect, useMemo, useState } from 'react';
import { PasswordForm } from './Forms/PasswordForm';
import { UserForm } from './Forms/UserForm';

interface Props {
  show?: boolean;
  onCancel?: () => void;
  discordToken?: string;
}

const { me: meService } = useDiscordService();

const RegisterForm = ({ show, onCancel, discordToken }: Props) => {
  if (show === false) return null;

  const [formState, setFormState] = useState<'user' | 'password'>('user');
  const isUserForm = useMemo(() => formState === 'user', [formState]);

  const { data: meData } = meService({ discordToken });

  const handleOnBack = () => {
    if (isUserForm) {
      if (onCancel) onCancel();
      return;
    }

    // return to user state
    setFormState('user');
  };

  const handleOnProceed = () => {
    if (isUserForm) {
      // check if username exists

      // if not, proceed
      setFormState('password');
    }

    // submit form
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('ME', meData);
  }, [meData]);

  return (
    <Container>
      <UserForm show={isUserForm} />
      <PasswordForm show={!isUserForm} />

      <div className="mt-10 flex justify-between items-center">
        <Button type="button" variant="default" onClick={() => handleOnBack()}>
          {isUserForm ? 'Cancel' : 'Back'}
        </Button>

        <Button
          type="button"
          rightIcon={<IconArrowRight size={18} />}
          onClick={() => handleOnProceed()}
        >
          {isUserForm ? 'Next' : 'Submit'}
        </Button>
      </div>
    </Container>
  );
};

export default RegisterForm;
