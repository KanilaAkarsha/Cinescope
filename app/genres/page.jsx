import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HeaderNav from "@/components/header-nav";
import { getMovies } from "@/actions/movies";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function GenresPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isAuthenticated = !!session;

  const moviesData = (await getMovies()) || [];

  const normalizedMovies = moviesData.map((movie) => ({
    ...movie,
    _id: movie._id?.toString?.() ?? movie._id,
  }));

  const genreMap = new Map();

  normalizedMovies.forEach((movie) => {
    const movieGenres = movie.genres ?? movie.genre ?? [];

    movieGenres.forEach((genre) => {
      if (!genreMap.has(genre)) {
        genreMap.set(genre, []);
      }

      genreMap.get(genre).push(movie);
    });
  });

  const genreCounts = Array.from(genreMap.entries())
    .map(([name, genreMovies]) => ({
      name,
      count: genreMovies.length,
      movies: genreMovies.slice(0, 4),
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav isAuthenticated={isAuthenticated} />
      <div className="container py-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block text-4xl font-extrabold tracking-tight lg:text-5xl">
              Genres
            </h1>
            <p className="text-xl text-primary/90">Explore movies by genre</p>
          </div>
        </div>

        <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
          {genreCounts.map((genre) => (
            <Card
              key={genre.name}
              className="flex flex-col hover:shadow-md hover:shadow-primary/20 transition-all">
              <CardHeader className="border-b border-primary/10">
                <CardTitle className="text-primary">{genre.name}</CardTitle>
                <CardDescription>{genre.count} movies</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pt-4">
                <div className="grid grid-cols-2 gap-2">
                  {genre.movies.map((movie) => (
                    <Link
                      key={movie._id}
                      href={`/movies/${movie._id}`}
                      className="overflow-hidden rounded-md">
                      <img
                        src={movie.poster || "/placeholder.svg"}
                        alt={movie.title}
                        className="aspect-2/3 h-auto w-full object-cover transition-all hover:scale-105"
                        width={200}
                        height={300}
                      />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
