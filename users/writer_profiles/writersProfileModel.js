const db = require("../../knex/knex");

module.exports = {
    findWritersProfile,
    findWriterProfilBy,
    findWriterProfileById,
    updateWriterProfile,
    deleteWriteProfile,
};

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

//returns a specific writer  profile or null
function findWriterProfileById(id) {
    return db("writer_profiles").where({ id }).first();
}
//returns writer a  profile by filter
function findWriterProfilBy(filter) {
    return db("writer_profiles").where(filter).first();
}

//updates data on a writer user profile
function updateWriterProfile(changes, id) {
    return db("writer_profiles").where({ id }).first().update(changes);
}

//function to delete a writer user profile
function deleteWriteProfile(id) {
    return db("writer_profiles").where({ id }).del();
}
