import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import User from "../../../models/User";
import conncetMongoose from "@/Utils/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = (reqM) => {
  return {
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
            if (!email && !password) {
              const token = await getToken({ req: reqM });
              const user = await UserDBV2.findById(token.id);
              return user;
            }
            const user = await User.findOne({ email });
            if (!user) {
              throw new Error("No user found");
            }
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
              throw new Error("Invalid password");
            }
            //console.log(user);
            user.image = user.profilePicture;
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
        session.user = token;
        // session.user.username = token.username;
        // session.user.picture = token.image;
        // session.user.isComplete = token.isComplete;
        // session.user.accessToken = token.accessToken;
        return session;
      },
      async jwt({ token, user, account }) {
        if (user) {
          token.id = user.id;
          token.username = user.username;
          //token.image = user.profilePicture;
          // token.isComplete = user?.isComplete || false;
          // token.accessToken = user?.accessToken || "";
        }
        if (account) {
          // token.accessToken = account.access_token;
        }
        return token;
      },
      async signIn({ user, account }) {
        if (account) {
          try {
            const { email, name, image } = user;
            await conncetMongoose();
            const existingUser = await User.findOne({ email: email });
            if (!existingUser) {
              const newUser = await User.create({
                name,
                username: name,
                email,
                profilePicture: image,
                coverPhoto: image,
                bio: "",
                followers: [],
                following: [],
              });
              await newUser.save();
              console.log("new user created");
              console.log(newUser);
            }
          } catch (err) {
            console.log(err);
            return false;
          }
          return true;
        }
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
};
export default (req, res) => NextAuth(req, res, authOptions(req));
