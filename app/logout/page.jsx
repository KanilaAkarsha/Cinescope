"use client";
import {signOut} from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function Logoutpage() {
   const handleSignOut = async () => {
    await signOut();
    };
  return (
    <div className="flex justify-center my-12"><Button onClick={() => handleSignOut()}>Logout</Button></div>
  )
}
