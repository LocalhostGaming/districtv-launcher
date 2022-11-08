import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, LoadingOverlay, Title } from '@mantine/core';
import { ROUTE } from '@constants/routes';

import { useDiscordService } from '@services/discord';
import { useForm, zodResolver } from '@mantine/form';
import { RegisterSchema } from '@schema/register';
import { RegisterType } from '@interface/register';
import { useUserService } from '@services/user';
import { AxiosError } from 'axios';
import { parseServerZodErrors } from '@helpers/parseServerZodErrors';
import { showNotification } from '@mantine/notifications';
import { RegistrationState } from './constants/registrationState';
import { DiscordAuthentication } from './components/DiscordAuthentication';
import { RegistrationForm } from './components/RegistrationForm';

import { RegisterContext } from './RegisterContext';
import { RegisterContextProps } from './types';

const { me: getDiscordUserDetails } = useDiscordService();

const RegisterContainer = () => {
  const navigate = useNavigate();

  const { createUser } = useUserService();
  const { mutateAsync: createUserMutation, isLoading: createUserLoading } =
    createUser();

  const [registrationState, setRegistrationState] = useState<RegistrationState>(
    RegistrationState.DiscordAuth
  );
  const [discordToken, setDiscordToken] = useState<string | undefined>();

  const handleOnCancel = () => {
    navigate(ROUTE.AUTH.LOGIN);
  };

  const handleOnVerificationSuccess = (tokens: string) => {
    setDiscordToken(tokens);
    setRegistrationState(RegistrationState.RegistrationForm);
  };

  // Discord User Details Service
  const { data: discordUser } = getDiscordUserDetails({ discordToken });

  const form = useForm<RegisterType>({
    validate: zodResolver(RegisterSchema),
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleOnRegister = (values: RegisterType) => {
    if (!discordToken) return;

    const payload = {
      username: values.username,
      password: values.password,
    };

    createUserMutation([payload, discordToken], {
      onSuccess: () => {
        navigate(ROUTE.AUTH.LOGIN);

        showNotification({
          color: 'green',
          message: 'User successfully created',
        });
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          const hasErrors = parseServerZodErrors(error.response?.data.errors);
          if (hasErrors) {
            form.setErrors(hasErrors);
            return;
          }

          showNotification({
            color: 'red',
            message:
              error.response?.data.message ||
              error?.message ||
              'Something went wrong',
          });
        }
      },
    });
  };

  const registerContextProps: RegisterContextProps = useMemo(
    () => ({
      setRegistrationState,
      discordUser,
      form,
    }),
    [form, discordUser, setRegistrationState]
  );

  useEffect(() => {
    if (discordUser) {
      form.setValues({
        email: discordUser.email,
        username: discordUser.username,
        password: '',
        confirmPassword: '',
      });
    }
  }, [discordUser]);

  return (
    <RegisterContext.Provider value={registerContextProps}>
      <Container className="relative py-1">
        <LoadingOverlay visible={createUserLoading} overlayBlur={2} />

        <div className="w-[340px]">
          {registrationState === RegistrationState.RegistrationForm && (
            <Title className="mb-4 text-center" order={5}>
              SIGN UP
            </Title>
          )}

          {registrationState === RegistrationState.DiscordAuth && (
            <DiscordAuthentication
              onBack={handleOnCancel}
              onSuccess={handleOnVerificationSuccess}
            />
          )}

          {registrationState === RegistrationState.RegistrationForm && (
            <RegistrationForm
              onCancel={handleOnCancel}
              onSubmit={handleOnRegister}
            />
          )}
        </div>
      </Container>
    </RegisterContext.Provider>
  );
};

export default RegisterContainer;
