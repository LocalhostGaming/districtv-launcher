import { Button, Container } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons';
import { useMemo, useState } from 'react';
import { PasswordForm } from './Forms/PasswordForm';
import { UserForm } from './Forms/UserForm';

interface Props {
  show?: boolean;
  onCancel?: () => void;
}

const RegisterForm = ({ show, onCancel }: Props) => {
  if (show === false) return null;

  const [formState, setFormState] = useState<'user' | 'password'>('user');
  const isUserForm = useMemo(() => formState === 'user', [formState]);

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
