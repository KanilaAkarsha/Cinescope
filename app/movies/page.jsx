import Footer from "@/components/footer";
import HeaderNav from "@/components/header-nav";
import MovieSelectors from "@/app/admin/movies/movie-selectors";
import MovieCard from "@/components/home/movie-card";
import { searchMovies } from "@/actions/movies";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function MoviesPage(props) {
  const searchParams = await props.searchParams;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isAuthenticated = !!session;
  const query = searchParams?.query || "";

  const { data: moviesData = [] } = await searchMovies(query);
  const movies = moviesData.map((movie) => ({
    ...movie,
    _id: movie._id.toString(),
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderNav isAuthenticated={isAuthenticated} />
      <main className="flex-1">
        <section className="container px-4 py-12 md:px-6">
          <div className="mb-8 max-w-2xl space-y-3">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Movies
            </h1>
            <p className="text-muted-foreground text-lg">
              Browse the full CineScope catalog and search by title.
            </p>
          </div>

          <MovieSelectors />

          {movies.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {movies.map((movie, index) => (
                <MovieCard key={`${movie._id}-${index}`} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-foreground py-12 text-center font-medium">
              No movies available.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
