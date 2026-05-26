import { getUsers } from "@/actions/users";
import UsersPageClient from "./users-page-client";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const { data: users = [] } = await getUsers();

  return <UsersPageClient initialUsers={users} />;
}
