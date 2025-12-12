module.exports = {

"[project]/.next-internal/server/app/genres/page/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
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
"[project]/lib/utils.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "capitalizeFirstLetter": (()=>capitalizeFirstLetter),
    "cn": (()=>cn),
    "getAllGenres": (()=>getAllGenres),
    "getAllMovieStatus": (()=>getAllMovieStatus),
    "getAllYears": (()=>getAllYears)
});
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
}}),
"[project]/components/ui/card.jsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Card": (()=>Card),
    "CardAction": (()=>CardAction),
    "CardContent": (()=>CardContent),
    "CardDescription": (()=>CardDescription),
    "CardFooter": (()=>CardFooter),
    "CardHeader": (()=>CardHeader),
    "CardTitle": (()=>CardTitle)
});
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
}}),
"[project]/lib/data.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// JSON Object Array of movie objects
// Exported as MOVIES array
// Dummy Movies Data
// JSON Object Array of movie objects
// Exported as MOVIES array
__turbopack_context__.s({
    "MOVIES": (()=>MOVIES),
    "analyticsData": (()=>analyticsData),
    "getAllGenres": (()=>getAllGenres),
    "getAllYears": (()=>getAllYears),
    "getMovieById": (()=>getMovieById),
    "getReviewsForMovie": (()=>getReviewsForMovie),
    "movies": (()=>movies),
    "reviews": (()=>reviews),
    "users": (()=>users)
});
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
}}),
"[project]/app/genres/page.jsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>GenresPage)
});
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
                                    lineNumber: 22,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden font-bold sm:inline-block",
                                    children: "CineScope"
                                }, void 0, false, {
                                    fileName: "[project]/app/genres/page.jsx",
                                    lineNumber: 23,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/genres/page.jsx",
                            lineNumber: 21,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/genres/page.jsx",
                        lineNumber: 20,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/genres/page.jsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/genres/page.jsx",
                lineNumber: 18,
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
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl text-primary/90",
                                    children: "Explore movies by genre"
                                }, void 0, false, {
                                    fileName: "[project]/app/genres/page.jsx",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/genres/page.jsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/genres/page.jsx",
                        lineNumber: 30,
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
                                                lineNumber: 41,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                children: [
                                                    genre.count,
                                                    " movies"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/genres/page.jsx",
                                                lineNumber: 42,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/genres/page.jsx",
                                        lineNumber: 40,
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
                                                        lineNumber: 48,
                                                        columnNumber: 23
                                                    }, this)
                                                }, movie.id, false, {
                                                    fileName: "[project]/app/genres/page.jsx",
                                                    lineNumber: 47,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/genres/page.jsx",
                                            lineNumber: 45,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/genres/page.jsx",
                                        lineNumber: 44,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, genre.name, true, {
                                fileName: "[project]/app/genres/page.jsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/genres/page.jsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/genres/page.jsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/genres/page.jsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}}),
"[project]/app/genres/page.jsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/app/genres/page.jsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=_51c3e091._.js.map