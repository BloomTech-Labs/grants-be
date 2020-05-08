const db = require("../../knex/knex");

module.exports = {
    add,
    findWritersProfile,
    findWriterProfilBy,
    findWriterProfileById,
    findByUserType,
    findByEmail,
    getItemsByUserId,
    updateWriterProfile,
    deleteWriteProfile,
};

function getItemsByUserId(id) {
    return db("items").where({ "items.user_id": id });
}

//returns all writers user type profiles
function findWritersProfile() {
    const query = db("writer_profiles").select(
        "id",
        "first_name",
        "last_name",
        "email",
        "user_type"
    );
    return query;
}

//returns specific writer  profile or null
function findWriterProfileById(id) {
    return db("writer_profiles").where({ id }).first();
}
//returns writer  profile by filter
function findWriterProfilBy(filter) {
    return db("writer_profiles").where(filter).first();
}

async function add(user) {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
}

// function to get all users by type
function findByUserType(type) {
    return DB("users").where({ user_type: type });
}

//function to find User by email and return id
function findByEmail(userEmail) {
    return DB("users").where({ email: userEmail }).select("id", "user_type");
}
function deleteWriteProfile(id) {
    return db("writer_profiles").where({ id }).del();
}
