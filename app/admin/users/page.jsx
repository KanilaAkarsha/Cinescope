"use client";

import { User } from "lucide-react";
import UsersData from "./users-data";
import UserSelectors from "./user-selectors";

export default async function UsersPage(props) {
  // Filter and sort users
  const searchParams = await props.searchParams;
  const searchQuery = searchParams?.query || "";

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        <p className="text-muted-foreground">
          Manage user accounts and permissions
        </p>
      </div>
      <UserSelectors />
      <UsersData query={searchQuery} />
    </div>
  );
}
