import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import User from "../../../models/User";
// import connect from "@/db/connect";
import conncetMongoose from "@/Utils/db";
import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/models/User";
import bcrypt from "bcrypt";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          await conncetMongoose();
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("No user found");
          }
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            throw new Error("Invalid password");
          }
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  pages: {
    signin: "/auth/signin",
  },
  callbacks: {
    async session({ session, token, params }) {
      session.user.id = token.id;
      session.user.username = token.username
      session.user.image=token.image;
      session.user.isComplete = token.isComplete;
      session.user.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.image = user.profilePicture;
        token.isComplete = user?.isComplete || false;
        token.accessToken = user?.accessToken || "";
      }
      if (account) {
        // token.accessToken = account.access_token;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  database: process.env.DB_URL,
  session: {
    jwt: true,
  },
  jwt: {
    secret: "1234",
  },
};
export default NextAuth(authOptions);
