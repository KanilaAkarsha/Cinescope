"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUser } from "@/actions/users";

const roles = ["admin", "moderator", "user"];

export default function AddUserForm({ showDialog }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState("user");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      image: formData.get("image"),
      role,
    };

    setIsSubmitting(true);

    try {
      const response = await createUser(user);

      if (response?.success) {
        toast.success("User created", {
          description: "The new user profile was added successfully.",
        });
        router.refresh();
        showDialog(false);
        return;
      }

      toast.error("Could not create user", {
        description: response?.message || "Please try again.",
      });
    } catch (error) {
      toast.error("Could not create user", {
        description: error?.message || "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            Name<span className="text-red-500">*</span>
          </Label>
          <Input id="name" name="name" placeholder="Full name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            Email<span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email address"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">
            Initial Password<span className="text-red-500">*</span>
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Set an initial password"
            required
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="image">Avatar URL</Label>
          <Input
            id="image"
            name="image"
            placeholder="Optional avatar image URL"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="role">
            Role<span className="text-red-500">*</span>
          </Label>
          <Select value={role} onValueChange={setRole} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((currentRole) => (
                <SelectItem key={currentRole} value={currentRole}>
                  {currentRole}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button
          type="reset"
          variant="outline"
          disabled={isSubmitting}
          onClick={() => showDialog(false)}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Add User"}
        </Button>
      </DialogFooter>
    </form>
  );
}
