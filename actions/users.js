"use server";
import { db } from "@/db";
import { ObjectId } from "mongodb";

const serializeDate = (date) => date?.toISOString?.() || date || "";

const normalizeUser = (user) => ({
  ...user,
  id: user?._id?.toString?.() || user?.id,
  _id: user?._id?.toString?.() || user?._id,
  name: user?.name ?? "Unknown User",
  email: user?.email ?? "",
  role: user?.role ?? "user",
  status: user?.status ?? "active",
  createdAt: serializeDate(user?.createdAt) || new Date().toISOString(),
  updatedAt: serializeDate(user?.updatedAt),
});

const buildUserIdFilter = (userId) => {
  const id = String(userId ?? "").trim();

  if (!id) {
    return null;
  }

  const filters = [{ _id: id }, { id }];

  if (ObjectId.isValid(id)) {
    filters.unshift({ _id: new ObjectId(id) });
  }

  return { $or: filters };
};

export const getUsers = async () => {
  try {
    const users = await db.collection("user").find({}).toArray();

    return {
      success: true,
      message: "Users fetched successfully",
      data: users.map(normalizeUser),
    };
  } catch (error) {
    console.log("Error fetching users:", error);
    return {
      success: false,
      message: "Error fetching users",
      data: [],
    };
  }
};

export const getUser = async (query) => {
  try {
    const users = await db
      .collection("user")
      .find({ name: { $regex: query, $options: "i" } })
      .limit(50)
      .toArray();
    console.log("users", users);
    if (users && users.length > 0) {
      return {
        success: true,
        message: "Users fetched successfully",
        data: users,
      };
    } else {
      return {
        success: false,
        message: "No users found",
        data: [],
      };
    }
  } catch (error) {
    console.log("Error fetching users:", error);
    return {
      success: false,
      message: "Error fetching users",
      data: [],
    };
  }
};

export const getUserById = async (userId) => {
  try {
    const filter = buildUserIdFilter(userId);

    if (!filter) {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }

    const user = await db.collection("user").findOne(filter);

    if (user) {
      return {
        success: true,
        message: "User fetched successfully",
        data: normalizeUser(user),
      };
    } else {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }
  } catch (error) {
    console.log("Error fetching user by ID:", error);
    return {
      success: false,
      message: "Error fetching user",
      data: null,
    };
  }
};

export const searchUsers = async (query) => {
  const result = await getUser(query);

  return {
    ...result,
    message: result.success ? "Users searched successfully" : result.message,
  };
};

export const createUser = async (user) => {
  try {
    const now = new Date().toISOString();
    const result = await db.collection("user").insertOne({
      ...user,
      createdAt: user?.createdAt || now,
      updatedAt: user?.updatedAt || now,
    });

    if (result.acknowledged) {
      console.log(`A user was inserted with the _id: ${result.insertedId}`);

      return {
        success: true,
        message: "User Created Successfully",
      };
    } else {
      return undefined;
    }
  } catch (error) {
    console.log("Error creating user:", error);
    return undefined;
  }
};

export const updateUser = async (userDoc, userId) => {
  try {
    const filter = buildUserIdFilter(userId);

    if (!filter) {
      return undefined;
    }

    await db.collection("user").updateOne(
      filter, // Filter to find the user by its ID
      { $set: userDoc },
      { upsert: true }, // Update the user with the new data
    );
  } catch (error) {
    console.log("Error updating user:", error);
    return undefined;
  }
};

export const deleteUser = async (userId) => {
  try {
    const filter = buildUserIdFilter(userId);

    if (!filter) {
      return undefined;
    }

    const result = await db.collection("user").deleteOne(filter);

    if (result.acknowledged) {
      console.log(`A user was deleted with the _id: ${result.insertedId}`);

      return {
        success: true,
        message: "User Deleted Successfully",
      };
    } else {
      return undefined;
    }
  } catch (error) {
    console.log("Error deleting user:", error);
    return undefined;
  }
};

export const updateUserRole = async (userId, newRole) => {
  try {
    const filter = buildUserIdFilter(userId);

    if (!filter) {
      return undefined;
    }

    const result = await db
      .collection("user")
      .updateOne(filter, { $set: { role: newRole } });

    if (result.acknowledged) {
      console.log(`A user was updated with the _id: ${result.upsertedId}`);

      return {
        success: true,
        message: "User Updated Successfully",
      };
    } else {
      return undefined;
    }
  } catch (error) {
    console.log("Error updating user:", error);
    return undefined;
  }
};
