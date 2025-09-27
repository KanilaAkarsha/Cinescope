"use client ";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
 } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
export default function MovieTable({ movies }) {
  return (
    <div className="rounded-md border">
    <Table >
  <TableCaption className="sr-only ">Admin Movies Table</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[80px]">#</TableHead>
      <TableHead>Title</TableHead>
      <TableHead>Year</TableHead>
      <TableHead>Genre</TableHead>
      <TableHead className="text-center">Rating</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {movies.map((movie, key) => (
      <TableRow key={movie.id}>
      <TableCell className="font-medium"> {key+ 1}</TableCell>
      <TableCell><div className="flex items-center gap-2">
        <Image src={movie.poster ?? "/placeholder.svg"} width={28} height={40} alt={movie.title} className="h-10 w-7 rounded object-cover"/>
        <span className="font-medium max-w-60 text-wrap line-clamp-2">{movie.title}</span>
        </div></TableCell>
      <TableCell>{movie.year}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
        {movie.genres.map((genre) => (<Badge key={genre} variant="outline" className="text-xs">{genre}</Badge>))}
        </div>
        </TableCell>
      <TableCell>{Number(movie?.imdb?.rating).toFixed(1)}</TableCell>
      <TableCell className="capitalize"><Badge className="bg-green-100 text-green-800">{movie.status}</Badge></TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost " className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>

        </DropdownMenu>
      </TableCell>
    </TableRow>))}
  </TableBody>
</Table>
</div>
  )
}
