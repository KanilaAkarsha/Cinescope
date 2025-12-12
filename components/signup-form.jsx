"use client";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { use } from "react";
import { EMAIL_REGEX } from "@/lib/constants";

const DEFAULT_ERROR = {
  error: false,
  message: "",
};

export default function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState(DEFAULT_ERROR);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = ({
    first_name,
    last_name,
    email,
    password,
    confirmPassword,
  }) => {
    console.log("Email:", email);
    console.log("Password:", password);
    if (first_name === "") {
      setError({
        error: true,
        message: "First Name is required",
      });
      return false;
    } else if (last_name === "") {
      setError({
        error: true,
        message: "Last Name is required",
      });
      return false;
    } else if (email === "") {
      setError({
        error: true,
        message: "Email is required",
      });
      return false;
    } else if (password === "") {
      setError({
        error: true,
        message: "Password is required",
      });
      return false;
    } else if (!EMAIL_REGEX.test(email)) {
      setError({
        error: true,
        message: "Invalid email format",
      });
      return false;
    } else if (password !== confirmPassword) {
      setError({
        error: true,
        message: "Passwords do not match",
      });
      return false;
    }

    setError(DEFAULT_ERROR);
    return true;
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const first_name = formData.get("first-name");
    const last_name = formData.get("last-name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (
      validateForm({ first_name, last_name, email, password, confirmPassword })
    ) {
      console.log("Form is valid. Proceed with submission.");
      //pass the data to the api
      setIsLoading(true);
      try {
        await signUp.email(
          { email, password },
          {
            onSuccess: (ctx) => {
              console.log("Login successful", ctx);
              router.push("/admin");
            },
            onError: (ctx) => {
              setError({
                error: true,
                message: ctx.error.message || "Login failed",
              });
            },
          }
        );
      } catch (error) {
        setError({
          error: true,
          message: "unexpected error occurred. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("validation failed. Fix errors and try again.");
    }
  };
  return (
    <div className="flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitForm} noValidate>
            <div className="flex flex-col gap-6">
              <div className="flex flex-row gap-6 justify-between">
                <div className="grid gap-3">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input
                  id="confirm-password"
                  type="password"
                  name="confirm-password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="flex justify-center ">
                {error.error && (
                  <span className="text-red-600 text-xs text-center animate-pulse duration-700">
                    {error.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="animate-spin" />} Sign Up
                </Button>
                <Button variant="outline" className="w-full">
                  Sign Up with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
