import Link from "next/link";
import { ArrowLeft, Film, MessageSquare, Star } from "lucide-react";
import { getMovieById, getReviewsForMovie } from "@/actions/movies";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

function formatDate(value) {
  if (!value) return "Recently";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function normalizeReview(review) {
  return {
    id: review._id?.toString?.() || review.id,
    userName: review.userName || "Anonymous",
    rating: Number(review.rating || 0),
    comment: review.comment || "",
    status: review.status || "pending",
    createdAt: review.createdAt || review._id,
  };
}

export default async function AdminMovieDetailsPage({ params }) {
  const { id } = params;
  const [movie, reviews] = await Promise.all([
    getMovieById(id),
    getReviewsForMovie(id),
  ]);

  if (!movie?.success || !movie?.data) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Movie details</h2>
          <p className="text-muted-foreground">The movie was not found.</p>
        </div>
        <Link href="/admin/movies">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to movies
          </Button>
        </Link>
      </div>
    );
  }

  const reviewList = (reviews?.data || []).map(normalizeReview);
  const approvedCount = reviewList.filter((review) => review.status === "approved").length;
  const pendingCount = reviewList.filter((review) => review.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Movie details</h2>
          <p className="text-muted-foreground">
            Admin view for the selected movie and its review activity.
          </p>
        </div>
        <Link href="/admin/movies">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card className="overflow-hidden">
          <img
            src={movie.data.poster || "/placeholder.svg"}
            alt={movie.data.title}
            className="h-full w-full object-cover"
          />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{movie.data.title}</CardTitle>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{movie.data.year}</span>
              <span>•</span>
              <span>{movie.data.runtime} min</span>
              <span>•</span>
              <span>{movie.data.director}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {movie.data.genre?.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>

            <p className="text-muted-foreground">{movie.data.overview}</p>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-4">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Film className="h-4 w-4" />
                  Status
                </div>
                <div className="text-lg font-semibold capitalize">
                  {movie.data.status || "published"}
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4" />
                  Rating
                </div>
                <div className="text-lg font-semibold">
                  {movie.data.rating}/10
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <MessageSquare className="h-4 w-4" />
                  Reviews
                </div>
                <div className="text-lg font-semibold">{reviewList.length}</div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Cast</h3>
              <p className="text-muted-foreground">
                {Array.isArray(movie.data.cast)
                  ? movie.data.cast.join(", ")
                  : movie.data.cast}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviewList.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Latest Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviewList[0] ? formatDate(reviewList[0].createdAt) : "None"}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Movie Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reviewList.length > 0 ? (
            reviewList.map((review) => (
              <div key={review.id} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{review.userName}</p>
                    <p className="text-muted-foreground text-xs">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {review.status}
                  </Badge>
                </div>
                <p className="mb-2 text-sm">Rating: {review.rating}/10</p>
                <p className="text-muted-foreground text-sm">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No reviews found for this movie.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}