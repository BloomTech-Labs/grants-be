const db = require("../../knex/knex");

module.exports = {
    add,
    findById,
    findByUserType,
    findByEmail,
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
    return DB("users").where({ user_type: type });
}

//function to find User by email and return id
function findByEmail(userEmail) {
    return DB("users").where({ email: userEmail }).select("id", "user_type");
}
