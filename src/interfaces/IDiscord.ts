export interface IDiscordAuthUrl {
  url: string;
}

export interface IDiscordMe {
  accent_color: number;
  avatar: string;
  avatar_decoration: string | null;
  banner: string | null;
  banner_color: string | null;
  discriminator: string;
  email: string;
  flags: number;
  id: string;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
  public_flags: number;
  username: string;
  verified: boolean;
}

export interface IDiscordMePayload {
  accessToken?: string;
  discordToken?: string;
}
