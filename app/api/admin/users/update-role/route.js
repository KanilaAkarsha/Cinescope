import { NextResponse } from "next/server";
import { updateUserRole } from "@/actions/users";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, role } = body || {};

    if (!userId || !role) {
      return NextResponse.json(
        { success: false, message: "Missing userId or role" },
        { status: 400 },
      );
    }

    const result = await updateUserRole(userId, role);

    if (result?.success) {
      return NextResponse.json(result, { status: 200 });
    }

    return NextResponse.json(
      { success: false, message: "Failed to update role" },
      { status: 500 },
    );
  } catch (error) {
    console.error("/api/admin/users/update-role error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
