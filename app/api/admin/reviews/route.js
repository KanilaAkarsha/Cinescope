import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { db } from "@/db";

const ALLOWED_STATUSES = new Set(["pending", "approved", "rejected"]);

const normalizeReview = (review, movieTitleMap) => {
  const movieIdString =
    review?.movieId?.toString?.() || String(review?.movieId || "");

  return {
    id: review?._id?.toString?.() || review?.id,
    movieId: movieIdString,
    movieTitle: movieTitleMap.get(movieIdString) || "Unknown Movie",
    userId: review?.userId || "",
    userName: review?.userName || "Anonymous",
    userAvatar: review?.userAvatar || "/placeholder.svg?height=40&width=40",
    rating: Number(review?.rating || 0),
    comment: review?.comment || "",
    status: review?.status || "pending",
    createdAt: review?.createdAt || new Date().toISOString(),
  };
};

const buildMovieTitleMap = async (reviews) => {
  const objectIds = [];

  for (const review of reviews) {
    const rawMovieId =
      review?.movieId?.toString?.() || String(review?.movieId || "");
    if (ObjectId.isValid(rawMovieId)) {
      objectIds.push(ObjectId.createFromHexString(rawMovieId));
    }
  }

  if (objectIds.length === 0) {
    return new Map();
  }

  const uniqueIds = new Map();
  for (const id of objectIds) {
    uniqueIds.set(id.toString(), id);
  }

  const movies = await db
    .collection("movies_n")
    .find(
      { _id: { $in: Array.from(uniqueIds.values()) } },
      { projection: { title: 1 } },
    )
    .toArray();

  const movieTitleMap = new Map();
  for (const movie of movies) {
    movieTitleMap.set(movie._id.toString(), movie.title || "Unknown Movie");
  }

  return movieTitleMap;
};

export async function GET() {
  try {
    const reviews = await db
      .collection("reviews")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const movieTitleMap = await buildMovieTitleMap(reviews);

    return NextResponse.json(
      {
        success: true,
        data: reviews.map((review) => normalizeReview(review, movieTitleMap)),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/admin/reviews error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch reviews", data: [] },
      { status: 500 },
    );
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const reviewId = String(body?.reviewId || "").trim();
    const status = String(body?.status || "").trim();

    if (!reviewId || !ObjectId.isValid(reviewId)) {
      return NextResponse.json(
        { success: false, message: "Invalid review id" },
        { status: 400 },
      );
    }

    if (!ALLOWED_STATUSES.has(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 },
      );
    }

    const result = await db
      .collection("reviews")
      .updateOne(
        { _id: ObjectId.createFromHexString(reviewId) },
        { $set: { status } },
      );

    if (!result.matchedCount) {
      return NextResponse.json(
        { success: false, message: "Review not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Review updated" },
      { status: 200 },
    );
  } catch (error) {
    console.error("PATCH /api/admin/reviews error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update review" },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const reviewId = String(searchParams.get("reviewId") || "").trim();

    if (!reviewId || !ObjectId.isValid(reviewId)) {
      return NextResponse.json(
        { success: false, message: "Invalid review id" },
        { status: 400 },
      );
    }

    const result = await db
      .collection("reviews")
      .deleteOne({ _id: ObjectId.createFromHexString(reviewId) });

    if (!result.deletedCount) {
      return NextResponse.json(
        { success: false, message: "Review not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Review deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE /api/admin/reviews error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete review" },
      { status: 500 },
    );
  }
}
