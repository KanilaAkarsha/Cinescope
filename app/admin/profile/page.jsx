"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Camera, Check, Edit, Mail, Shield, User } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { updateUser, useSession } from "@/lib/auth-client";

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

async function fileToCompressedDataUrl(file) {
  const imageBitmap = await createImageBitmap(file);
  const maxSize = 256;
  const scale = Math.min(
    maxSize / imageBitmap.width,
    maxSize / imageBitmap.height,
    1,
  );
  const width = Math.max(1, Math.round(imageBitmap.width * scale));
  const height = Math.max(1, Math.round(imageBitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Unable to process image.");
  }

  context.drawImage(imageBitmap, 0, 0, width, height);

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.8),
  );

  if (!blob) {
    throw new Error("Unable to compress image.");
  }

  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(typeof reader.result === "string" ? reader.result : "");
    };
    reader.onerror = () => reject(new Error("Unable to read image."));
    reader.readAsDataURL(blob);
  });
}

export default function ProfilePage() {
  const { data: session, isPending, refetch } = useSession();
  const user = session?.user;
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    if (!user) return;

    setFormState({
      name: user.name || "",
      image: user.image || "",
    });
  }, [user?.id]);

  const initials = useMemo(
    () => getInitials(formState.name || user?.name, user?.email),
    [formState.name, user?.name, user?.email],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleAvatarPick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      event.target.value = "";
      return;
    }

    try {
      const result = await fileToCompressedDataUrl(file);
      setFormState((current) => ({
        ...current,
        image: result,
      }));
      setIsEditing(true);
    } catch (error) {
      toast.error("Could not process image.", {
        description: error?.message || "Please try a smaller image.",
      });
    }

    event.target.value = "";
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setIsSubmitting(true);

    try {
      await updateUser({
        name: formState.name.trim(),
        image: formState.image.trim() || null,
      });

      await refetch();
      setIsEditing(false);
      toast.success("Profile updated", {
        description: "Your account details were saved successfully.",
      });
    } catch (error) {
      toast.error("Could not update profile", {
        description: error?.message || "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground">
            Loading your account details...
          </p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="h-40 animate-pulse rounded-lg bg-muted" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground">
            Sign in to view and edit your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src={formState.image || user.image || ""}
                    alt={user.name || user.email}
                  />
                  <AvatarFallback className="text-4xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                  type="button"
                  onClick={handleAvatarPick}>
                  <Camera className="h-4 w-4" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold">{user.name || user.email}</h3>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsEditing((current) => !current)}
                type="button">
                {isEditing ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Done Editing
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="text-muted-foreground h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">Signed in user</p>
                  <p className="text-muted-foreground text-xs">
                    {user.emailVerified
                      ? "Email verified"
                      : "Email not verified"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-muted-foreground h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-muted-foreground text-xs">Email</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="text-muted-foreground h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">
                    Joined {formatDate(user.createdAt)}
                  </p>
                  <p className="text-muted-foreground text-xs">Account</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update the real profile data linked to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Your display name"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="image">Avatar URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formState.image}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="https://..."
                />
                <p className="text-muted-foreground text-xs">
                  Paste an image URL or use the camera button to upload a
                  compressed profile picture.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user.email} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="verified">Status</Label>
                <Input
                  id="verified"
                  value={user.emailVerified ? "Verified" : "Not verified"}
                  disabled
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSaveProfile}
              disabled={isSubmitting || !isEditing}
              className="ml-auto"
              type="button">
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
