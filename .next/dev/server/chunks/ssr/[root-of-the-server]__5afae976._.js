module.exports = [
"[externals]/mongodb [external] (mongodb, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}),
"[project]/db/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
const options = {};
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["MongoClient"](MONGODB_URI, options);
const db = client.db("sample_mflix"); // Access the database instance
}),
"[project]/actions/users.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"7f06a4395c8f1c519d99c667db349193d390bf3e67":"getUserById","7f64590b52a73555b9b45538353cee2ec48028dbce":"deleteUser","7f6c9a853156019eef87140bd4a2c8be7bd612b47b":"searchUsers","7f6ddf00f8d78b5b6fcbfa67f39a15ecc59e615754":"getUser","7f75d1065cc9669a91148579790d9bcab02aa0a170":"updateUser","7fc3bd5bfa202168e0ec244ebccbefd466a2d463c0":"updateUserRole","7fcf919bc8c905a89edf4374a504fc90d722aa8213":"createUser"},"",""] */ __turbopack_context__.s([
    "createUser",
    ()=>createUser,
    "deleteUser",
    ()=>deleteUser,
    "getUser",
    ()=>getUser,
    "getUserById",
    ()=>getUserById,
    "searchUsers",
    ()=>searchUsers,
    "updateUser",
    ()=>updateUser,
    "updateUserRole",
    ()=>updateUserRole
]);
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
const getUserById = async (userId)=>{
    try {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$db$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].collection("user").findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](userId)
        });
        if (user) {
            return {
                success: true,
                message: "User fetched successfully",
                data: user
            };
        } else {
            return {
                success: false,
                message: "User not found",
                data: null
            };
        }
    } catch (error) {
        console.log("Error fetching user by ID:", error);
        return {
            success: false,
            message: "Error fetching user",
            data: null
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
    getUserById,
    searchUsers,
    createUser,
    updateUser,
    deleteUser,
    updateUserRole
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUser, "7f6ddf00f8d78b5b6fcbfa67f39a15ecc59e615754", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserById, "7f06a4395c8f1c519d99c667db349193d390bf3e67", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(searchUsers, "7f6c9a853156019eef87140bd4a2c8be7bd612b47b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createUser, "7fcf919bc8c905a89edf4374a504fc90d722aa8213", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateUser, "7f75d1065cc9669a91148579790d9bcab02aa0a170", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteUser, "7f64590b52a73555b9b45538353cee2ec48028dbce", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateUserRole, "7fc3bd5bfa202168e0ec244ebccbefd466a2d463c0", null);
}),
"[project]/.next-internal/server/app/admin/profile/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/users.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/users.js [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/admin/profile/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/users.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "7f06a4395c8f1c519d99c667db349193d390bf3e67",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserById"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$profile$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/profile/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/users.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/users.js [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5afae976._.js.map