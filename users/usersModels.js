const db = require("../knex/knex");

module.exports = {
    add,
    find,
    findBy,
    findById,
    getItemsByUserId,
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

function findById(id) {
    return db("users").where({ id }).first();
}

function deleteUser(id) {
    return db("users").where({ id }).del();
}
