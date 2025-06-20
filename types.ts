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

export type RegisterResponse = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  role: "USER" | "ADMIN";
  profilePict: string | null;
};

export type CustomError = {
  message: string;
  status: string;
  statusCode: number;
};

export type SignInResult = {
  error: string | null;
  ok: boolean;
  status: number;
  url: string | null;
};
