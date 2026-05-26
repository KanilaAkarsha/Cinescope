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
import { createMovie } from "@/actions/movies";
import { Checkbox } from "@/components/ui/checkbox";

export default function AddMovieForm({ showDialog }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [castValue, setCastValue] = useState("");
  const years = getAllYears();
  const genres = getAllGenres();
  const statuses = getAllMovieStatus();

  const toggleGenre = (genre) => {
    setSelectedGenres((currentGenres) =>
      currentGenres.includes(genre)
        ? currentGenres.filter((currentGenre) => currentGenre !== genre)
        : [...currentGenres, genre],
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cast = castValue
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    const movie = {
      title: formData.get("title"),
      year: formData.get("year"),
      directors: [formData.get("director")],
      cast,
      genres: selectedGenres,
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
      const response = await createMovie(movie);

      if (response?.success) {
        router.refresh();
        setIsSubmitting(false);
        showDialog(false);
      }
    } catch {
      console.log("Error in handle submit");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">
            Title<span className="text-red-500">*</span>
          </Label>
          <Input id="title" name="title" placeholder="Movie title" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">
            Year<span className="text-red-500">*</span>
          </Label>
          <Select id="year" name="year" required>
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
          <Input id="director" name="director" placeholder="Director Name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cast">Cast</Label>
          <Textarea
            id="cast"
            name="cast"
            value={castValue}
            onChange={(event) => setCastValue(event.target.value)}
            placeholder="Cast names separated by commas"
          />
          <p className="text-muted-foreground text-xs">
            Add multiple cast members separated by commas.
          </p>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="genre">
            Genre<span className="text-red-500">*</span>
          </Label>
          <div className="grid max-h-48 gap-2 overflow-y-auto rounded-md border p-3 sm:grid-cols-2 lg:grid-cols-3">
            {genres.map((genre, index) => (
              <label
                key={`${genre}-${index}`}
                className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={selectedGenres.includes(genre)}
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
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="overview">Overview</Label>
        <Textarea
          id="overview"
          name="overview"
          placeholder="Movie discription"
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
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">
            Status<span className="text-red-500">*</span>
          </Label>
          <Select id="status" name="status" required>
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

      <DialogFooter>
        <Button
          type="reset"
          variant="outline"
          disabled={isSubmitting}
          onClick={() => showDialog(false)}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || selectedGenres.length === 0}>
          {isSubmitting ? "Adding..." : "Add Movie"}
        </Button>
      </DialogFooter>
    </form>
  );
}
