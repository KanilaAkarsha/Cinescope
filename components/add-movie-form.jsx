 "use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  DialogFooter,
} from "@/components/ui/dialog";
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
import { on } from "events";


export default function AddMovieForm({showDialog}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const years = getAllYears();
  const genres = getAllGenres();
  const statuses = getAllMovieStatus();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const movie = {
      title: formData.get("title"),
      year: formData.get("year"),
      directors: [formData.get("director")],
      genres: [formData.get("genre")],
      imdb: {rating: Number(formData.get("rating"))},
      runtime: formData.get("runtime"),
      plot: formData.get("overview"),
      poster: formData.get("poster"),
      backdrop: formData.get("backdrop"),
      status: formData.get("status"),
      lastUpdated: new Date().toISOString(),
    };

    setIsSubmitting(true);

    try{
    const response = await createMovie(movie);

    if(response?.success){
      router.refresh();
      setIsSubmitting(false);
      showDialog(false);
    }
    }catch{
      console.log("Error in handle submit");
      
    }

    
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title<span className="text-red-500">*</span></Label>
          <Input id="title" name="title" placeholder="Movie title" required/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Year<span className="text-red-500">*</span></Label>
          <Select id="year" name="year" required>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Please select year" />
  </SelectTrigger>
  <SelectContent>  
    {years.map((year,index) => (<SelectItem key={`${year}-${index}`} value={year}>{year}</SelectItem>))}
  </SelectContent>
</Select>
        </div>
      </div>
       <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="director">Director</Label>
          <Input id="director" name="director" placeholder="Director Name"/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="genre">Genre<span className="text-red-500">*</span></Label>
          <Select id="genre" name="genre" required>
             <SelectTrigger className="w-full">
               <SelectValue placeholder="Select Genre" />
                  </SelectTrigger>
                   <SelectContent>  
                    {genres.map((genre,index) => (<SelectItem key={`${genre}-${index}`} value={genre}>{genre}</SelectItem>))}
                    </SelectContent>
                </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="rating">IMDb Rating<span className="text-red-500">*</span></Label>
          <Input id="rating" name="rating" placeholder="IMDb Rating (0.0 - 10.0)" type="number" max="10" min="0" step="0.1" required/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="runtime">Runtime<span className="text-red-500">*</span></Label>
          <Input id="runtime" name="runtime" placeholder="Runtime in Minutes" type="number" max="1000" min="0" step="1" required/>
        </div>
        
      </div>
      <div className="space-y-2">
          <Label htmlFor="overview">Overview</Label>
          <Textarea id="overview" name="overview" placeholder="Movie discription" className="h-[6.25rem]"/>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
          <Label htmlFor="poster">Poster URL<span className="text-red-500">*</span></Label>
          <Input id="poster" name="poster" placeholder="URL to Poster image" required/>
        </div>

        <div className="space-y-2">
          <Label htmlFor="backdrop">Backdrop URL<span className="text-red-500">*</span></Label>
          <Input id="backdrop" name="backdrop" placeholder="URL to Backdrop image" required/>
        </div>

         <div className="space-y-2">
          <Label htmlFor="status">Status<span className="text-red-500">*</span></Label>
          <Select id="status" name="status" required>
             <SelectTrigger className="w-full">
               <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                   <SelectContent>  
                    {statuses.map((status,index) => (<SelectItem key={`${status}-${index}`} value={status}>{status}</SelectItem>))}
                    </SelectContent>
                </Select>
        </div>

        </div>
         <DialogFooter>
            <Button type="reset" variant="outline" className="min-w-[6.375rem] " disabled={isSubmitting} onClick={() => showDialog(false)}>Cancel</Button>
            <Button type="submit" className="min-w-[6.375rem]" disabled={isSubmitting}>{isSubmitting ? "Adding...": "Add Movie"}</Button>
          </DialogFooter>
    </form>
  );
}
