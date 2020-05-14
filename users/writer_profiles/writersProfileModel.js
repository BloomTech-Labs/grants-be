const db = require("../../knex/knex");

module.exports = {
    findWritersProfile,
    findWriterProfilBy,
    findWriterProfileById,
    updateWriterProfile,
    deleteWriteProfile,
    addWriterService,
    updateWriterService,
    deleteWriterService,
    findWriterServicesById,
    findWriterServices
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
//returns  a  writer profile by filter
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


// *** WRITER SERVICES OFFERED HELPER FUNCTIONS ***

//returns list of all writer services currently in the database
function findWriterServices() {
  return db('writer_services_offered');
}

//returns writer services for specific writer profile
function findWriterServicesById(writer_profile_id) {
  return db('writer_services_offered')
    .where({ writer_profile_id });
}

//add new service to writer profile, returns updated list of writer services.
async function addWriterService(service) {
  const [writer_profile_id] = await db('writer_services_offered').insert(service, "writer_profile_id");
  return findWriterServicesById(writer_profile_id);
}

//updates existing writer service on writer profile
function updateWriterService(changes, writer_profile_id) {
  return db('writer_services_offered')
    .where({ writer_profile_id })
    .first()
    .update(changes);
}

//deletes existing writer service on writer profile
function deleteWriterService(service_id) {
  return db('writer_services_offered')
    .where('id', service_id)
    .del();
}