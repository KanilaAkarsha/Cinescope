
import { getMovies } from "@/actions/movies";
import MovieCard, { MovieCardSkeleton } from "./movie-card";

export default async function MoviesList() {
    const movies = await getMovies(); // Fetch or pass movies data here

    if (!movies || movies.length === 0) {
        return <div className=" text-foreground font-medium text-center py-12">No movies available.</div>;
    }

    console.log("Movies",movies);
  return (
    <div className=" grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Loop Movies (Dynamic) */}
        {movies.map((movie,index) => (
            <div key={`${movie._id}-${index}`} >
                {/* movie card */}
                <MovieCard movie={movie}/>
                </div>
        ))}
    </div>
  );
}

export function MovieListSkeleton() {
  return <div className=" grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array(8).fill(0).map((_,i) => (
      <MovieCardSkeleton key={i}/>)
    )}
  </div>
}

