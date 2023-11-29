import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Имя:",
          type: "text",
          placeholder: "Lexus",
        },
        password: {
          label: "Пароль:",
          type: "password",
          placeholder: "Твой улётный пароль",
        },
      },
      async authorize(credentials) {
        const user = { id: "252", name: "Леха", password: "lexa" };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
