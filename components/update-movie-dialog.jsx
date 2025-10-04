"use client";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateMovieForm from "./update-movie-form";
import { on } from "events";
export default function UpdateMovieDialog( open, onOpenChange, movie) {

  return ( 
  <Dialog open={open} onOpenChange={onOpenChange}>
  {/* <DialogTrigger asChild>
    <Button><PlusIcon className="mr-2 w-4 h-4"/>Update Movie</Button>
    </DialogTrigger> */}
  <DialogContent className="sm:max-w-[37.5rem]">
    <DialogHeader>
      <DialogTitle>Update Movie</DialogTitle>
      <DialogDescription>
        Fill in the details to Update the movie.
      </DialogDescription>
    </DialogHeader>
    <UpdateMovieForm showDialog={onOpenChange} movie={movie}/>
  </DialogContent>
</Dialog>
  )
}
