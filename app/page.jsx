import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import HeaderNav from "@/components/header-nav";
import FeaturedMovies from "@/components/home/featured-movies";
import HeroBanner from "@/components/home/hero-banner";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAuthenticated = session ? true : false;

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderNav isAuthenticated={isAuthenticated} />
      <main className="flex-1">
        <HeroBanner />
        <FeaturedMovies />
      </main>
      <footer className="flex-1 bg-amber-400">Footer Section</footer>
    </div>
  );
}
