import { headers } from "next/headers";
import { getUserById } from "@/actions/users";
import { auth } from "@/lib/auth";

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      isAuthenticated: false,
      session: null,
      user: null,
    };
  }

  const authUser = session?.user ?? null;
  const userId = authUser?.id || session?.session?.userId || session?.userId;
  const userResult = userId ? await getUserById(userId) : null;
  const dbUser = userResult?.success ? userResult.data : null;

  return {
    isAuthenticated: true,
    session,
    user: dbUser || authUser,
  };
};
