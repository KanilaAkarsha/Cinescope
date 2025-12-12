"use server";
import { db } from "@/db";
import { ObjectId } from "mongodb";

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
      .findOne({ _id: new ObjectId(userId) });

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

export const createUser = async (user) => {
  try {
    const result = await db.collection("user").insertOne(user);

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
    const result = await db.collection("user").updateOne(
      { _id: userId }, // Filter to find the user by its ID
      { $set: userDoc },
      { upsert: true } // Update the user with the new data
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
    const result = await db
      .collection("user")
      .updateOne({ _id: userId }, { $set: { role: newRole } });

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
