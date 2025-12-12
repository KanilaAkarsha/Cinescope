"use client";

import { useState, useEffect } from "react";
import UsersData from "./users-data";
import UserSelectors from "./user-selectors";

export default function UsersPage(props) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getSearchParams = async () => {
      const searchParams = await props.searchParams;
      setSearchQuery(searchParams?.query || "");
    };
    getSearchParams();
  }, [props.searchParams]);

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
