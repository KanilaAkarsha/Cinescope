import { NextResponse } from "next/server";
import { db } from "@/db";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const toDate = (value) => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const toNumber = (value, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const percentChange = (current, previous) => {
  if (!previous) {
    return current > 0 ? 100 : 0;
  }
  return ((current - previous) / previous) * 100;
};

const buildRatingBucket = (rating) => {
  if (rating >= 9) return "9-10";
  if (rating >= 8) return "8-9";
  if (rating >= 7) return "7-8";
  if (rating >= 6) return "6-7";
  if (rating >= 5) return "5-6";
  return "Below 5";
};

const createRatingCounter = () =>
  new Map([
    ["9-10", 0],
    ["8-9", 0],
    ["7-8", 0],
    ["6-7", 0],
    ["5-6", 0],
    ["Below 5", 0],
  ]);

const buildMonthlyCounter = () =>
  MONTH_NAMES.map((month) => ({ month, views: 0 }));

const monthIndexPair = () => {
  const now = new Date();
  const current = now.getMonth();
  return { current, previous: current === 0 ? 11 : current - 1 };
};

const collectMovieMetrics = (movies) => {
  const monthlyViews = buildMonthlyCounter();
  const genreCounter = new Map();
  const ratingCounter = createRatingCounter();
  const topMoviesRaw = [];

  let ratingTotal = 0;
  let ratingCount = 0;

  for (const movie of movies) {
    const movieRating = toNumber(movie?.imdb?.rating, 0);
    const movieVotes = toNumber(movie?.imdb?.votes, 0);
    const releaseDate = toDate(movie?.released) || toDate(movie?.releaseDate);

    if (releaseDate) {
      monthlyViews[releaseDate.getMonth()].views += movieVotes;
    }

    if (movieRating > 0) {
      ratingTotal += movieRating;
      ratingCount += 1;
      const bucket = buildRatingBucket(movieRating);
      ratingCounter.set(bucket, toNumber(ratingCounter.get(bucket), 0) + 1);
    }

    const movieGenres = Array.isArray(movie?.genres) ? movie.genres : [];
    for (const genre of movieGenres) {
      genreCounter.set(genre, toNumber(genreCounter.get(genre), 0) + 1);
    }

    topMoviesRaw.push({
      title: movie?.title || "Untitled",
      views: movieVotes,
    });
  }

  return {
    monthlyViews,
    genreCounter,
    ratingCounter,
    topMoviesRaw,
    ratingTotal,
    ratingCount,
  };
};

const applyReviewFallbackViews = (monthlyViews, reviews) => {
  if (!monthlyViews.every((item) => item.views === 0)) {
    return;
  }

  for (const review of reviews) {
    const createdAt = toDate(review?.createdAt);
    if (!createdAt) continue;
    monthlyViews[createdAt.getMonth()].views += 100;
  }
};

const countByMonth = (items, dateAccessor) => {
  const months = Array.from({ length: 12 }, () => 0);

  for (const item of items) {
    const date = toDate(dateAccessor(item));
    if (!date) continue;
    months[date.getMonth()] += 1;
  }

  return months;
};

const buildDistributions = (genreCounter, ratingCounter, topMoviesRaw) => {
  const genreDistribution = Array.from(genreCounter.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 7);

  const ratingDistribution = Array.from(ratingCounter.entries()).map(
    ([rating, count]) => ({ rating, count }),
  );

  const sortedTopMovies = [...topMoviesRaw].sort((a, b) => b.views - a.views);
  const topMovies = sortedTopMovies.slice(0, 5);

  return { genreDistribution, ratingDistribution, topMovies };
};

const buildAnalyticsResponse = (movies, reviews, users) => {
  const { current, previous } = monthIndexPair();
  const {
    monthlyViews,
    genreCounter,
    ratingCounter,
    topMoviesRaw,
    ratingTotal,
    ratingCount,
  } = collectMovieMetrics(movies);

  applyReviewFallbackViews(monthlyViews, reviews);

  const totalViews = monthlyViews.reduce(
    (sum, item) => sum + toNumber(item.views, 0),
    0,
  );
  const viewsChange = percentChange(
    monthlyViews[current]?.views || 0,
    monthlyViews[previous]?.views || 0,
  );

  const usersByMonth = countByMonth(users, (user) => user?.createdAt);
  const newUsers = usersByMonth[current] || 0;
  const usersChange = percentChange(newUsers, usersByMonth[previous] || 0);

  const reviewsByMonth = countByMonth(reviews, (review) => review?.createdAt);
  const reviewCount = reviews.length;
  const reviewsChange = percentChange(
    reviewsByMonth[current] || 0,
    reviewsByMonth[previous] || 0,
  );

  const averageRating = ratingCount > 0 ? ratingTotal / ratingCount : 0;
  const { genreDistribution, ratingDistribution, topMovies } =
    buildDistributions(genreCounter, ratingCounter, topMoviesRaw);

  return {
    totalViews,
    viewsChange,
    newUsers,
    usersChange,
    reviewCount,
    reviewsChange,
    averageRating,
    ratingChange: 0,
    viewsByMonth: monthlyViews,
    genreDistribution,
    ratingDistribution,
    topMovies,
  };
};

export async function GET() {
  try {
    const [movies, reviews, users] = await Promise.all([
      db.collection("movies_n").find({}).toArray(),
      db.collection("reviews").find({}).toArray(),
      db.collection("user").find({}).toArray(),
    ]);
    const analytics = buildAnalyticsResponse(movies, reviews, users);

    return NextResponse.json(
      {
        success: true,
        data: analytics,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("/api/admin/analytics error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load analytics" },
      { status: 500 },
    );
  }
}
