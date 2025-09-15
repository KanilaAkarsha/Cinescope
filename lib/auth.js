import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "@/db"; // your mongodb client

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
    enabled: true, 
  }, 
  sessions: {
    expieresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    refreshAge: 0, // desable refresh token
  }
});