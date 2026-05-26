import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { ArrowLeft, Mail, Shield, User, CalendarDays } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserRoleEditor from "@/components/user-role-editor";

export const dynamic = "force-dynamic";

function getInitials(name, email) {
  const source = name || email || "U";

  return source
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("")
    .slice(0, 2);
}

function formatDate(value) {
  if (!value) return "Recently";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getRoleBadgeClass(role) {
  if (role === "admin") {
    return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
  }

  if (role === "moderator") {
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  }

  return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
}

export default async function UserProfilePage({ params }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const currentUserId = session?.user?.id?.toString?.() ?? session?.user?.id;
  const { id: userId } = await params;

  if (!ObjectId.isValid(userId)) {
    notFound();
  }

  const user = await db.collection("user").findOne(
    { _id: ObjectId.createFromHexString(userId) },
    {
      projection: {
        name: 1,
        email: 1,
        image: 1,
        avatar: 1,
        role: 1,
        emailVerified: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  );

  if (!user) {
    notFound();
  }

  const normalizedUser = {
    id: user._id.toString(),
    name: user.name || user.email || "Unknown User",
    email: user.email || "No email available",
    avatar: user.image || user.avatar || "",
    role: user.role || "user",
    emailVerified: Boolean(user.emailVerified),
    createdAt: user.createdAt || user._id,
    updatedAt: user.updatedAt || null,
  };

  const canEditRole =
    session?.user?.role === "admin" && currentUserId !== normalizedUser.id;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Profile</h2>
          <p className="text-muted-foreground">
            Review user details and manage access roles.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/users">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to users
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={normalizedUser.avatar}
                  alt={normalizedUser.name}
                />
                <AvatarFallback className="text-xl">
                  {getInitials(normalizedUser.name, normalizedUser.email)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {normalizedUser.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {normalizedUser.email}
                  </p>
                </div>
                <Badge className={getRoleBadgeClass(normalizedUser.role)}>
                  {normalizedUser.role}
                </Badge>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg border p-4">
                <User className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">User ID</p>
                  <p className="text-muted-foreground text-sm">
                    {normalizedUser.id}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-4">
                <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email status</p>
                  <p className="text-muted-foreground text-sm">
                    {normalizedUser.emailVerified ? "Verified" : "Unverified"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-4">
                <CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-muted-foreground text-sm">
                    {formatDate(normalizedUser.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-4">
                <Shield className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Updated</p>
                  <p className="text-muted-foreground text-sm">
                    {formatDate(normalizedUser.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Management</CardTitle>
          </CardHeader>
          <CardContent>
            <UserRoleEditor
              userId={normalizedUser.id}
              initialRole={normalizedUser.role}
              canEdit={canEditRole}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
