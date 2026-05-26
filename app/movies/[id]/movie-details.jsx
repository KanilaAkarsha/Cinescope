"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { createReviewForMovie } from "@/actions/movies";
import { useSession } from "@/lib/auth-client";

function normalizeReview(review) {
  return {
    id:
      review.id ||
      review._id?.toString?.() ||
      `${review.userName || "review"}-${review.createdAt || Date.now()}`,
    userName: review.userName || "Anonymous",
    userAvatar: review.userAvatar || "",
    rating: Number(review.rating || 0),
    comment: review.comment || "",
    createdAt: review.createdAt || new Date().toISOString(),
    status: review.status || "approved",
  };
}

function getSafeAvatarUrl(image) {
  if (typeof image !== "string") return "";
  if (!image) return "";
  if (image.startsWith("data:")) return "";
  if (image.length > 512) return "";

  return image;
}

export default function MovieDetails({ movie, reviews, id }) {
  const router = useRouter();
  const { data: session } = useSession();
  const currentUser = session?.user;
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayedReviews, setDisplayedReviews] = useState(() =>
    (reviews || []).map(normalizeReview),
  );

  useEffect(() => {
    setDisplayedReviews((reviews || []).map(normalizeReview));
  }, [reviews]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewText.trim() || rating === 0) return;

    const userName = currentUser?.name || currentUser?.email || "Anonymous";
    const userAvatar = getSafeAvatarUrl(currentUser?.image);
    const optimisticReview = normalizeReview({
      id: `temp-${Date.now()}`,
      userName,
      userAvatar,
      rating,
      comment: reviewText.trim(),
      createdAt: new Date().toISOString(),
      status: "pending",
    });

    setDisplayedReviews((currentReviews) => [
      optimisticReview,
      ...currentReviews,
    ]);
    setIsSubmitting(true);

    try {
      await createReviewForMovie(id, {
        userName,
        userAvatar,
        rating,
        comment: reviewText.trim(),
        status: "pending",
      });

      setReviewText("");
      setRating(0);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold">Movie not found</h1>
          <p className="text-muted-foreground">
            The movie you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/" className="mt-4">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {movie && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full">
          <div
            className="relative h-[50vh] w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${movie.backdrop})`,
              backgroundPosition: "center 20%",
            }}>
            <div className="bg-linear-to-t from-background absolute inset-0 to-transparent" />
            <div className="container relative mx-auto flex h-full items-end px-4 pb-8">
              <Link href="/" className="absolute left-4 top-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-background/50 backdrop-blur-xs rounded-full">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:gap-8">
              <div className="relative -mt-32 overflow-hidden rounded-lg border md:w-75">
                <img
                  src={movie.poster || "/placeholder.svg"}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-6 flex-1 space-y-4 md:mt-0">
                <h1 className="text-3xl font-bold">
                  {movie.title}{" "}
                  <span className="text-muted-foreground">({movie.year})</span>
                </h1>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center">
                    <Star className="mr-1 h-5 w-5 fill-yellow-500 text-yellow-500" />
                    <span className="font-medium">{movie.rating}/10</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="text-muted-foreground mr-1 h-4 w-4" />
                    <span>{movie.runtime} min</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {movie.genre.map((genre) => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>

                <div>
                  <h2 className="text-xl font-semibold">Overview</h2>
                  <p className="text-muted-foreground mt-2">{movie.overview}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold">Director</h2>
                  <p className="text-muted-foreground mt-2">{movie.director}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Cast</h2>
                  <p className="text-muted-foreground mt-2">{movie.cast}</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold">Reviews</h2>

              <div className="mt-6 space-y-6">
                {displayedReviews.length > 0 ? (
                  displayedReviews.map((review) => (
                    <Card key={review.id}>
                      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        <Avatar>
                          <AvatarImage
                            src={review.userAvatar}
                            alt={review.userName}
                          />
                          <AvatarFallback>
                            {review.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">
                            {review.userName}
                          </CardTitle>
                          <div className="flex items-center">
                            <Star className="mr-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm">{review.rating}/10</span>
                            <span className="text-muted-foreground mx-2 text-xs">
                              •
                            </span>
                            <span className="text-muted-foreground text-xs">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {review.comment}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center">
                    No reviews yet. Be the first to review!
                  </p>
                )}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold">Write a Review</h3>
                <form onSubmit={handleSubmitReview} className="mt-4 space-y-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <span className="mr-2">Rating:</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-1">
                            <Star
                              className={`h-5 w-5 ${
                                star <= rating
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Textarea
                    placeholder="Share your thoughts about the movie..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="min-h-30"
                  />
                  <Button
                    type="submit"
                    disabled={
                      isSubmitting || rating === 0 || !reviewText.trim()
                    }>
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
