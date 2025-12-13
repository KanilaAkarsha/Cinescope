"use server";
import { db } from "@/db";

// import { MOVIES } from "@/lib/data";

import { ObjectId } from "mongodb";
import { it, run } from "node:test";

// get all movies database - action
export const getMovies = async () => {
  console.log("response");
  try {
    // Fetch movies from the API
    const movieResponse = await fetch(`${process.env.API_BASE_URL}/v1/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!movieResponse.ok) {
      throw new Error("Failed to fetch movies");
    }

    if (movieResponse.status === 200) {
      return await movieResponse.json();
    } else {
      console.log("No movies found");
      return undefined;
    }
  } catch (error) {
    console.log("Error fetching movies:", error);
    return undefined;
  }
};

// option 2 : Search movies from the database using server action

export const searchMovies = async (query) => {
  try {
    //search by title (i=case insensitive)
    const movies = await db
      .collection("movies_n")
      .find({ title: { $regex: query, $options: "i" } })
      .limit(50)
      .toArray();
    console.log("movies", movies);
    if (movies && movies.length > 0) {
      return {
        success: true,
        message: "Movies fetched successfully",
        data: movies,
      };
    } else {
      return {
        success: false,
        message: "No movies found",
        data: [],
      };
    }
  } catch (error) {
    console.log("Error", error);
    return {
      success: false,
      message: "Error fetching movies",
      data: [],
    };
  }
};

export const createMovie = async (movie) => {
  try {
    const result = await db.collection("movies_n").insertOne(movie);

    if (result.acknowledged) {
      console.log(`A movie was inserted with the _id: ${result.insertedId}`);

      return {
        success: true,
        message: "Movie Created Successfully",
      };
    } else {
      return undefined;
    }
  } catch (error) {
    console.log("Mongodb movie insert failed", error);
  }
};

export const updateMovie = async (movieDoc, movieId) => {
  try {
    const result = await db.collection("movies_n").updateOne(
      { _id: ObjectId.createFromHexString(movieId) }, // Filter to find the movie by its ID
      { $set: movieDoc },
      { upsert: true } // Update the movie with the new data
    );

    if (result.acknowledged) {
      console.log(`A movie was updated with the _id: ${result.upsertedId}`);

      return {
        success: true,
        message: "Movie Updated Successfully",
      };
    } else {
      return undefined;
    }
  } catch (error) {
    console.log("Mongodb movie update failed", error);
  }
};

export const deleteMovie = async (movieId) => {
  try {
    const result = await db.collection("movies_n").deleteOne(
      { _id: ObjectId.createFromHexString(movieId) } // Filter to find the movie by its ID
    );

    if (result.acknowledged) {
      console.log(`A movie was deleted with the _id: ${result.insertedId}`);

      return {
        success: true,
        message: "Movie Deleted Successfully",
      };
    } else {
      return undefined;
    }
  } catch (error) {
    console.log("Mongodb movie delete failed", error);
  }
};

export const getMovieById = async (movieId) => {
  // Call the database based on parameter
  // Simulate 2 second delay
  //   return await new Promise((resolve) =>
  //     setTimeout(() => resolve(MOVIES.at(5)), 2000)
  //   );

  try {
    const movie = await db.collection("movies_n").findOne(
      { _id: ObjectId.createFromHexString(movieId) } // Filter to find the movie by its ID
    );

    if (movie && Object.keys(movie).length > 0) {
      console.log(`Mongodb get movie by id success: ${movie._id}`);
      const refindedMovie = {
        title: movie.title,
        backdrop: movie.backdrop,
        poster: movie.poster,
        year: movie.year,
        rating: movie.imdb.rating ?? 0,
        genre: movie.genres,
        director: movie.directors[0],
        releaseDate: movie.released,
        overview: movie.fullplot ?? movie.plot,
        runtime: movie.runtime,
      };
      return {
        success: true,
        message: "Movie fetched successfully",
        data: refindedMovie,
      };
    } else {
      console.log("Mongodb get movie by id: Movie not found");
      return {
        success: false,
        message: "Movie not found",
        data: null,
      };
    }
  } catch (error) {
    console.log("Mongodb get movie by id failed", error);
    return {
      success: false,
      message: "Error fetching movie",
      data: null,
    };
  }
};

export const createReviewForMovie = async (movieId, review) => {
  try {
    const result = await db.collection("reviews").insertOne({
      movieId: ObjectId.createFromHexString(movieId),
      ...review,
    });

    if (result.acknowledged) {
      console.log(`A review was inserted with the _id: ${result.insertedId}`);

      return {
        success: true,
        message: "Review Created Successfully",
      };
    } else {
      return undefined;
    }
  } catch (error) {
    console.log("Error creating review:", error);
    return undefined;
  }
};

export const getReviewsForMovie = async (movieId) => {
  try {
    const reviews = await db
      .collection("reviews")
      .find({ movieId: ObjectId.createFromHexString(movieId) })
      .toArray();
    console.log("reviews", reviews);
    if (reviews && reviews.length > 0) {
      return {
        success: true,
        message: "Reviews fetched successfully",
        data: reviews,
      };
    } else {
      return {
        success: false,
        message: "No reviews found",
        data: [],
      };
    }
  } catch (error) {
    console.log("Error fetching reviews:", error);
    return {
      success: false,
      message: "Error fetching reviews",
      data: [],
    };
  }
};

export const getAllGenres = async () => {
  return [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
  ];
};
