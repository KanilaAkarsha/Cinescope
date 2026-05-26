import { createAuthClient } from "better-auth/react";

const baseURL =
  globalThis.window?.location.origin ?? process.env.NEXT_PUBLIC_API_URL;

export const { signIn, signUp, signOut, updateUser, useSession } =
  createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */

    baseURL,
  });
