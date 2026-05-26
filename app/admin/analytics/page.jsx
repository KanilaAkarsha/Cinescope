import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/db";
import AnalyticsCharts from "./charts";

export const dynamic = "force-dynamic";

function formatDate(value) {
  if (!value) return "Recently";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatRelativeTime(value) {
  if (!value) return "Recently";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";

  const diffInMinutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60)
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7)
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;

  return formatDate(date);
}

function bucketRating(rating) {
  if (rating >= 9) return "9-10";
  if (rating >= 8) return "8-9";
  if (rating >= 7) return "7-8";
  if (rating >= 6) return "6-7";
  if (rating >= 5) return "5-6";
  return "Below 5";
}

function getCurrentYearMonthKey(date) {
  return new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
}

function getLastTwelveMonths() {
  const months = [];
  const today = new Date();

  for (let offset = 11; offset >= 0; offset -= 1) {
    const date = new Date(today.getFullYear(), today.getMonth() - offset, 1);
    months.push({
      key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
      label: getCurrentYearMonthKey(date),
    });
  }

  return months;
}

export default async function AnalyticsPage() {
  const moviesCollection = db.collection("movies_n");
  const usersCollection = db.collection("user");
  const reviewsCollection = db.collection("reviews");

  const [
    totalMovies,
    publishedMovies,
    totalUsers,
    verifiedUsers,
    adminUsers,
    moderatorUsers,
    totalReviews,
    averageRatingResult,
    recentMovies,
    recentUsers,
    moviesForCharts,
    reviewsForCharts,
  ] = await Promise.all([
    moviesCollection.countDocuments({}),
    moviesCollection.countDocuments({ status: "published" }),
    usersCollection.countDocuments({}),
    usersCollection.countDocuments({ emailVerified: true }),
    usersCollection.countDocuments({ role: "admin" }),
    usersCollection.countDocuments({ role: "moderator" }),
    reviewsCollection.countDocuments({}),
    moviesCollection
      .aggregate([
        { $match: { "imdb.rating": { $type: "number" } } },
        { $group: { _id: null, averageRating: { $avg: "$imdb.rating" } } },
      ])
      .toArray(),
    moviesCollection
      .find(
        {},
        {
          projection: {
            title: 1,
            poster: 1,
            year: 1,
            createdAt: 1,
            status: 1,
            imdb: 1,
          },
        },
      )
      .sort({ createdAt: -1, _id: -1 })
      .limit(5)
      .toArray(),
    usersCollection
      .find(
        {},
        {
          projection: {
            name: 1,
            email: 1,
            image: 1,
            avatar: 1,
            role: 1,
            createdAt: 1,
          },
        },
      )
      .sort({ createdAt: -1, _id: -1 })
      .limit(5)
      .toArray(),
    moviesCollection
      .find({}, { projection: { title: 1, genres: 1, imdb: 1, createdAt: 1 } })
      .toArray(),
    reviewsCollection
      .find({}, { projection: { movieId: 1, createdAt: 1 } })
      .toArray(),
  ]);

  const averageRating = averageRatingResult[0]?.averageRating || 0;

  const monthIndexMap = new Map(
    getLastTwelveMonths().map((entry) => [
      entry.key,
      { month: entry.label, views: 0 },
    ]),
  );

  moviesForCharts.forEach((movie) => {
    const date = movie.createdAt
      ? new Date(movie.createdAt)
      : movie._id?.getTimestamp?.() || new Date();
    if (Number.isNaN(date.getTime())) return;

    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (monthIndexMap.has(key)) {
      monthIndexMap.get(key).views += 1;
    }
  });

  const viewsByMonth = Array.from(monthIndexMap.values());

  const genreCountMap = new Map();
  moviesForCharts.forEach((movie) => {
    const genres = movie.genres || [];
    genres.forEach((genre) => {
      genreCountMap.set(genre, (genreCountMap.get(genre) || 0) + 1);
    });
  });

  const genreDistribution = Array.from(genreCountMap.entries())
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 7);

  const ratingBuckets = new Map([
    ["9-10", 0],
    ["8-9", 0],
    ["7-8", 0],
    ["6-7", 0],
    ["5-6", 0],
    ["Below 5", 0],
  ]);

  moviesForCharts.forEach((movie) => {
    const rating = Number(movie.imdb?.rating || 0);
    ratingBuckets.set(
      bucketRating(rating),
      (ratingBuckets.get(bucketRating(rating)) || 0) + 1,
    );
  });

  const ratingDistribution = Array.from(ratingBuckets.entries()).map(
    ([rating, count]) => ({
      rating,
      count,
    }),
  );

  const reviewCountMap = new Map();
  reviewsForCharts.forEach((review) => {
    const movieId = review.movieId?.toString?.() ?? review.movieId;
    if (!movieId) return;
    reviewCountMap.set(movieId, (reviewCountMap.get(movieId) || 0) + 1);
  });

  const movieTitleMap = new Map(
    moviesForCharts.map((movie) => [movie._id.toString(), movie.title]),
  );

  const topMovies = Array.from(reviewCountMap.entries())
    .map(([movieId, reviews]) => ({
      title: movieTitleMap.get(movieId) || "Unknown Movie",
      views: reviews,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Live analytics derived from your MongoDB movie, user, and review data.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="movies">Movies</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Movies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalMovies}</div>
                <p className="text-muted-foreground text-xs">
                  {publishedMovies} published
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalUsers}</div>
                <p className="text-muted-foreground text-xs">
                  {verifiedUsers} verified accounts
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalReviews}</div>
                <p className="text-muted-foreground text-xs">
                  Recent user activity
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Rating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {averageRating.toFixed(1)}/10
                </div>
                <p className="text-muted-foreground text-xs">
                  Calculated from movie ratings
                </p>
              </CardContent>
            </Card>
          </div>

          <AnalyticsCharts
            viewsByMonth={viewsByMonth}
            genreDistribution={genreDistribution}
            ratingDistribution={ratingDistribution}
            topMovies={topMovies}
          />
        </TabsContent>

        <TabsContent value="movies" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Published Movies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{publishedMovies}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Genre Count
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {genreDistribution.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Highest Rated Bucket
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {ratingDistribution.find((entry) => entry.count > 0)
                    ?.rating || "N/A"}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Movies</CardTitle>
              <CardDescription>
                Latest movie records stored in MongoDB.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMovies.map((movie) => (
                <div
                  key={movie._id.toString()}
                  className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">{movie.title}</p>
                    <p className="text-muted-foreground text-sm">
                      {movie.year} · {movie.status || "published"}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {formatRelativeTime(movie.createdAt || movie._id)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Admins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminUsers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Moderators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{moderatorUsers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalUsers}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>
                Newest accounts created in the auth collection.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentUsers.map((user) => (
                <div
                  key={user._id.toString()}
                  className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">
                      {user.name || user.email || "Unknown User"}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {user.email || "No email available"}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {formatRelativeTime(user.createdAt || user._id)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
