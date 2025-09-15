import { NextResponse } from "next/server";
import { db } from "@/db"; // Import the database instance

export const GET= async() => {
    try {
        const movies = await db.collection("movies").find({}).sort({metacritc: -1}).limit(50).toArray().catch((error) =>{
            console.error("Error fetching movies:", error);
            return [];
        }); // Fetch all movies from the "movies" collection
        return NextResponse.json(movies);
    } catch (error) {
        console.log("Database connection error:", error);
        return NextResponse.json({ error: "Database connection error" }, { status: 500 });
    }
    
}