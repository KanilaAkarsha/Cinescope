import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { updateUser } from "@/actions/users";

const buildProfileUpdates = (body, session) => {
  const {
    avatarUrl,
    firstName,
    lastName,
    email,
    phone,
    bio,
    language,
    timezone,
  } = body || {};

  const profileUpdates = {};
  const name = [firstName, lastName].filter(Boolean).join(" ").trim();

  if (firstName !== undefined) profileUpdates.firstName = firstName;
  if (lastName !== undefined) profileUpdates.lastName = lastName;
  if (email !== undefined) profileUpdates.email = email;
  if (avatarUrl !== undefined) profileUpdates.image = avatarUrl;
  if (phone !== undefined) profileUpdates.phone = phone;
  if (bio !== undefined) profileUpdates.bio = bio;
  if (language !== undefined) profileUpdates.language = language;
  if (timezone !== undefined) profileUpdates.timezone = timezone;

  if (name) {
    profileUpdates.name = name;
  }

  if (Object.keys(profileUpdates).length > 0) {
    profileUpdates.name =
      profileUpdates.name || session.user.name || "Admin User";
    profileUpdates.email = profileUpdates.email || session.user.email;
    profileUpdates.image = profileUpdates.image || session.user.image || "";
  }

  return profileUpdates;
};

const changePasswordIfRequested = async (req, currentPassword, newPassword) => {
  if (!currentPassword || !newPassword) {
    return { success: true };
  }

  const passwordChange = await auth.api.changePassword({
    headers: req.headers,
    body: {
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    },
  });

  if (!passwordChange) {
    return {
      success: false,
      response: NextResponse.json(
        { success: false, message: "Failed to change password" },
        { status: 500 },
      ),
    };
  }

  return { success: true };
};

export async function PATCH(req) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { userId, currentPassword, newPassword } = body || {};

    if (!userId || userId !== session.user.id) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 },
      );
    }

    const profileUpdates = buildProfileUpdates(body, session);

    if (Object.keys(profileUpdates).length > 0) {
      await updateUser(profileUpdates, userId);

      // Also inform the auth system so the session cookie is updated with
      // the latest user fields (e.g. phone, bio, image). This keeps
      // `useSession()` in sync without requiring a full page reload.
      try {
        await auth.api.updateUser({
          headers: req.headers,
          body: profileUpdates,
        });
      } catch (e) {
        console.warn("auth.api.updateUser failed to update session cookie:", e);
      }
    }

    const passwordChange = await changePasswordIfRequested(
      req,
      currentPassword,
      newPassword,
    );

    if (!passwordChange.success) {
      return passwordChange.response;
    }

    return NextResponse.json(
      {
        success: true,
        message:
          currentPassword && newPassword
            ? "Profile and password updated successfully"
            : "Profile updated successfully",
        data: profileUpdates ?? null,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("/api/admin/profile error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
