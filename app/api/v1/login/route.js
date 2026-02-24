import { NextResponse } from "next/server";

const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? "https://cinescope-mu.vercel.app"
    : "http://localhost:3000";

const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Handle preflight OPTIONS request
export const OPTIONS = () => {
  return NextResponse.json({}, { headers: corsHeaders });
};

// Handle POST login
export const POST = async (request) => {
  try {
    const { email, password } = await request.json();

    if (email === "kanilasaman1@gmail.com" && password === "kanila1234") {
      return NextResponse.json(
        { success: true, message: "Login successful" },
        { headers: corsHeaders },
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401, headers: corsHeaders },
      );
    }
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during login" },
      { status: 500, headers: corsHeaders },
    );
  }
};
