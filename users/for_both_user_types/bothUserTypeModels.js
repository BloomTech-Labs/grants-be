const db = require("../../knex/knex");

module.exports = {
    add,
    findById,
    findByUserType,
    findBy,
};

//function to add a new user
async function add(user) {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
}

//function to find the user by id

function findById(id) {
    return db("users").where({ id }).first();
}

// function to get all users by type
function findByUserType(type) {
    return db("users").where({ user_type: type });
}

//retur user profile by filter
function findBy(filter) {
    return db("users").where(filter);
}
