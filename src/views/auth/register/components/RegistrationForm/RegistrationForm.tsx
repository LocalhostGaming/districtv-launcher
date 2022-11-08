import { useState, useContext, useEffect } from 'react';

import { Button, Container } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { IconArrowRight } from '@tabler/icons';

import { RegisterType } from '@interface/register';
import { useUserService } from '@services/user';
import { UserDetails } from './UserDetails';
import { UserPassword } from './UserPassword';

import { RegisterContext } from '../../RegisterContext';

interface Props {
  onCancel?: () => void;
  onSubmit: (values: RegisterType) => void;
}

const RegisterForm = ({ onCancel, onSubmit }: Props) => {
  const { form } = useContext(RegisterContext);
  const [formState, setFormState] = useState<'user' | 'password'>('user');

  const [usernameValue, setUsernameValue] = useDebouncedState(
    form.values.username,
    400
  );

  const { checkUsername } = useUserService();
  const { data: username, isLoading: checkingUsername } =
    checkUsername(usernameValue);

  const handleOnBack = () => {
    if (formState === 'user') {
      if (onCancel) onCancel();
      return;
    }

    // return to user state
    setFormState('user');
  };

  const handleOnProceed = async () => {
    if (formState === 'user') {
      const { hasError } = form.validateField('username');

      if (!hasError) setFormState('password');
      return;
    }

    const { hasErrors } = form.validate();

    if (!hasErrors) onSubmit(form.values);
  };

  useEffect(() => {
    setUsernameValue(form.values.username);
  }, [form.values.username]);

  return (
    <Container>
      {formState === 'user' && (
        <UserDetails
          usernameExists={username?.exists}
          checkingUsername={checkingUsername}
        />
      )}
      {formState === 'password' && <UserPassword />}

      <div className="mt-10 flex justify-between items-center">
        <Button type="button" variant="default" onClick={() => handleOnBack()}>
          {formState === 'user' ? 'Cancel' : 'Back'}
        </Button>

        <Button
          type="button"
          rightIcon={<IconArrowRight size={18} />}
          onClick={() => handleOnProceed()}
          disabled={checkingUsername || username?.exists === true}
        >
          {formState === 'user' ? 'Next' : 'Submit'}
        </Button>
      </div>
    </Container>
  );
};

export default RegisterForm;
