import { RegisterType } from '@interface/register';
import { UseFormReturnType } from '@mantine/form';
import { IDiscordMe } from 'src/interface/IDiscord';
import { RegistrationState } from '../constants/registrationState';

export interface RegisterContextProps {
  setRegistrationState: (value: RegistrationState) => void;
  discordUser?: IDiscordMe;
  form: UseFormReturnType<RegisterType>;
}
