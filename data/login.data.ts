export interface User {
  userId: string;
  name: string;
  authorities?: string[];
}

export interface TokenInfo {
  name?: string;
  email?: string;
  picture?: string;
  sub?: string;
  token: {
    accessToken?: string;
    refreshToken?: string;
    user: User;
  };
}
