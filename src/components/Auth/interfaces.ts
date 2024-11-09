export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface InitDataUnsafe {
  user?: TelegramUser;
  auth_date: number;
  hash: string;
}
