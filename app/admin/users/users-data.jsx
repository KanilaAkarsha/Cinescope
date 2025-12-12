import React from "react";
import { searchUsers } from "@/actions/users";
import UserTable from "./user-table";

export default async function UsersData({ query = "" }) {
  //Fetch users data from database
  //option 1: fetch from api route
  //option 2: direct database query (server component)

  try {
    const { data: usersData = [] } = await searchUsers(query);
    // console.log( "Movies" , moviesData);

    if (!usersData.length) throw new Error("No users found");

    const refinedUsers = usersData.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role ?? "user",
      avatar: user.avatar ?? "/placeholder.svg?height=40&width=40",
      status: user.status,
      createdAt: user.createdAt ?? user._id.getTimestamp(),
    }));

    return <UserTable users={refinedUsers} />;
  } catch {
    return <div>No Users Available!</div>;
  }
}
