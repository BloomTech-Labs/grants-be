const db = require("../knex/knex");

module.exports = {
    add,
    find,
    findBy,
    findById,
    findByUserType,
    findByEmail,
    getItemsByUserId,
    update,
    deleteUser,
};

function getItemsByUserId(id) {
    return db("items").where({ "items.user_id": id });
}

function find() {
    const query = db("users").select(
        "id",
        "username",
        "department",
        "location"
    );
    return query;
}

function findBy(filter) {
    return db("users").where(filter);
}

async function add(user) {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
}

// resolves to a single user or null
function findById(id) {
    return db("users").where({ id }).first();
}
// function to get all users by type
function findByUserType(type) {
    return DB("users").where({ user_type: type });
}

//function to find User by email and return id
function findByEmail(userEmail) {
    return DB("users").where({ email: userEmail }).select("id", "user_type");
}
function deleteUser(id) {
    return db("users").where({ id }).del();
}
