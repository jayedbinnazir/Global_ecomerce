export type User = {
  id: string;
  email: string;
  password: string;
  confirm_password?: string;
};

export type FetchUserState = {
  isLoading: boolean;
  loggedinUser: LoggedInUser | null;
  error: string;
};

export type LoggedInUser = {
  id: string;
  email: string;
};
