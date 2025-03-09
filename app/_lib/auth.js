import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn(user, account, profile) {
      try {
        const { name, email } = user.user;
        const existingGuest = await getGuest(email);

        if (!existingGuest) {
          await createGuest({ email: email, fullname: name });
        }
        return true;
      } catch (err) {
        return false;
      }
    },
    async session({ session, user }) {
      try {
        const guest = await getGuest(session.user.email);
        if (!guest) {
          throw new Error("Guest not found");
        }
        session.user.guestId = guest.id;
        return session;
      } catch (err) {
        console.error("Error in session callback:", err);
        return session;
      }
    },
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
