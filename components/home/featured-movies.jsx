import { Button } from '@/components/ui/button';
import MoviesList from './movies-list';

export default function FeaturedMovies() {
  return (
    <section id='featured-movies' className="container px-4 py-12 md:px-6">
        {/* Heading area */}
        <div className="flex items-center justify-between mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Movies</h2>
            <p className="text-muted-foreground">Our section of must-watch films</p>
        </div>

        <Button variant="outline">View All</Button>
        </div>

        {/* Movie search */}
        <div className="w-full h-32 bg-purple-400 rounded-lg mb-6">
            {/* SearchBar input */}
        </div>

        {/*  Movies List */}
        <MoviesList/>
    </section>
  );
}