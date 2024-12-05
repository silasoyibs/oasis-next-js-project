import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOGGLE_ID,
      clientSecret: process.env.AUTH_GOGGLE_SECERT,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    // async signIn({ user, account, profile }) {
    //   try {
    //     const existingGuest = await getGuest(user.email);
    //     if (!existingGuest)
    //       await createGuest({ email: user.email, fullName: user.name });
    //     return true;
    //   } catch (error) {
    //     return false;
    //     console.log("Erorr", error);
    //   }
    // },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
