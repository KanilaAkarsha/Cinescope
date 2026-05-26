import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { db } from "@/db";
import { auth } from "@/lib/auth";

const normalizeReview = (review) => ({
  id: review?._id?.toString?.() || review?.id,
  movieId: review?.movieId?.toString?.() || review?.movieId || "",
  userId: review?.userId || "",
  userName: review?.userName || "Anonymous",
  userAvatar: review?.userAvatar || "/placeholder.svg?height=40&width=40",
  rating: Number(review?.rating || 0),
  comment: review?.comment || "",
  status: review?.status || "approved",
  createdAt: review?.createdAt || new Date().toISOString(),
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const movieId = searchParams.get("movieId");

    if (!movieId || !ObjectId.isValid(movieId)) {
      return NextResponse.json(
        { success: false, message: "Invalid movie id", data: [] },
        { status: 400 },
      );
    }

    const reviews = await db
      .collection("reviews")
      .find({ movieId: ObjectId.createFromHexString(movieId) })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        message: "Reviews fetched successfully",
        data: reviews.map(normalizeReview),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/v1/reviews error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", data: [] },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const movieId = body?.movieId;
    const rating = Number(body?.rating);
    const comment = String(body?.comment || "").trim();

    if (!movieId || !ObjectId.isValid(movieId)) {
      return NextResponse.json(
        { success: false, message: "Invalid movie id" },
        { status: 400 },
      );
    }

    if (!Number.isFinite(rating) || rating < 1 || rating > 10) {
      return NextResponse.json(
        { success: false, message: "Rating must be between 1 and 10" },
        { status: 400 },
      );
    }

    if (!comment) {
      return NextResponse.json(
        { success: false, message: "Review comment is required" },
        { status: 400 },
      );
    }

    const session = await auth.api.getSession({ headers: req.headers });
    const user = session?.user;

    const reviewDoc = {
      movieId: ObjectId.createFromHexString(movieId),
      userId: user?.id || "",
      userName: user?.name || "Anonymous",
      userAvatar: user?.image || "/placeholder.svg?height=40&width=40",
      rating,
      comment,
      status: "approved",
      createdAt: new Date().toISOString(),
    };

    const result = await db.collection("reviews").insertOne(reviewDoc);

    if (!result.acknowledged) {
      return NextResponse.json(
        { success: false, message: "Failed to create review" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Review submitted successfully",
        data: normalizeReview({ ...reviewDoc, _id: result.insertedId }),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/v1/reviews error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
