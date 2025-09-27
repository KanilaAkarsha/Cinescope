"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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

export default function AddMoviesForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const years = getAllYears();
  const genres = getAllGenres();
  const statuses = getAllMovieStatus();
  return (
    <form className="space-y-4">
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
            <Button type="reset" variant="outline" className="min-w-[6.375rem] " disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" className="min-w-[6.375rem] " disabled={isSubmitting}>{isSubmitting ? "Adding...": "Add Movie"}</Button>
          </DialogFooter>
    </form>
  );
}
