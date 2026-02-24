module.exports = [
"[project]/.next-internal/server/app/genres/page/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/app/layout.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.jsx [app-rsc] (ecmascript)"));
}),
"[project]/lib/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "capitalizeFirstLetter",
    ()=>capitalizeFirstLetter,
    "cn",
    ()=>cn,
    "getAllGenres",
    ()=>getAllGenres,
    "getAllMovieStatus",
    ()=>getAllMovieStatus,
    "getAllYears",
    ()=>getAllYears
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-rsc] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function getAllYears() {
    return Array.from({
        length: 100
    }, (_, i)=>(new Date().getFullYear() - i).toString());
}
function getAllGenres() {
    return [
        "Action",
        "Adventure",
        "Comedy",
        "Drama",
        "Fantasy",
        "Horror",
        "Musicals",
        "Mystery",
        "Romance",
        "Sci-Fi",
        "Sports",
        "Thriller",
        "Western"
    ];
}
function getAllMovieStatus() {
    return [
        "Published",
        "Draft",
        "Archived"
    ];
}
function capitalizeFirstLetter(str) {
    if (str.length === 0) {
        return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
}),
"[project]/components/ui/card.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-rsc] (ecmascript)");
;
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.jsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.jsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.jsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.jsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.jsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.jsx",
        lineNumber: 78,
        columnNumber: 11
    }, this);
}
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.jsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/lib/data.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// JSON Object Array of movie objects
// Exported as MOVIES array
// Dummy Movies Data
// JSON Object Array of movie objects
// Exported as MOVIES array
__turbopack_context__.s([
    "MOVIES",
    ()=>MOVIES,
    "analyticsData",
    ()=>analyticsData,
    "getAllGenres",
    ()=>getAllGenres,
    "getAllYears",
    ()=>getAllYears,
    "getMovieById",
    ()=>getMovieById,
    "getReviewsForMovie",
    ()=>getReviewsForMovie,
    "movies",
    ()=>movies,
    "reviews",
    ()=>reviews,
    "users",
    ()=>users
]);
const MOVIES = [
    {
        id: "1",
        title: "Inception",
        year: 2010,
        director: "Christopher Nolan",
        genre: [
            "Action",
            "Sci-Fi",
            "Thriller"
        ],
        rating: 8.8,
        runtime: 148,
        poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX700_.jpg",
        backdrop: "/placeholder.svg?height=800&width=1200",
        overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        releaseDate: "2010-07-16",
        status: "published",
        createdAt: "2023-01-15T12:00:00Z",
        updatedAt: "2023-01-15T12:00:00Z"
    },
    {
        id: "2",
        title: "The Dark Knight",
        year: 2008,
        director: "Christopher Nolan",
        genre: [
            "Action",
            "Crime",
            "Drama"
        ],
        rating: 9.0,
        runtime: 152,
        poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UY2048_.jpg",
        backdrop: "/placeholder.svg?height=800&width=1200",
        overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        releaseDate: "2008-07-18",
        status: "published",
        createdAt: "2023-01-16T12:00:00Z",
        updatedAt: "2023-01-16T12:00:00Z"
    },
    {
        id: "3",
        title: "Pulp Fiction",
        year: 1994,
        director: "Quentin Tarantino",
        genre: [
            "Crime",
            "Drama"
        ],
        rating: 8.9,
        runtime: 154,
        poster: "https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_FMjpg_UX1055_.jpg",
        backdrop: "/placeholder.svg?height=800&width=1200",
        overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        releaseDate: "1994-10-14",
        status: "published",
        createdAt: "2023-01-17T12:00:00Z",
        updatedAt: "2023-01-17T12:00:00Z"
    },
    {
        id: "4",
        title: "The Shawshank Redemption",
        year: 1994,
        director: "Frank Darabont",
        genre: [
            "Drama"
        ],
        rating: 9.3,
        runtime: 142,
        poster: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_FMjpg_UX1200_.jpg",
        backdrop: "/placeholder.svg?height=800&width=1200",
        overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        releaseDate: "1994-09-23",
        status: "published",
        createdAt: "2023-01-18T12:00:00Z",
        updatedAt: "2023-01-18T12:00:00Z"
    },
    {
        id: "5",
        title: "The Godfather",
        year: 1972,
        director: "Francis Ford Coppola",
        genre: [
            "Crime",
            "Drama"
        ],
        rating: 9.2,
        runtime: 175,
        poster: "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_FMjpg_UY1982_.jpg",
        backdrop: "/images/hero-4.jpg",
        overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        releaseDate: "1972-03-24",
        status: "published",
        createdAt: "2023-01-19T12:00:00Z",
        updatedAt: "2023-01-19T12:00:00Z"
    },
    {
        id: "6",
        title: "Interstellar",
        year: 2014,
        director: "Christopher Nolan",
        genre: [
            "Adventure",
            "Drama",
            "Sci-Fi"
        ],
        rating: 8.6,
        runtime: 169,
        poster: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UY3600_.jpg",
        backdrop: "/images/hero-4.jpg",
        overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        releaseDate: "2014-11-07",
        status: "published",
        createdAt: "2023-01-20T12:00:00Z",
        updatedAt: "2023-01-20T12:00:00Z"
    }
];
const movies = [
    {
        id: "1",
        title: "Inception",
        year: 2010,
        director: "Christopher Nolan",
        genre: [
            "Action",
            "Sci-Fi",
            "Thriller"
        ],
        rating: 8.8,
        runtime: 148,
        // poster: "/placeholder.svg?height=500&width=300",
        poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX700_.jpg",
        backdrop: "/placeholder.svg?height=800&width=1200",
        overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        releaseDate: "2010-07-16",
        status: "published",
        createdAt: "2023-01-15T12:00:00Z",
        updatedAt: "2023-01-15T12:00:00Z"
    },
    {
        id: "2",
        title: "The Dark Knight",
        year: 2008,
        director: "Christopher Nolan",
        genre: [
            "Action",
            "Crime",
            "Drama"
        ],
        rating: 9.0,
        runtime: 152,
        poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UY2048_.jpg",
        backdrop: "/placeholder.svg?height=800&width=1200",
        overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        releaseDate: "2008-07-18",
        status: "published",
        createdAt: "2023-01-16T12:00:00Z",
        updatedAt: "2023-01-16T12:00:00Z"
    },
    // {
    //   id: "3",
    //   title: "Pulp Fiction",
    //   year: 1994,
    //   director: "Quentin Tarantino",
    //   genre: ["Crime", "Drama"],
    //   rating: 8.9,
    //   runtime: 154,
    //   poster:
    //     "https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_FMjpg_UX1055_.jpg",
    //   backdrop: "/placeholder.svg?height=800&width=1200",
    //   overview:
    //     "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    //   releaseDate: "1994-10-14",
    //   status: "published",
    //   createdAt: "2023-01-17T12:00:00Z",
    //   updatedAt: "2023-01-17T12:00:00Z",
    // },
    {
        id: "4",
        title: "The Shawshank Redemption",
        year: 1994,
        director: "Frank Darabont",
        genre: [
            "Drama"
        ],
        rating: 9.3,
        runtime: 142,
        poster: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_FMjpg_UX1200_.jpg",
        backdrop: "/placeholder.svg?height=800&width=1200",
        overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        releaseDate: "1994-09-23",
        status: "published",
        createdAt: "2023-01-18T12:00:00Z",
        updatedAt: "2023-01-18T12:00:00Z"
    },
    {
        id: "5",
        title: "The Godfather",
        year: 1972,
        director: "Francis Ford Coppola",
        genre: [
            "Crime",
            "Drama"
        ],
        rating: 9.2,
        runtime: 175,
        poster: "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_FMjpg_UY1982_.jpg",
        backdrop: "/images/hero-4.jpg",
        overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        releaseDate: "1972-03-24",
        status: "published",
        createdAt: "2023-01-19T12:00:00Z",
        updatedAt: "2023-01-19T12:00:00Z"
    },
    {
        id: "6",
        title: "Interstellar",
        year: 2014,
        director: "Christopher Nolan",
        genre: [
            "Adventure",
            "Drama",
            "Sci-Fi"
        ],
        rating: 8.6,
        runtime: 169,
        poster: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UY3600_.jpg",
        backdrop: "/images/hero-4.jpg",
        overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        releaseDate: "2014-11-07",
        status: "published",
        createdAt: "2023-01-20T12:00:00Z",
        updatedAt: "2023-01-20T12:00:00Z"
    },
    {
        id: "7",
        title: "The Matrix",
        year: 1999,
        director: "Lana Wachowski, Lilly Wachowski",
        genre: [
            "Action",
            "Sci-Fi"
        ],
        rating: 8.7,
        runtime: 136,
        poster: "https://m.media-amazon.com/images/M/MV5BZjVkOGM1ZTctZGZmOC00MTM0LWFjYjctNjg2MTg1YTM4N2VlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        backdrop: "/placeholder.svg?height=800&width=1200",
        overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        releaseDate: "1999-03-31",
        status: "published",
        createdAt: "2023-01-21T12:00:00Z",
        updatedAt: "2023-01-21T12:00:00Z"
    },
    {
        id: "8",
        title: "Parasite",
        year: 2019,
        director: "Bong Joon Ho",
        genre: [
            "Comedy",
            "Drama",
            "Thriller"
        ],
        rating: 8.6,
        runtime: 132,
        poster: "https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_FMjpg_UY3556_.jpg",
        backdrop: "/placeholder.svg?height=800&width=1200",
        overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        releaseDate: "2019-10-11",
        status: "published",
        createdAt: "2023-01-22T12:00:00Z",
        updatedAt: "2023-01-22T12:00:00Z"
    },
    {
        id: "9",
        title: "Avengers: Endgame",
        year: 2019,
        director: "Anthony Russo, Joe Russo",
        genre: [
            "Action",
            "Adventure",
            "Sci-Fi"
        ],
        rating: 8.4,
        runtime: 181,
        poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_FMjpg_UY2048_.jpg",
        backdrop: "/placeholder.svg?height=800&width=1200",
        overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
        releaseDate: "2019-04-26",
        status: "published",
        createdAt: "2023-01-23T12:00:00Z",
        updatedAt: "2023-01-23T12:00:00Z"
    },
    {
        id: "10",
        title: "Joker",
        year: 2019,
        director: "Todd Phillips",
        genre: [
            "Crime",
            "Drama",
            "Thriller"
        ],
        rating: 8.4,
        runtime: 122,
        poster: "https://m.media-amazon.com/images/M/MV5BNzY3OWQ5NDktNWQ2OC00ZjdlLThkMmItMDhhNDk3NTFiZGU4XkEyXkFqcGc@._V1_FMjpg_UY4096_.jpg",
        backdrop: "/placeholder.svg?height=800&width=1200",
        overview: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
        releaseDate: "2019-10-04",
        status: "published",
        createdAt: "2023-01-24T12:00:00Z",
        updatedAt: "2023-01-24T12:00:00Z"
    },
    {
        id: "11",
        title: "Dune",
        year: 2021,
        director: "Denis Villeneuve",
        genre: [
            "Action",
            "Adventure",
            "Drama"
        ],
        rating: 8.0,
        runtime: 155,
        poster: "https://m.media-amazon.com/images/M/MV5BNWIyNmU5MGYtZDZmNi00ZjAwLWJlYjgtZTc0ZGIxMDE4ZGYwXkEyXkFqcGc@._V1_FMjpg_UY2552_.jpg",
        backdrop: "/placeholder.svg?height=800&width=1200",
        overview: "Feature adaptation of Frank Herbert's science fiction novel, about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
        releaseDate: "2021-10-22",
        status: "published",
        createdAt: "2023-01-25T12:00:00Z",
        updatedAt: "2023-01-25T12:00:00Z"
    },
    {
        id: "12",
        title: "No Time to Die",
        year: 2021,
        director: "Cary Joji Fukunaga",
        genre: [
            "Action",
            "Adventure",
            "Thriller"
        ],
        rating: 7.3,
        runtime: 163,
        poster: "/placeholder.svg?height=500&width=300",
        backdrop: "/placeholder.svg?height=800&width=1200",
        overview: "James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.",
        releaseDate: "2021-09-30",
        status: "draft",
        createdAt: "2023-01-26T12:00:00Z",
        updatedAt: "2023-01-26T12:00:00Z"
    }
];
const users = [
    {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        role: "admin",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "active",
        createdAt: "2023-01-01T12:00:00Z"
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "moderator",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "active",
        createdAt: "2023-01-02T12:00:00Z"
    },
    {
        id: "3",
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        role: "user",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "active",
        createdAt: "2023-01-03T12:00:00Z"
    },
    {
        id: "4",
        name: "Alice Williams",
        email: "alice.williams@example.com",
        role: "user",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "active",
        createdAt: "2023-01-04T12:00:00Z"
    },
    {
        id: "5",
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        role: "user",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "suspended",
        createdAt: "2023-01-05T12:00:00Z"
    },
    {
        id: "6",
        name: "Diana Prince",
        email: "diana.prince@example.com",
        role: "moderator",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "active",
        createdAt: "2023-01-06T12:00:00Z"
    },
    {
        id: "7",
        name: "Ethan Hunt",
        email: "ethan.hunt@example.com",
        role: "user",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "active",
        createdAt: "2023-01-07T12:00:00Z"
    }
];
const reviews = [
    {
        id: "1",
        movieId: "1",
        userId: "3",
        userName: "Bob Johnson",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 9,
        comment: "One of the most mind-bending movies I've ever seen. Christopher Nolan is a genius!",
        status: "approved",
        createdAt: "2023-02-01T12:00:00Z"
    },
    {
        id: "2",
        movieId: "1",
        userId: "4",
        userName: "Alice Williams",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 8,
        comment: "Great concept and execution, but the ending left me a bit confused.",
        status: "approved",
        createdAt: "2023-02-02T12:00:00Z"
    },
    {
        id: "3",
        movieId: "2",
        userId: "3",
        userName: "Bob Johnson",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 10,
        comment: "Heath Ledger's performance as the Joker is legendary. One of the best superhero movies ever made.",
        status: "approved",
        createdAt: "2023-02-03T12:00:00Z"
    },
    {
        id: "4",
        movieId: "3",
        userId: "5",
        userName: "Charlie Brown",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 9,
        comment: "Tarantino at his best. The non-linear storytelling is brilliant.",
        status: "pending",
        createdAt: "2023-02-04T12:00:00Z"
    },
    {
        id: "5",
        movieId: "4",
        userId: "7",
        userName: "Ethan Hunt",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 10,
        comment: "A masterpiece about hope and redemption. Morgan Freeman and Tim Robbins deliver outstanding performances.",
        status: "pending",
        createdAt: "2023-02-05T12:00:00Z"
    },
    {
        id: "6",
        movieId: "6",
        userId: "4",
        userName: "Alice Williams",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 7,
        comment: "Visually stunning but the plot gets too convoluted at times.",
        status: "rejected",
        createdAt: "2023-02-06T12:00:00Z"
    },
    {
        id: "7",
        movieId: "8",
        userId: "3",
        userName: "Bob Johnson",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 10,
        comment: "A perfect social commentary with unexpected twists. Deserved the Oscar for Best Picture.",
        status: "pending",
        createdAt: "2023-02-07T12:00:00Z"
    },
    {
        id: "8",
        movieId: "10",
        userId: "5",
        userName: "Charlie Brown",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 8,
        comment: "Joaquin Phoenix's performance is haunting. A disturbing but powerful character study.",
        status: "pending",
        createdAt: "2023-02-08T12:00:00Z"
    }
];
const analyticsData = {
    viewsByMonth: [
        {
            month: "Jan",
            views: 4500
        },
        {
            month: "Feb",
            views: 5200
        },
        {
            month: "Mar",
            views: 4800
        },
        {
            month: "Apr",
            views: 5800
        },
        {
            month: "May",
            views: 6000
        },
        {
            month: "Jun",
            views: 6500
        },
        {
            month: "Jul",
            views: 7500
        },
        {
            month: "Aug",
            views: 8000
        },
        {
            month: "Sep",
            views: 8200
        },
        {
            month: "Oct",
            views: 7800
        },
        {
            month: "Nov",
            views: 8500
        },
        {
            month: "Dec",
            views: 9000
        }
    ],
    genreDistribution: [
        {
            genre: "Action",
            count: 28
        },
        {
            genre: "Drama",
            count: 35
        },
        {
            genre: "Comedy",
            count: 20
        },
        {
            genre: "Sci-Fi",
            count: 15
        },
        {
            genre: "Thriller",
            count: 18
        },
        {
            genre: "Horror",
            count: 10
        },
        {
            genre: "Romance",
            count: 12
        }
    ],
    ratingDistribution: [
        {
            rating: "9-10",
            count: 15
        },
        {
            rating: "8-9",
            count: 25
        },
        {
            rating: "7-8",
            count: 30
        },
        {
            rating: "6-7",
            count: 18
        },
        {
            rating: "5-6",
            count: 10
        },
        {
            rating: "Below 5",
            count: 5
        }
    ],
    topMovies: [
        {
            title: "The Shawshank Redemption",
            views: 12500
        },
        {
            title: "The Dark Knight",
            views: 11800
        },
        {
            title: "Inception",
            views: 10500
        },
        {
            title: "Pulp Fiction",
            views: 9800
        },
        {
            title: "The Godfather",
            views: 9200
        }
    ]
};
function getAllGenres() {
    const genreSet = new Set();
    movies.forEach((movie)=>{
        movie.genre.forEach((genre)=>{
            genreSet.add(genre);
        });
    });
    return Array.from(genreSet).sort();
}
function getAllYears() {
    const yearSet = new Set();
    movies.forEach((movie)=>{
        yearSet.add(movie.year);
    });
    return Array.from(yearSet).sort((a, b)=>b - a);
}
function getMovieById(id) {
    return movies.find((movie)=>movie.id === id);
}
function getReviewsForMovie(movieId) {
    return reviews.filter((review)=>review.movieId === movieId && review.status === "approved");
}
}),
"[project]/components/logo.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// A dumb component that renders a logo SVG
// It accepts a className prop to allow customization of its size and style
__turbopack_context__.s([
    "Logo",
    ()=>Logo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
function Logo({ className = "h-8 w-8", fill = "fill-primary" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "28",
        height: "35",
        viewBox: "0 0 28 35",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12.73 20.79V28.02C12.73 28.2972 12.6199 28.563 12.4239 28.7589C12.228 28.9549 11.9622 29.065 11.685 29.065C11.4079 29.065 11.1421 28.9549 10.9461 28.7589C10.7501 28.563 10.64 28.2972 10.64 28.02V20.8C10.931 21.0125 11.2798 21.1311 11.64 21.14C12.0326 21.1512 12.4173 21.0277 12.73 20.79V20.79ZM21.63 18.7C21.3648 18.7 21.1104 18.8054 20.9229 18.9929C20.7354 19.1804 20.63 19.4348 20.63 19.7V20.96C20.63 21.2372 20.7401 21.503 20.9361 21.6989C21.132 21.8949 21.3978 22.005 21.675 22.005C21.9522 22.005 22.218 21.8949 22.4139 21.6989C22.6099 21.503 22.72 21.2372 22.72 20.96V19.75C22.7278 19.6066 22.7046 19.4632 22.652 19.3296C22.5994 19.196 22.5187 19.0752 22.4152 18.9756C22.3118 18.876 22.1881 18.7998 22.0527 18.7522C21.9172 18.7047 21.773 18.6869 21.63 18.7V18.7ZM8.37 23.53C8.01017 23.5192 7.66183 23.4008 7.37 23.19V30.44C7.37 30.7185 7.48062 30.9856 7.67754 31.1825C7.87445 31.3794 8.14152 31.49 8.42 31.49C8.69848 31.49 8.96555 31.3794 9.16246 31.1825C9.35938 30.9856 9.47 30.7185 9.47 30.44V23.24C9.14345 23.4511 8.75816 23.5527 8.37 23.53V23.53ZM18.37 16.53C18.2345 16.5232 18.0991 16.5441 17.9719 16.5913C17.8448 16.6385 17.7286 16.7111 17.6303 16.8046C17.5321 16.8982 17.454 17.0107 17.4006 17.1354C17.3473 17.2601 17.3198 17.3944 17.32 17.53V23.1C17.32 23.3785 17.4306 23.6456 17.6275 23.8425C17.8245 24.0394 18.0915 24.15 18.37 24.15C18.6485 24.15 18.9156 24.0394 19.1125 23.8425C19.3094 23.6456 19.42 23.3785 19.42 23.1V17.6C19.428 17.4557 19.4046 17.3114 19.3514 17.177C19.2982 17.0426 19.2166 16.9213 19.112 16.8215C19.0074 16.7217 18.8825 16.6457 18.7458 16.5989C18.6091 16.552 18.4638 16.5353 18.32 16.55L18.37 16.53ZM15.05 18.67C14.6733 18.6674 14.3067 18.5487 14 18.33V25.6C14 25.8785 14.1106 26.1456 14.3075 26.3425C14.5045 26.5394 14.7715 26.65 15.05 26.65C15.3285 26.65 15.5955 26.5394 15.7925 26.3425C15.9894 26.1456 16.1 25.8785 16.1 25.6V18.34C15.7828 18.5763 15.3955 18.6995 15 18.69L15.05 18.67ZM6.1 24.24V3.93C6.09737 3.68243 5.99717 3.44591 5.82117 3.27178C5.64517 3.09765 5.40758 2.99999 5.16 3H4.94C4.69242 2.99999 4.45483 3.09765 4.27883 3.27178C4.10283 3.44591 4.00263 3.68243 4 3.93V24.24C4 24.4893 4.09904 24.7284 4.27532 24.9047C4.4516 25.081 4.6907 25.18 4.94 25.18H5.16C5.40931 25.18 5.6484 25.081 5.82468 24.9047C6.00097 24.7284 6.1 24.4893 6.1 24.24V24.24ZM8.48 22.76H8.26C8.0107 22.76 7.7716 22.661 7.59532 22.4847C7.41904 22.3084 7.32 22.0693 7.32 21.82V6.35C7.32264 6.10244 7.42283 5.8659 7.59883 5.69178C7.77483 5.51765 8.01242 5.41999 8.26 5.42H8.48C8.72758 5.41999 8.96517 5.51765 9.14117 5.69178C9.31717 5.8659 9.41737 6.10244 9.42 6.35V21.84C9.42 22.0893 9.32096 22.3284 9.14468 22.5047C8.9684 22.681 8.7293 22.78 8.48 22.78V22.76ZM11.79 20.38H11.56C11.3134 20.38 11.0768 20.282 10.9024 20.1076C10.728 19.9332 10.63 19.6967 10.63 19.45V8.75C10.6287 8.62703 10.6518 8.50502 10.6979 8.39103C10.744 8.27704 10.8123 8.17334 10.8988 8.08592C10.9853 7.9985 11.0883 7.9291 11.2018 7.88174C11.3153 7.83438 11.437 7.80999 11.56 7.81H11.79C12.0376 7.81264 12.2741 7.91283 12.4482 8.08883C12.6224 8.26483 12.72 8.50242 12.72 8.75V19.45C12.72 19.6967 12.622 19.9332 12.4476 20.1076C12.2732 20.282 12.0367 20.38 11.79 20.38V20.38ZM15.1 17.93H14.89C14.6424 17.93 14.4048 17.8324 14.2288 17.6582C14.0528 17.4841 13.9526 17.2476 13.95 17V11.24C13.9418 11.1116 13.96 10.9829 14.0036 10.8618C14.0471 10.7408 14.1151 10.6299 14.2032 10.5362C14.2913 10.4424 14.3977 10.3678 14.5159 10.3168C14.634 10.2659 14.7613 10.2397 14.89 10.24H15.11C15.3593 10.24 15.5984 10.339 15.7747 10.5153C15.951 10.6916 16.05 10.9307 16.05 11.18V16.98C16.0513 17.1043 16.028 17.2276 15.9813 17.3428C15.9347 17.458 15.8657 17.5628 15.7782 17.6512C15.6908 17.7395 15.5868 17.8096 15.472 17.8575C15.3573 17.9054 15.2343 17.93 15.11 17.93H15.1ZM18.42 15.78H18.2C17.9507 15.78 17.7116 15.681 17.5353 15.5047C17.359 15.3284 17.26 15.0893 17.26 14.84V13.35C17.2626 13.1024 17.3628 12.8659 17.5388 12.6918C17.7148 12.5176 17.9524 12.42 18.2 12.42H18.42C18.6676 12.42 18.9052 12.5176 19.0812 12.6918C19.2572 12.8659 19.3574 13.1024 19.36 13.35V14.84C19.36 15.0876 19.2624 15.3252 19.0882 15.5012C18.9141 15.6772 18.6776 15.7774 18.43 15.78H18.42Z",
            className: fill
        }, void 0, false, {
            fileName: "[project]/components/logo.jsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/logo.jsx",
        lineNumber: 5,
        columnNumber: 6
    }, this);
}
}),
"[project]/app/genres/page.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GenresPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.jsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$logo$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/logo.jsx [app-rsc] (ecmascript)");
;
;
;
;
;
function GenresPage() {
    const genres = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllGenres"])();
    // Count movies per genre
    const genreCounts = genres.map((genre)=>({
            name: genre,
            count: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["movies"].filter((movie)=>movie.genre.includes(genre)).length,
            movies: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["movies"].filter((movie)=>movie.genre.includes(genre)).slice(0, 4)
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container flex h-14 max-w-(--breakpoint-2xl) items-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mr-4 hidden md:flex",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            className: "mr-6 flex items-center space-x-2",
                            href: "/",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$logo$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Logo"], {}, void 0, false, {
                                    fileName: "[project]/app/genres/page.jsx",
                                    lineNumber: 28,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden font-bold sm:inline-block",
                                    children: "CineScope"
                                }, void 0, false, {
                                    fileName: "[project]/app/genres/page.jsx",
                                    lineNumber: 29,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/genres/page.jsx",
                            lineNumber: 27,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/genres/page.jsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/genres/page.jsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/genres/page.jsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "inline-block text-4xl font-extrabold tracking-tight lg:text-5xl",
                                    children: "Genres"
                                }, void 0, false, {
                                    fileName: "[project]/app/genres/page.jsx",
                                    lineNumber: 40,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl text-primary/90",
                                    children: "Explore movies by genre"
                                }, void 0, false, {
                                    fileName: "[project]/app/genres/page.jsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/genres/page.jsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/genres/page.jsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3",
                        children: genreCounts.map((genre)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                                className: "flex flex-col hover:shadow-md hover:shadow-primary/20 transition-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        className: "border-b border-primary/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                className: "text-primary",
                                                children: genre.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/genres/page.jsx",
                                                lineNumber: 53,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                children: [
                                                    genre.count,
                                                    " movies"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/genres/page.jsx",
                                                lineNumber: 54,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/genres/page.jsx",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "flex-1 pt-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-2",
                                            children: genre.movies.map((movie)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/movies/${movie.id}`,
                                                    className: "overflow-hidden rounded-md",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: movie.poster || "/placeholder.svg",
                                                        alt: movie.title,
                                                        className: "aspect-2/3 h-auto w-full object-cover transition-all hover:scale-105",
                                                        width: 200,
                                                        height: 300
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/genres/page.jsx",
                                                        lineNumber: 63,
                                                        columnNumber: 23
                                                    }, this)
                                                }, movie.id, false, {
                                                    fileName: "[project]/app/genres/page.jsx",
                                                    lineNumber: 59,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/genres/page.jsx",
                                            lineNumber: 57,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/genres/page.jsx",
                                        lineNumber: 56,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, genre.name, true, {
                                fileName: "[project]/app/genres/page.jsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/genres/page.jsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/genres/page.jsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/genres/page.jsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/genres/page.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/genres/page.jsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__52d0db8a._.js.map