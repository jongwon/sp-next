import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { TokenInfo } from "../../../data/login.data";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "Credential",
      credentials: {
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (
        credentials: Record<"username" | "password", string> | undefined,
        req: any
      ): Promise<any> => {
        // 만약에 token 이 오래되어 만료되었다면, refresh token 을 이용하여 token 을 재발급 받는다.
        const token = await (
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            body: JSON.stringify({
              type: "login",
              username: credentials?.username,
              password: credentials?.password,
            }),
          })
        ).json();

        if (token.error) {
          throw new Error("아이디 또는 비밀번호가 잘못되었습니다.");
        }

        const user = await (
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account`, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
        ).json();

        if (user) {
          return {
            user,
            token,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async (param: any): Promise<any> => {
      const { token, user } = param;
      if (user) {
        token.accessToken = user.token.accessToken;
        token.refreshToken = user.token.refreshToken;
        token.user = user.user;
      }
      return token as TokenInfo;
    },
  },
});
