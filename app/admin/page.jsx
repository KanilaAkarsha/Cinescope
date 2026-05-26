import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Film,
  Users,
  MessageSquare,
  Eye,
  TrendingUp,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import MoviesData from "./movies-data";
import { getMovies } from "@/actions/movies";
import { getUsers } from "@/actions/users";
import { db } from "@/db";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

const formatViews = (value) => {
  const views = Number(value || 0);

  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }

  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }

  return `${views}`;
};

const parseDate = (value) => {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const normalizeUserForDashboard = (user) => ({
  id: user?.id || user?._id?.toString?.() || "",
  name: user?.name || "Unknown User",
  email: user?.email || "",
  role: user?.role || "user",
  status: user?.status || "active",
  avatar: user?.avatar || user?.image || "/placeholder.svg?height=40&width=40",
  createdAt: user?.createdAt || new Date().toISOString(),
});

const normalizeReviewForDashboard = (review, movieTitleMap) => {
  const movieId =
    review?.movieId?.toString?.() || String(review?.movieId || "");

  return {
    id: review?._id?.toString?.() || review?.id || "",
    movieId,
    movieTitle: movieTitleMap.get(movieId) || "Unknown Movie",
    userName: review?.userName || "Anonymous",
    userAvatar: review?.userAvatar || "/placeholder.svg?height=40&width=40",
    rating: Number(review?.rating || 0),
    comment: review?.comment || "",
    status: review?.status || "pending",
    createdAt: review?.createdAt || new Date().toISOString(),
  };
};

const getUserRoleClass = (role) => {
  if (role === "admin") {
    return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
  }

  if (role === "moderator") {
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  }

  return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
};

const getReviewStatusClass = (status) => {
  if (status === "approved") {
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  }

  if (status === "pending") {
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
  }

  return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
};

const buildMovieTitleMap = async (reviewDocs) => {
  const ids = [];

  for (const review of reviewDocs) {
    const movieId =
      review?.movieId?.toString?.() || String(review?.movieId || "");
    if (ObjectId.isValid(movieId)) {
      ids.push(ObjectId.createFromHexString(movieId));
    }
  }

  if (ids.length === 0) {
    return new Map();
  }

  const uniqueIds = new Map();
  for (const id of ids) {
    uniqueIds.set(id.toString(), id);
  }

  const movieDocs = await db
    .collection("movies_n")
    .find(
      { _id: { $in: Array.from(uniqueIds.values()) } },
      { projection: { title: 1 } },
    )
    .toArray();

  const movieTitleMap = new Map();
  for (const movie of movieDocs) {
    movieTitleMap.set(movie._id.toString(), movie.title || "Unknown Movie");
  }

  return movieTitleMap;
};

export default async function AdminDashboard() {
  const [movies, usersResult, reviewDocs] = await Promise.all([
    getMovies(),
    getUsers(),
    db.collection("reviews").find({}).sort({ createdAt: -1 }).toArray(),
  ]);

  const users = Array.isArray(usersResult?.data)
    ? usersResult.data.map(normalizeUserForDashboard)
    : [];

  const movieTitleMap = await buildMovieTitleMap(reviewDocs);
  const reviews = reviewDocs.map((review) =>
    normalizeReviewForDashboard(review, movieTitleMap),
  );

  const pendingReviews = reviews.filter(
    (review) => review.status === "pending",
  ).length;
  const approvedReviews = reviews.filter(
    (review) => review.status === "approved",
  ).length;

  const totalViews = Array.isArray(movies)
    ? movies.reduce((sum, movie) => sum + Number(movie?.imdb?.votes || 0), 0)
    : 0;

  const now = new Date();
  const thisMonth = now.getMonth();
  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
  const monthViews = Array.from({ length: 12 }, () => 0);

  if (Array.isArray(movies)) {
    for (const movie of movies) {
      const releaseDate =
        parseDate(movie?.released) || parseDate(movie?.releaseDate);
      if (!releaseDate) continue;
      monthViews[releaseDate.getMonth()] += Number(movie?.imdb?.votes || 0);
    }
  }

  const currentViews = monthViews[thisMonth] || 0;
  const previousViews = monthViews[lastMonth] || 0;
  let viewsDelta = 0;

  if (previousViews) {
    viewsDelta = ((currentViews - previousViews) / previousViews) * 100;
  } else if (currentViews > 0) {
    viewsDelta = 100;
  }

  // Build recent activity from real data sources: movies, users, reviews
  const timeAgo = (date) => {
    if (!date) return "Unknown";
    const ms = Date.now() - date.getTime();
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);

    if (d > 0) return `${d} day${d > 1 ? "s" : ""} ago`;
    if (h > 0) return `${h} hour${h > 1 ? "s" : ""} ago`;
    if (m > 0) return `${m} minute${m > 1 ? "s" : ""} ago`;
    return `${s} second${s !== 1 ? "s" : ""} ago`;
  };

  const movieActivities = Array.isArray(movies)
    ? movies.map((m) => ({
        type: "movie",
        title: m.title || "Untitled",
        actor: "",
        date: parseDate(m.createdAt) || parseDate(m.releaseDate) || new Date(),
        description: "New movie added",
        href: "/admin/movies",
      }))
    : [];

  const userActivities = Array.isArray(users)
    ? users.map((u) => ({
        type: "user",
        title: u.name,
        actor: u.email,
        date: parseDate(u.createdAt) || new Date(),
        description: "User registered",
        href: "/admin/users",
      }))
    : [];

  const reviewActivities = Array.isArray(reviews)
    ? reviews.map((r) => ({
        type: "review",
        title: r.userName,
        actor: r.movieTitle,
        date: parseDate(r.createdAt) || new Date(),
        description: "New review submitted",
        href: "/admin/reviews",
      }))
    : [];

  const recentActivity = [
    ...movieActivities,
    ...userActivities,
    ...reviewActivities,
  ]
    .sort((a, b) => b.date - a.date)
    .slice(0, 4);

  if (!movies || movies.length === 0) {
    return (
      <div className=" text-foreground font-medium text-center py-12">
        No movies available.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to the CineScope admin dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Movies</CardTitle>
            <Film className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{movies.length}</div>
            <p className="text-muted-foreground text-xs">
              {movies.filter((movie) => movie.status === "published").length}{" "}
              published
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-muted-foreground text-xs">
              {users.filter((user) => user.status === "active").length} active
              users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Reviews
            </CardTitle>
            <MessageSquare className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReviews}</div>
            <p className="text-muted-foreground text-xs">
              {approvedReviews} approved reviews
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatViews(totalViews)}</div>
            <p className="text-muted-foreground text-xs">
              {`${viewsDelta >= 0 ? "+" : ""}${viewsDelta.toFixed(1)}% from last month`}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border-primary/20 hover:bg-primary/5 flex items-center gap-4 rounded-md border p-4 transition-colors">
                <div className="bg-primary/10 rounded-full p-2">
                  <Film className="text-primary h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Add New Movie</h3>
                  <p className="text-muted-foreground text-sm">
                    Create a new movie entry
                  </p>
                </div>
                <Link href="/admin/movies">
                  <Button variant="outline" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="border-primary/20 hover:bg-primary/5 flex items-center gap-4 rounded-md border p-4 transition-colors">
                <div className="bg-primary/10 rounded-full p-2">
                  <MessageSquare className="text-primary h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Moderate Reviews</h3>
                  <p className="text-muted-foreground text-sm">
                    {pendingReviews} reviews pending
                  </p>
                </div>
                <Link href="/admin/reviews">
                  <Button variant="outline" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="border-primary/20 hover:bg-primary/5 flex items-center gap-4 rounded-md border p-4 transition-colors">
                <div className="bg-primary/10 rounded-full p-2">
                  <Users className="text-primary h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Manage Users</h3>
                  <p className="text-muted-foreground text-sm">
                    {users.length} users total
                  </p>
                </div>
                <Link href="/admin/users">
                  <Button variant="outline" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="border-primary/20 hover:bg-primary/5 flex items-center gap-4 rounded-md border p-4 transition-colors">
                <div className="bg-primary/10 rounded-full p-2">
                  <TrendingUp className="text-primary h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">View Analytics</h3>
                  <p className="text-muted-foreground text-sm">
                    Platform performance metrics
                  </p>
                </div>
                <Link href="/admin/analytics">
                  <Button variant="outline" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length === 0 ? (
                <div className="text-muted-foreground text-sm">
                  No recent activity
                </div>
              ) : (
                recentActivity.map((item, idx) => (
                  <div
                    key={`${item.type}-${idx}`}
                    className="flex items-center gap-4">
                    <div className="bg-primary/10 rounded-full p-2">
                      {item.type === "movie" ? (
                        <Film className="text-primary h-5 w-5" />
                      ) : item.type === "user" ? (
                        <Users className="text-primary h-5 w-5" />
                      ) : (
                        <MessageSquare className="text-primary h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {item.description}
                        {item.title ? ` — ${item.title}` : ""}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {timeAgo(item.date)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent-movies" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent-movies">Recent Movies</TabsTrigger>
          <TabsTrigger value="recent-users">Recent Users</TabsTrigger>
          <TabsTrigger value="recent-reviews">Recent Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="recent-movies" className="space-y-4">
          <MoviesData />
        </TabsContent>
        <TabsContent value="recent-users" className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4">
              <h3 className="text-lg font-medium">Recent Users</h3>
              <p className="text-muted-foreground text-sm">
                Recently registered users on the platform.
              </p>
            </div>
            <div className="divide-y">
              {users.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${getUserRoleClass(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 text-right">
              <Link
                href="/admin/users"
                className="text-primary text-sm hover:underline">
                View All Users →
              </Link>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="recent-reviews" className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4">
              <h3 className="text-lg font-medium">Recent Reviews</h3>
              <p className="text-muted-foreground text-sm">
                Latest reviews submitted by users.
              </p>
            </div>
            <div className="divide-y">
              {reviews.slice(0, 5).map((review) => {
                return (
                  <div key={review.id} className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={review.userAvatar}
                            alt={review.userName}
                          />
                          <AvatarFallback>
                            {review.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {review.userName}
                        </span>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${getReviewStatusClass(review.status)}`}>
                        {review.status}
                      </span>
                    </div>
                    <p className="mb-1 text-sm">
                      <span className="font-medium">Movie:</span>{" "}
                      {review.movieTitle}
                    </p>
                    <p className="mb-2 text-sm">
                      <span className="font-medium">Rating:</span>{" "}
                      {review.rating}/10
                    </p>
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                      {review.comment}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="p-4 text-right">
              <Link
                href="/admin/reviews"
                className="text-primary text-sm hover:underline">
                View All Reviews →
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
