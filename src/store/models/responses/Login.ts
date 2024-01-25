type User = {
  id: string;
  name: string;
  email: string;
};

export type LoginResponse = {
  user: User;
  token: string;
  refreshToken: string;
};
