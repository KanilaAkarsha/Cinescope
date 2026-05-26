"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllGenres, getAllMovieStatus, getAllYears } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { updateMovie } from "@/actions/movies";
import { Checkbox } from "@/components/ui/checkbox";

export default function UpdateMovieForm({ showDialog, movie }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    title: movie?.title || "",
    year: movie?.year || null,
    director: movie?.directors?.at(0) || "",
    cast: movie?.cast?.join(", ") || "",
    genres: movie?.genres || [],
    rating: movie?.imdb?.rating || "",
    runtime: movie?.runtime || "",
    overview: movie?.plot || "",
    poster: movie?.poster || "",
    backdrop: movie?.backdrop || "",
    status: movie?.status || "",
    releaseDate: movie?.releaseDate || "",
  });
  const years = getAllYears();
  const genres = getAllGenres();
  const statuses = getAllMovieStatus();

  const toggleGenre = (genre) => {
    setFormState((prevState) => ({
      ...prevState,
      genres: prevState.genres.includes(genre)
        ? prevState.genres.filter((currentGenre) => currentGenre !== genre)
        : [...prevState.genres, genre],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cast = (formState.cast || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    const movieDoc = {
      title: formData.get("title"),
      year: formData.get("year"),
      directors: [formData.get("director")],
      cast,
      genres: formState.genres,
      imdb: { rating: Number(formData.get("rating")) },
      runtime: formData.get("runtime"),
      plot: formData.get("overview"),
      poster: formData.get("poster"),
      backdrop: formData.get("backdrop"),
      status: formData.get("status"),
      releaseDate: formData.get("releaseDate"),
    };

    setIsSubmitting(true);

    try {
      const response = await updateMovie(movie?.id, movieDoc);

      if (response?.success) {
        router.refresh();
        showDialog(false);
      }
    } catch {
      console.log("Error in handle submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6 scroll-m-20" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">
            Title<span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="Movie title"
            value={formState?.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">
            Year<span className="text-red-500">*</span>
          </Label>
          <Select
            id="year"
            name="year"
            value={formState?.year}
            onValueChange={(value) =>
              setFormState((prevState) => ({
                ...prevState,
                year: value,
              }))
            }
            required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Please select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year, index) => (
                <SelectItem key={`${year}-${index}`} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="director">Director</Label>
          <Input
            id="director"
            name="director"
            value={formState?.director}
            onChange={handleChange}
            placeholder="Director Name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rating">
            IMDb Rating<span className="text-red-500">*</span>
          </Label>
          <Input
            id="rating"
            name="rating"
            placeholder="IMDb Rating (0.0 - 10.0)"
            type="number"
            max="10"
            min="0"
            step="0.1"
            value={formState?.rating}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="runtime">
            Runtime<span className="text-red-500">*</span>
          </Label>
          <Input
            id="runtime"
            name="runtime"
            placeholder="Runtime in Minutes"
            type="number"
            max="1000"
            min="0"
            step="1"
            value={formState?.runtime}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="genre">
            Genre<span className="text-red-500">*</span>
          </Label>
          <div className="grid max-h-48 gap-2 overflow-y-auto rounded-md border p-3 md:grid-cols-2 lg:grid-cols-3">
            {genres.map((genre, index) => (
              <label
                key={`${genre}-${index}`}
                className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={formState.genres.includes(genre)}
                  onCheckedChange={() => toggleGenre(genre)}
                />
                <span>{genre}</span>
              </label>
            ))}
          </div>
          <p className="text-muted-foreground text-xs">
            Select one or more genres.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cast">Cast</Label>
          <Input
            id="cast"
            name="cast"
            value={formState?.cast}
            onChange={handleChange}
            placeholder="Cast names separated by commas"
          />
          <p className="text-muted-foreground text-xs">
            Example: Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page
          </p>
        </div>
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="overview">Overview</Label>
        <Textarea
          id="overview"
          name="overview"
          placeholder="Movie description"
          className="h-25"
          value={formState?.overview}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="poster">
            Poster URL<span className="text-red-500">*</span>
          </Label>
          <Input
            id="poster"
            name="poster"
            placeholder="URL to Poster image"
            value={formState?.poster}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="backdrop">
            Backdrop URL<span className="text-red-500">*</span>
          </Label>
          <Input
            id="backdrop"
            name="backdrop"
            placeholder="URL to Backdrop image"
            value={formState?.backdrop}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="status">
            Status<span className="text-red-500">*</span>
          </Label>
          <Select
            id="status"
            name="status"
            value={formState?.status}
            onValueChange={(value) =>
              setFormState((prevState) => ({
                ...prevState,
                status: value,
              }))
            }
            required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status, index) => (
                <SelectItem key={`${status}-${index}`} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter className="gap-2 sm:gap-0">
        <Button
          type="reset"
          variant="outline"
          className="min-w-25.5"
          disabled={isSubmitting}
          onClick={() => showDialog(false)}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="min-w-25.5"
          disabled={isSubmitting || formState.genres.length === 0}>
          {isSubmitting ? "Updating..." : "Update Movie"}
        </Button>
      </DialogFooter>
    </form>
  );
}
