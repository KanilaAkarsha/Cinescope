import {MongoClient} from 'mongodb';

const options = {};
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

const client = new MongoClient(MONGODB_URI, options);

export const db = client.db("sample_mflix"); // Access the database instance
