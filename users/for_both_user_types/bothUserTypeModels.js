const db = require("../../knex/knex");
const Applicants = require("../applicant_profiles/applicantProfileModel");
const Writers = require("../writer_profiles/writersProfileModel");

module.exports = {
    add,
    findById,
    findByUserType,
    findBy,
};

//function to add a new user
async function add(user) {
    const [id] = await db("users").insert(user, "id");
    if(user.user_type == "applicant") {
      Applicants.addApplicantProfile(id);
    }else if(user.user_type == "writer") {
      Writers.addWriterProfile(id);
    }

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
