import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";

export const dynamic = "force-dynamic";

function getInitials(name) {
  return (name || "U")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("")
    .slice(0, 2);
}

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

function getStatusClass(status) {
  if (status === "approved") {
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  }

  if (status === "pending") {
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
  }

  return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
}

export default async function ReviewsPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q?.trim() || "";
  const statusFilter = params?.status || "all";

  const reviewsCollection = db.collection("reviews");

  const [totalReviews, pendingReviews, approvedReviews, reviews] =
    await Promise.all([
      reviewsCollection.countDocuments({}),
      reviewsCollection.countDocuments({ status: "pending" }),
      reviewsCollection.countDocuments({ status: "approved" }),
      reviewsCollection
        .aggregate([
          { $sort: { createdAt: -1, _id: -1 } },
          {
            $lookup: {
              from: "movies_n",
              localField: "movieId",
              foreignField: "_id",
              as: "movie",
            },
          },
          {
            $unwind: {
              path: "$movie",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              movieId: 1,
              userName: 1,
              userAvatar: 1,
              rating: 1,
              comment: 1,
              status: 1,
              createdAt: 1,
              movieTitle: "$movie.title",
            },
          },
        ])
        .limit(100)
        .toArray(),
    ]);

  const normalizedReviews = reviews
    .map((review) => ({
      id: review._id.toString(),
      movieId: review.movieId?.toString?.() || review.movieId || null,
      userName: review.userName || "Anonymous",
      userAvatar: review.userAvatar || "",
      movieTitle: review.movieTitle || "Unknown Movie",
      rating: review.rating ?? 0,
      comment: review.comment || "",
      status: review.status || "pending",
      createdAt: review.createdAt || review._id,
    }))
    .filter((review) => {
      const matchesStatus =
        statusFilter === "all" || review.status === statusFilter;
      const matchesQuery =
        !query ||
        review.userName.toLowerCase().includes(query.toLowerCase()) ||
        review.comment.toLowerCase().includes(query.toLowerCase()) ||
        review.movieTitle.toLowerCase().includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
        <p className="text-muted-foreground">
          Live review records joined with their movie titles from MongoDB.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReviews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Approved Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedReviews}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form
            className="grid gap-4 md:grid-cols-[1fr_220px_auto]"
            method="get">
            <div className="space-y-2">
              <Label htmlFor="q">Search reviews</Label>
              <Input
                id="q"
                name="q"
                placeholder="Search by user, movie, or comment"
                defaultValue={query}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status filter</Label>
              <select
                id="status"
                name="status"
                defaultValue={statusFilter}
                className="border-input bg-background focus-visible:ring-ring h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2">
                <option value="all">All reviews</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full md:w-auto">
                Search
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Movie</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Open</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {normalizedReviews.length > 0 ? (
              normalizedReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={review.userAvatar}
                          alt={review.userName}
                        />
                        <AvatarFallback>
                          {getInitials(review.userName)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{review.userName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{review.movieTitle}</TableCell>
                  <TableCell>{review.rating}/10</TableCell>
                  <TableCell className="max-w-[320px]">
                    <p className="truncate text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusClass(review.status)}>
                      {review.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(review.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link
                        href={
                          review.movieId
                            ? `/admin/movies/${review.movieId}`
                            : "/admin/movies"
                        }>
                        View movie
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-muted-foreground py-10 text-center">
                  No reviews matched your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
