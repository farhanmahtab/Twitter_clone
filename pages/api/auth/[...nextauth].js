import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  database: process.env.DB_URL,
  session: {
    jwt: true,
  },
  jwt: {
    secret: "1234",
  },
};
export default NextAuth(authOptions);
