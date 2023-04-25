import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import User from "../../../models/User";
// import connect from "@/db/connect";
import conncetMongoose from "@/Utils/db";
import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/models/User";
import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";

export const authOptions = (reqM) => {
  return {
    session: {
      strategy: "jwt",
    },
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {},
        async authorize(credentials) {
          const { email, password } = credentials;
          try {
            await conncetMongoose();
            if (!email && !password) {
              //console.log(reqM);
              const token = await getToken({ req: reqM });
              console.log(token);
              const user = await User.findById(token.id);
              console.log(token.id);
              return user;
            } else {
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
            }
          } catch (error) {
            console.log(error);
          }
        },
      }),
    ],
    pages: {
      signin: "/auth/signin",
      // signIn: "/?modal=signin",
    },
    callbacks: {
      async session({ session, token, params }) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.profilePicture = token.profilePicture;
        return session;
      },
      async jwt({ token, user, account }) {
        if (user) {
          const user = await User.findOne({ email: token.email });
          token = user;
          token.id = user._id;
          token.name = user.name;
          token.username = user.username;
          token.email = user.email;
          token.profilePicture = user.profilePicture;
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
                username: user.email.split("@")[0],
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
