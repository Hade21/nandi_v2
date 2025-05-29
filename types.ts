export type Credentials = {
  username: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  profilePict: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
};
