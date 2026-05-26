"use server";
import { db } from "@/db";
import { ObjectId } from "mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ALLOWED_ROLES = new Set(["admin", "moderator", "user"]);

async function requireAdminSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.role !== "admin") {
    return null;
  }

  return session;
}

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
    const user = await db
      .collection("user")
      .findOne({ _id: ObjectId.createFromHexString(userId) });

    if (user) {
      return {
        success: true,
        message: "User fetched successfully",
        data: user,
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
  try {
    const users = await db
      .collection("user")
      .find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      })
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

export const createUser = async (user) => {
  try {
    const session = await requireAdminSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const role = ALLOWED_ROLES.has(user?.role) ? user.role : "user";
    const userDoc = {
      name: user?.name?.trim() || user?.email?.trim() || "Unknown User",
      email: user?.email?.trim() || "",
      role,
      emailVerified: Boolean(user?.emailVerified),
    };

    if (!userDoc.email) {
      return {
        success: false,
        message: "Email is required",
      };
    }

    if (!user?.password?.trim()) {
      return {
        success: false,
        message: "Password is required",
      };
    }

    if (typeof auth.api.createUser === "function") {
      const createdUser = await auth.api.createUser({
        body: {
          email: userDoc.email,
          name: userDoc.name,
          password: user.password,
          role,
          data: {
            image: user?.image?.trim() || "",
          },
        },
        headers: await headers(),
      });

      return {
        success: true,
        message: "User Created Successfully",
        data: createdUser?.user ?? null,
      };
    }

    return {
      success: false,
      message: "Create user endpoint is unavailable",
    };
  } catch (error) {
    console.log("Error creating user:", error);
    return {
      success: false,
      message: error?.message || "Error creating user",
    };
  }
};

export const updateUser = async (userDoc, userId) => {
  try {
    await db.collection("user").updateOne(
      { _id: userId }, // Filter to find the user by its ID
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
    const result = await db.collection("user").deleteOne({ _id: userId });

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
    const session = await requireAdminSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    if (!ObjectId.isValid(userId)) {
      return {
        success: false,
        message: "Invalid user id",
      };
    }

    if (session.user.id === userId) {
      return {
        success: false,
        message: "You cannot change your own role",
      };
    }

    if (!ALLOWED_ROLES.has(newRole)) {
      return {
        success: false,
        message: "Invalid role",
      };
    }

    let authRoleUpdated = false;

    if (typeof auth.api.setRole === "function") {
      try {
        await auth.api.setRole({
          body: {
            userId,
            role: newRole,
          },
          headers: await headers(),
        });
        authRoleUpdated = true;
      } catch (error) {
        console.log("Error syncing auth role:", error);
      }
    }

    const { matchedCount, modifiedCount } = await db
      .collection("user")
      .updateOne(
        { _id: ObjectId.createFromHexString(userId) },
        { $set: { role: newRole, updatedAt: new Date() } },
      );

    if (matchedCount > 0) {
      console.log(`A user was updated with the _id: ${userId}`);

      return {
        success: true,
        message: "User Updated Successfully",
        authRoleUpdated,
        modifiedCount,
      };
    } else {
      return undefined;
    }
  } catch (error) {
    console.log("Error updating user:", error);
    return {
      success: false,
      message: "Error updating user role",
    };
  }
};
