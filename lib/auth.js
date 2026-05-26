import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { genericOAuth, oneTap } from "better-auth/plugins";
import { db } from "@/db"; // your mongodb client

const googleOAuthConfig = {
  providerId: "google",
  discoveryUrl: "https://accounts.google.com/.well-known/openid-configuration",
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  scopes: ["openid", "email", "profile"],
  pkce: true,
  authorizationUrlParams: {
    access_type: "offline",
    prompt: "consent",
  },
};

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  sessions: {
    expieresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    refreshAge: 0, // desable refresh token
  },
  plugins: [
    genericOAuth({ config: [googleOAuthConfig] }),
    oneTap({ clientId: process.env.GOOGLE_CLIENT_ID }),
  ],
});
