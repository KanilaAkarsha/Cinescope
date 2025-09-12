"use client";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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
    error : false,
    message: "",

};

export default function LoginForm() {

    const[ error,setError] = useState(DEFAULT_ERROR);
    const[ isLoading,setIsLoading] = useState(false);

    const validateForm = ({email,password}) => {
        
        console.log("Email:", email);
        console.log("Password:", password);
        if (email === ""){
            setError({
                error: true,
                message: "Email is required",
            });
            return false;
        }else if (password === ""){
            setError({
                error: true,
                message: "Password is required",
            });
            return false;
        }else if (!EMAIL_REGEX.test(email)){
            setError({
                error: true,
                message: "Invalid email format",
            });
            return false;
        }

        setError(DEFAULT_ERROR);
        return true;
    }
    const handleSubmitForm = async (event) => {
        event.preventDefault(); 

        const formData = new FormData(event.currentTarget); 
        const email = formData.get("email");
        const password = formData.get("password");

        if (validateForm({email,password})) {
            console.log("Form is valid. Proceed with submission.");
            //pass the data to the api 
            setIsLoading(true);
            try {
                const response = await fetch("/api/v1/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });
                if(!response.ok){
                    const errorData = await response.json();
                    setError({
                        error: true,
                        message: errorData.message || "Login failed",
                    });
                }else{
                    const loginData = await response.json();
                    console.log("Login successful" , loginData);
                }
            } catch (error) { 
                setError({
                    error: true,
                    message: "unexpected error occurred. Please try again later.",
                });
                
            } finally{
                setTimeout(() => {
                setIsLoading(false);
                }, 3000);
            }
        }else{
            console.log("validation failed. Fix errors and try again.");
        }
    };
  return (
    <div className="flex flex-col">
        <Card>
            <CardHeader>
                <CardTitle>Login to Your Account</CardTitle>
                 <CardDescription>
                    Enter your email below to login to your account
                 </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmitForm} noValidate>
                    <div className="flex flex-col gap-6">
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
                            <Link
                                href="#"
                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                            >
                                Forgot your password?
                            </Link>
                            </div>
                             <Input 
                             id="password" 
                             type="password" 
                             name="password" 
                             autoComplete="current-password"
                             placeholder="Enter your password"
                             required />
                            </div>
                            <div className="flex justify-center ">
                                {error.error && <span className="text-red-600 text-xs text-center animate-pulse duration-700">{error.message}</span>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading && <Loader2 className="animate-spin"/>} Login
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Login with Google
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/signup" className="underline underline-offset-4">
                                    Sign up
                                </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
  )
}
