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
import { db } from "@/db";

export const dynamic = "force-dynamic";

function formatRelativeTime(value) {
  if (!value) return "Recently";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";

  const diffInMinutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  }

  return date.toLocaleDateString();
}

function toTimestamp(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

function getUserRoleClass(role) {
  if (role === "admin") {
    return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
  }

  if (role === "moderator") {
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  }

  return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
}

function getReviewStatusClass(status) {
  if (status === "approved") {
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  }

  if (status === "pending") {
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
  }

  return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
}

export default async function AdminDashboard() {
  const moviesCollection = db.collection("movies_n");
  const usersCollection = db.collection("user");
  const reviewsCollection = db.collection("reviews");

  const [
    totalMovies,
    publishedMovies,
    totalUsers,
    totalReviews,
    pendingReviews,
    approvedReviews,
    recentMoviesRaw,
    recentUsersRaw,
    recentReviewsRaw,
    movieTitleDocs,
  ] = await Promise.all([
    moviesCollection.countDocuments({}),
    moviesCollection.countDocuments({ status: "published" }),
    usersCollection.countDocuments({}),
    reviewsCollection.countDocuments({}),
    reviewsCollection.countDocuments({ status: "pending" }),
    reviewsCollection.countDocuments({ status: "approved" }),
    moviesCollection
      .find(
        {},
        {
          projection: { title: 1, year: 1, poster: 1, status: 1, createdAt: 1 },
        },
      )
      .sort({ createdAt: -1, _id: -1 })
      .limit(5)
      .toArray(),
    usersCollection
      .find(
        {},
        { projection: { name: 1, email: 1, role: 1, avatar: 1, createdAt: 1 } },
      )
      .sort({ createdAt: -1, _id: -1 })
      .limit(5)
      .toArray(),
    reviewsCollection
      .find(
        {},
        {
          projection: {
            movieId: 1,
            userName: 1,
            userAvatar: 1,
            rating: 1,
            comment: 1,
            status: 1,
            createdAt: 1,
          },
        },
      )
      .sort({ createdAt: -1, _id: -1 })
      .limit(5)
      .toArray(),
    moviesCollection.find({}, { projection: { title: 1 } }).toArray(),
  ]);

  const movieTitleMap = new Map(
    movieTitleDocs.map((movie) => [movie._id.toString(), movie.title]),
  );

  const recentMovies = recentMoviesRaw.map((movie) => ({
    id: movie._id.toString(),
    title: movie.title,
    year: movie.year,
    poster: movie.poster,
    status: movie.status ?? "published",
    createdAt: movie.createdAt ?? movie._id.toString(),
  }));

  const recentUsers = recentUsersRaw.map((user) => ({
    id: user._id.toString(),
    name: user.name ?? user.email ?? "Unknown User",
    email: user.email ?? "No email available",
    role: user.role ?? "user",
    avatar: user.avatar ?? "/placeholder.svg?height=40&width=40",
    createdAt: user.createdAt ?? user._id.toString(),
  }));

  const recentReviews = recentReviewsRaw.map((review) => {
    const movieId = review.movieId?.toString?.() ?? review.movieId;

    return {
      id: review._id.toString(),
      movieId,
      movieTitle: movieTitleMap.get(movieId) ?? "Unknown Movie",
      userName: review.userName ?? "Anonymous",
      userAvatar: review.userAvatar ?? "/placeholder.svg?height=40&width=40",
      rating: review.rating ?? 0,
      comment: review.comment ?? "",
      status: review.status ?? "pending",
      createdAt: review.createdAt ?? review._id.toString(),
    };
  });

  const recentActivity = [
    ...recentMovies.map((movie) => ({
      label: `New movie added: ${movie.title}`,
      time: formatRelativeTime(movie.createdAt),
      sortValue: toTimestamp(movie.createdAt),
    })),
    ...recentUsers.map((user) => ({
      label: `User registered: ${user.name}`,
      time: formatRelativeTime(user.createdAt),
      sortValue: toTimestamp(user.createdAt),
    })),
    ...recentReviews.map((review) => ({
      label: `New review submitted: ${review.userName}`,
      time: formatRelativeTime(review.createdAt),
      sortValue: toTimestamp(review.createdAt),
    })),
  ]
    .sort((a, b) => b.sortValue - a.sortValue)
    .slice(0, 4);

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
            <div className="text-2xl font-bold">{totalMovies}</div>
            <p className="text-muted-foreground text-xs">
              {publishedMovies} published
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-muted-foreground text-xs">Registered accounts</p>
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
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <Eye className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviews}</div>
            <p className="text-muted-foreground text-xs">Live review records</p>
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
                    {totalUsers} users total
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
              {recentActivity.map((activity) => (
                <div
                  key={`${activity.label}-${activity.time}`}
                  className="flex items-center gap-4">
                  <Clock className="text-muted-foreground h-5 w-5" />
                  <div>
                    <p className="text-sm font-medium">{activity.label}</p>
                    <p className="text-muted-foreground text-xs">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
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
              {recentUsers.length > 0 ? (
                recentUsers.map((user) => (
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
                ))
              ) : (
                <div className="p-4 text-sm text-muted-foreground">
                  No user records found.
                </div>
              )}
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
              {recentReviews.length > 0 ? (
                recentReviews.map((review) => (
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
                      <Link
                        href={`/admin/movies/${review.movieId}`}
                        className="text-primary hover:underline">
                        {review.movieTitle}
                      </Link>
                    </p>
                    <p className="mb-2 text-sm">
                      <span className="font-medium">Rating:</span>{" "}
                      {review.rating}/10
                    </p>
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                      {review.comment}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-sm text-muted-foreground">
                  No review records found.
                </div>
              )}
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
