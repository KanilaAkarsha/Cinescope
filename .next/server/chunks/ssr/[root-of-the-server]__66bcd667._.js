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
"[project]/actions/users.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"7f067ec1a01a06c9b5a1feaba629d419fb9a254ab3":"updateUser","7f5141d5b00dbf4308d7d5cec3556eba0472e0144b":"getUser","7f520ed0c5bf37f9108b8114e11e379cd53118c677":"deleteUser","7f8e317e95f3ebc7998f98d902415bc2453a136312":"updateUserRole","7f91e130a2ffa45b3b776a1a3772341ddf1e8cfbb5":"searchUsers","7fe828fdcd60a8771d634c7d1da7fe66d31bf2c766":"createUser"},"",""] */ __turbopack_context__.s({
    "createUser": (()=>createUser),
    "deleteUser": (()=>deleteUser),
    "getUser": (()=>getUser),
    "searchUsers": (()=>searchUsers),
    "updateUser": (()=>updateUser),
    "updateUserRole": (()=>updateUserRole)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$db$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/db/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
const getUser = async (query)=>{
    try {
        const users = await __TURBOPACK__imported__module__$5b$project$5d2f$db$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].collection("user").find({
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
const searchUsers = async (query)=>{
    try {
        const users = await __TURBOPACK__imported__module__$5b$project$5d2f$db$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].collection("user").find({
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
const createUser = async (user)=>{
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$db$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].collection("user").insertOne(user);
        if (result.acknowledged) {
            console.log(`A user was inserted with the _id: ${result.insertedId}`);
            return {
                success: true,
                message: "User Created Successfully"
            };
        } else {
            return undefined;
        }
    } catch (error) {
        console.log("Error creating user:", error);
        return undefined;
    }
};
const updateUser = async (userDoc, userId)=>{
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$db$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].collection("user").updateOne({
            _id: userId
        }, {
            $set: userDoc
        }, {
            upsert: true
        } // Update the user with the new data
        );
    } catch (error) {
        console.log("Error updating user:", error);
        return undefined;
    }
};
const deleteUser = async (userId)=>{
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$db$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].collection("user").deleteOne({
            _id: userId
        });
        if (result.acknowledged) {
            console.log(`A user was deleted with the _id: ${result.insertedId}`);
            return {
                success: true,
                message: "User Deleted Successfully"
            };
        } else {
            return undefined;
        }
    } catch (error) {
        console.log("Error deleting user:", error);
        return undefined;
    }
};
const updateUserRole = async (userId, newRole)=>{
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$db$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].collection("user").updateOne({
            _id: userId
        }, {
            $set: {
                role: newRole
            }
        });
        if (result.acknowledged) {
            console.log(`A user was updated with the _id: ${result.upsertedId}`);
            return {
                success: true,
                message: "User Updated Successfully"
            };
        } else {
            return undefined;
        }
    } catch (error) {
        console.log("Error updating user:", error);
        return undefined;
    }
};
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getUser,
    searchUsers,
    createUser,
    updateUser,
    deleteUser,
    updateUserRole
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUser, "7f5141d5b00dbf4308d7d5cec3556eba0472e0144b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(searchUsers, "7f91e130a2ffa45b3b776a1a3772341ddf1e8cfbb5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createUser, "7fe828fdcd60a8771d634c7d1da7fe66d31bf2c766", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateUser, "7f067ec1a01a06c9b5a1feaba629d419fb9a254ab3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteUser, "7f520ed0c5bf37f9108b8114e11e379cd53118c677", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateUserRole, "7f8e317e95f3ebc7998f98d902415bc2453a136312", null);
}}),
"[project]/.next-internal/server/app/admin/users/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/users.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/users.js [app-rsc] (ecmascript)");
;
}}),
"[project]/.next-internal/server/app/admin/users/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/users.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/users.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$users$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/users/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/users.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/admin/users/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/users.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "7f91e130a2ffa45b3b776a1a3772341ddf1e8cfbb5": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchUsers"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/users.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$users$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/users/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/users.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/admin/users/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/users.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "7f91e130a2ffa45b3b776a1a3772341ddf1e8cfbb5": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$users$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["7f91e130a2ffa45b3b776a1a3772341ddf1e8cfbb5"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$users$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/users/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/users.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <module evaluation>');
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$users$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/users/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/users.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <exports>');
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

//# sourceMappingURL=%5Broot-of-the-server%5D__66bcd667._.js.map