const { default: NextAuth } = require("next-auth/next");
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "../../../lib/db";
import User from "../../models/user";

const authOptions = {
  debugger:true,
  adapter: MongoDBAdapter(client),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        try {
          // Ensure MongoDB connection
          if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI);
          }

          const user = await User.findOne({ email: credentials.email });

          // Check if user exists
          if (!user) {
            console.log("User not found");
            return null; // Return null if user is not found
          }

          // Verify password
          const passwordVerify = bcrypt.compareSync(
            credentials.password,
            user.password
          );

          if (!passwordVerify) {
            console.log("Invalid password");
            return null; 
          }

          console.log('Login successful');
          return user; // Return user object upon successful login
        } catch (error) {
          console.error("An error occurred during authorization", error);
          return null; // Return null on error
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
