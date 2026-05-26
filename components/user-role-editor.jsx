"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUserRole } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roles = ["admin", "moderator", "user"];

export default function UserRoleEditor({ userId, initialRole, canEdit }) {
  const router = useRouter();
  const [role, setRole] = useState(initialRole);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!canEdit || role === initialRole) return;

    setIsSubmitting(true);

    try {
      const response = await updateUserRole(userId, role);

      if (response?.success) {
        toast.success("Role updated", {
          description: "The user role was saved successfully.",
        });
        router.refresh();
        return;
      }

      toast.error("Could not update role", {
        description: response?.message || "Please try again.",
      });
    } catch (error) {
      toast.error("Could not update role", {
        description: error?.message || "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select value={role} onValueChange={setRole} disabled={!canEdit}>
          <SelectTrigger id="role" className="w-full">
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
      <Button
        type="button"
        className="w-full"
        disabled={!canEdit || isSubmitting || role === initialRole}
        onClick={handleSave}>
        {isSubmitting ? "Saving..." : "Save Role"}
      </Button>
      {canEdit ? null : (
        <p className="text-muted-foreground text-xs">
          You can only change other users&apos; roles.
        </p>
      )}
    </div>
  );
}
