"use server";
import {db} from "@/db";
import { MOVIES } from "@/lib/data";
import { ObjectId } from "mongodb";

// get all movies database - action
export const getMovies = async () => {
    console.log("response")
    try {
        // Fetch movies from the API
        const movieResponse = await fetch(`${process.env.API_BASE_URL}/v1/movies`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                cache: "no-store",
            }
        );
        


        if (!movieResponse.ok) {
            throw new Error("Failed to fetch movies");
        }

        if (movieResponse.status === 200) {
            return await movieResponse.json();
        }else{
            console.log("No movies found");
            return undefined;
        }
    } catch (error) {
        console.log("Error fetching movies:", error);
        return undefined;
    }
}

// option 2 : Search movies from the database using server action

export const searchMovies = async (query) => {
    
    try{
        //search by title (i=case insensitive)
        const movies = await db.collection("movies_n").find({title: {$regex: query, $options: "i" }}).limit(50).toArray();
        console.log("movies",movies)
        if(movies && movies.length > 0){
            return {
                success: true,
                message: "Movies fetched successfully",
                data: movies,
            };
        }else{
            return {
                success: false,
                message: "No movies found",
                data: [],
            };
        }
    }catch(error){
        console.log("Error",error)
        return {
                success: false,
                message: "Error fetching movies",
                data: [],
            };
}
};

export const createMovie = async (movie) => {
    try{
        const result = await db.collection("movies_n").insertOne(movie);

        if(result.acknowledged){
            console.log(`A movie was inserted with the _id: ${result.insertedId}`)

            return {
                success: true,
                message: "Movie Created Successfully",
            };
        }else{
            return undefined;
        }
    }catch(error){
        console.log("Mongodb movie insert failed",error)
    }
};

export const updateMovie = async (movieDoc,movieId) => {
    try{
        const result = await db.collection("movies_n").updateOne(
            { _id:  ObjectId.createFromHexString(movieId) }, // Filter to find the movie by its ID
            { $set: movieDoc },
            { upsert: true } // Update the movie with the new data
        );

        if(result.acknowledged){
            console.log(`A movie was updated with the _id: ${result.upsertedId}`)

            return {
                success: true,
                message: "Movie Updated Successfully",
            };
        }else{
            return undefined;
        }
    }catch(error){
        console.log("Mongodb movie update failed",error)
    }
};

export const deleteMovie = async (movieId) => {
    try{
        const result = await db.collection("movies_n").deleteOne(
            { _id:  ObjectId.createFromHexString(movieId) } // Filter to find the movie by its ID
            
        );

        if(result.acknowledged){
            console.log(`A movie was deleted with the _id: ${result.insertedId}`)

            return {
                success: true,
                message: "Movie Deleted Successfully",
            };
        }else{
            return undefined;
        }
    }catch(error){
        console.log("Mongodb movie delete failed",error)
    }
};

export const getMovieById = async (movieId) => {
  // Call the database based on parameter
  // Simulate 2 second delay
  return await new Promise((resolve) =>
    setTimeout(() => resolve(MOVIES.at(5)), 2000)
  );
};

export const getReviewsForMovie = async (movieId) => {
  return [
    {
      id: 123,
      userAvatar: "",
      userName: "Test",
      comment: "This is a test comment",
      rating: 4.5,
      createdAt: "",
    },
  ];
};