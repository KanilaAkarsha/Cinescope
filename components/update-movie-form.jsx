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
import { getAllMovieStatus, getAllYears } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { updateMovie } from "@/actions/movies";

const parseCommaSeparated = (value) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const buildMultiValueFields = ({ castInput, genreInput }) => {
  const parsedCast = parseCommaSeparated(castInput);
  const parsedGenres = parseCommaSeparated(genreInput);

  return {
    cast: parsedCast,
    genres: parsedGenres,
  };
};

export default function UpdateMovieForm({ showDialog, movie }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    title: movie?.title || "",
    year: movie?.year || null,
    director: movie?.directors?.at(0) || "",
    cast: Array.isArray(movie?.cast) ? movie.cast.join(", ") : "",
    genre: Array.isArray(movie?.genres) ? movie.genres.join(", ") : "",
    rating: movie?.imdb?.rating || "",
    runtime: movie?.runtime || "",
    overview: movie?.plot || "",
    poster: movie?.poster || "",
    backdrop: movie?.backdrop || "",
    movieFileLink: movie?.movieFileLink || movie?.fileLink || "",
    status: movie?.status || "",
    releaseDate: movie?.releaseDate || "",
  });
  const years = getAllYears();
  const statuses = getAllMovieStatus();

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

    const multiValueFields = buildMultiValueFields({
      castInput: formData.get("cast"),
      genreInput: formData.get("genre"),
    });

    const movieDoc = {
      title: formData.get("title"),
      year: formData.get("year"),
      directors: [formData.get("director")],
      cast: multiValueFields.cast,
      genres: multiValueFields.genres,
      imdb: { rating: Number(formData.get("rating")) },
      runtime: formData.get("runtime"),
      plot: formData.get("overview"),
      poster: formData.get("poster"),
      backdrop: formData.get("backdrop"),
      movieFileLink: formData.get("movieFileLink"),
      status: formData.get("status"),
      releaseDate: formData.get("releaseDate"),
    };

    setIsSubmitting(true);

    try {
      const response = await updateMovie(movieDoc, movie?.id);

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
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
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
      <div className="grid grid-cols-2 gap-4">
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
          <Label htmlFor="cast">Cast</Label>
          <Input
            id="cast"
            name="cast"
            value={formState?.cast}
            onChange={handleChange}
            placeholder="Cast names (comma separated)"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="genre">
            Genre<span className="text-red-500">*</span>
          </Label>
          <Input
            id="genre"
            name="genre"
            placeholder="Genres (comma separated)"
            value={formState?.genre}
            onChange={handleChange}
            required
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

      <div className="grid grid-cols-2 gap-4">
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

        <div className="space-y-2">
          <Label htmlFor="movieFileLink">Movie File Link</Label>
          <Input
            id="movieFileLink"
            name="movieFileLink"
            placeholder="URL to downloadable movie file"
            value={formState?.movieFileLink}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
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
      <DialogFooter>
        <Button
          type="reset"
          variant="outline"
          className="min-w-25.5 "
          disabled={isSubmitting}
          onClick={() => showDialog(false)}>
          Cancel
        </Button>
        <Button type="submit" className="min-w-25.5" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Movie"}
        </Button>
      </DialogFooter>
    </form>
  );
}
