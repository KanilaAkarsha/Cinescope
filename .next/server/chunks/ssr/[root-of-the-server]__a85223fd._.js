module.exports = {

"[externals]/mongodb [external] (mongodb, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}}),
"[project]/db/index.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "db": (()=>db)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
const options = {};
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["MongoClient"](MONGODB_URI, options);
const db = client.db("sample_mflix"); // Access the database instance
}}),
"[project]/actions/movies.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"7f08cce86fd416d70bd28716c566059702095be26f":"deleteMovie","7f2198382988381d3179a900648dc9a27e46db3844":"searchMovies","7f7d72ac7f0851ade5d79cb28e3a50b93e7c92682e":"updateMovie","7f91c7a2cd0049e412f36183952d80a56da8582875":"createMovie","7f9c472aadc9154289100206068a143769d7e7287e":"users","7fa4568a14b35b33e829b8f60886580c46a3fed87a":"getReviewsForMovie","7fd94c18048b2b8ae612e28cb321070508d84d0752":"getMovies","7ff1a5382140b0ce3d0f2d437c54c4a37ee0540a71":"getMovieById"},"",""] */ __turbopack_context__.s({
    "createMovie": (()=>createMovie),
    "deleteMovie": (()=>deleteMovie),
    "getMovieById": (()=>getMovieById),
    "getMovies": (()=>getMovies),
    "getReviewsForMovie": (()=>getReviewsForMovie),
    "searchMovies": (()=>searchMovies),
    "updateMovie": (()=>updateMovie),
    "users": (()=>users)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$db$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/db/index.js [app-rsc] (ecmascript)");
// import { MOVIES } from "@/lib/data";
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
var __TURBOPACK__url__external__node$3a$test__ = __turbopack_context__.x("node:test", ()=>require("node:test"), true);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
const getMovies = async ()=>{
    console.log("response");
    try {
        // Fetch movies from the API
        const movieResponse = await fetch(`${process.env.API_BASE_URL}/v1/movies`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            cache: "no-store"
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
const searchMovies = async (query)=>{
    try {
        //search by title (i=case insensitive)
        const movies = await __TURBOPACK__imported__module__$5b$project$5d2f$db$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].collection("movies_n").find({
            title: {
                $regex: query,
                $options: "i"
            }
        }).limit(50).toArray();
        console.log("movies", movies);
        if (movies && movies.length > 0) {
            return {
                success: true,
                message: "Movies fetched successfully",
                data: movies
            };
        } else {
            return {
                success: false,
                message: "No movies found",
                data: []
            };
        }
    } catch (error) {
        console.log("Error", error);
        return {
            success: false,
            message: "Error fetching movies",
            data: []
        };
    }
};
const createMovie = async (movie)=>{
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$db$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].collection("movies_n").insertOne(movie);
        if (result.acknowledged) {
            console.log(`A movie was inserted with the _id: ${result.insertedId}`);
            return {
                success: true,
                message: "Movie Created Successfully"
            };
        } else {
            return undefined;
        }
    } catch (error) {
        console.log("Mongodb movie insert failed", error);
    }
};
const updateMovie = async (movieDoc, movieId)=>{
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$db$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].collection("movies_n").updateOne({
            _id: __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"].createFromHexString(movieId)
        }, {
            $set: movieDoc
        }, {
            upsert: true
        } // Update the movie with the new data
        );
        if (result.acknowledged) {
            console.log(`A movie was updated with the _id: ${result.upsertedId}`);
            return {
                success: true,
                message: "Movie Updated Successfully"
            };
        } else {
            return undefined;
        }
    } catch (error) {
        console.log("Mongodb movie update failed", error);
    }
};
const deleteMovie = async (movieId)=>{
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$db$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].collection("movies_n").deleteOne({
            _id: __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"].createFromHexString(movieId)
        } // Filter to find the movie by its ID
        );
        if (result.acknowledged) {
            console.log(`A movie was deleted with the _id: ${result.insertedId}`);
            return {
                success: true,
                message: "Movie Deleted Successfully"
            };
        } else {
            return undefined;
        }
    } catch (error) {
        console.log("Mongodb movie delete failed", error);
    }
};
const getMovieById = async (movieId)=>{
    // Call the database based on parameter
    // Simulate 2 second delay
    //   return await new Promise((resolve) =>
    //     setTimeout(() => resolve(MOVIES.at(5)), 2000)
    //   );
    try {
        const movie = await __TURBOPACK__imported__module__$5b$project$5d2f$db$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].collection("movies_n").findOne({
            _id: __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"].createFromHexString(movieId)
        } // Filter to find the movie by its ID
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
                runtime: movie.runtime
            };
            return {
                success: true,
                message: "Movie fetched successfully",
                data: refindedMovie
            };
        } else {
            console.log("Mongodb get movie by id: Movie not found");
            return {
                success: false,
                message: "Movie not found",
                data: null
            };
        }
    } catch (error) {
        console.log("Mongodb get movie by id failed", error);
        return {
            success: false,
            message: "Error fetching movie",
            data: null
        };
    }
};
const getReviewsForMovie = async (movieId)=>{
    return await new Promise((resolve)=>setTimeout(()=>resolve([
                {
                    id: 123,
                    userAvatar: "",
                    userName: "Test",
                    comment: "This is a test comment",
                    rating: 4.5,
                    createdAt: ""
                }
            ]), 2000));
};
const users = async (query)=>{
    try {
        const users = await __TURBOPACK__imported__module__$5b$project$5d2f$db$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].collection("users").find({
            name: {
                $regex: query,
                $options: "i"
            }
        }).limit(50).toArray();
        console.log("users", users);
        if (users && users.length > 0) {
            return {
                success: true,
                message: "Users fetched successfully",
                data: users
            };
        } else {
            return {
                success: false,
                message: "No users found",
                data: []
            };
        }
    } catch (error) {
        console.log("Error fetching users:", error);
        return {
            success: false,
            message: "Error fetching users",
            data: []
        };
    }
};
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getMovies,
    searchMovies,
    createMovie,
    updateMovie,
    deleteMovie,
    getMovieById,
    getReviewsForMovie,
    users
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMovies, "7fd94c18048b2b8ae612e28cb321070508d84d0752", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(searchMovies, "7f2198382988381d3179a900648dc9a27e46db3844", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createMovie, "7f91c7a2cd0049e412f36183952d80a56da8582875", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateMovie, "7f7d72ac7f0851ade5d79cb28e3a50b93e7c92682e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteMovie, "7f08cce86fd416d70bd28716c566059702095be26f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMovieById, "7ff1a5382140b0ce3d0f2d437c54c4a37ee0540a71", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getReviewsForMovie, "7fa4568a14b35b33e829b8f60886580c46a3fed87a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(users, "7f9c472aadc9154289100206068a143769d7e7287e", null);
}}),
"[project]/.next-internal/server/app/admin/users/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/movies.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$movies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/movies.js [app-rsc] (ecmascript)");
;
}}),
"[project]/.next-internal/server/app/admin/users/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/movies.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$movies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/movies.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$users$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$movies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/users/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/movies.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/admin/users/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/movies.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "7f9c472aadc9154289100206068a143769d7e7287e": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$movies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["users"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$movies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/movies.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$users$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$movies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/users/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/movies.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/admin/users/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/movies.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "7f9c472aadc9154289100206068a143769d7e7287e": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$users$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$movies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["7f9c472aadc9154289100206068a143769d7e7287e"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$users$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$movies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/users/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/movies.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <module evaluation>');
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$users$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$movies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/users/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/movies.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <exports>');
}}),
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}}),
"[project]/app/layout.jsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.jsx [app-rsc] (ecmascript)"));
}}),
"[project]/app/admin/layout.jsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/app/admin/layout.jsx [app-rsc] (ecmascript)"));
}}),
"[project]/app/admin/users/loading.jsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/app/admin/users/loading.jsx [app-rsc] (ecmascript)"));
}}),
"[project]/app/admin/users/page.jsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/admin/users/page.jsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/admin/users/page.jsx <module evaluation>", "default");
}}),
"[project]/app/admin/users/page.jsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/admin/users/page.jsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/admin/users/page.jsx", "default");
}}),
"[project]/app/admin/users/page.jsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$users$2f$page$2e$jsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/admin/users/page.jsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$users$2f$page$2e$jsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/app/admin/users/page.jsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$users$2f$page$2e$jsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/app/admin/users/page.jsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/app/admin/users/page.jsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__a85223fd._.js.map