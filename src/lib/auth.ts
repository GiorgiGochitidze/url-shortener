import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "./models/User";
import * as bcrypt from "bcryptjs";
import { connectDB } from "./mongodb";
import { AdapterUser } from "next-auth/adapters";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        await connectDB();

        const user = await User.findOne({ email: credentials.email as string });
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password as string,
        );
        if (!isValid) return null;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user)
        token.id = (user as AdapterUser & { _id: string })._id?.toString();
      return token;
    },
    async session({ session, token }) {
      if (token.id) session.user.id = token.id as string;
      return session;
    },
  },
});
