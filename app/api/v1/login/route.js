import { NextResponse } from "next/server";

const VALID_EMAIL = "kanilasaman1@gmail.com";
const VALID_PASSWORD = "12345678";

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "https://cinescope-mu.vercel.app",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    },
  );
}

const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? "https://cinescope-mu.vercel.app"
    : "http://localhost:3000";

export const POST = async (request) => {
  try {
    const { email, password } = await request.json();
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      return NextResponse.json(
        {
          success: true,
          message: "Login successful",
        },
        {
          headers: {
            "Access-Control-Allow-Origin": allowedOrigin,
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during login",
      },
      { status: 500 },
    );
  }
};
