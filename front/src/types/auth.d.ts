export type LoginParams = {
  username: string;
  password: string;
};

export type LoginOKResponse = {
  token: string;
};

export type ApiErrorRespose = {
  error: string;
  message: string;
};

export type DecodedToken = {
  userId: string;
  username: string;
  profession: string;
  balance: number;
  role: string;
  iat: number;
  exp: number;
};
