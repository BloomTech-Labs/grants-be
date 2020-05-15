const db = require("../../knex/knex");

module.exports = {
    findWritersProfile,
    findWriterProfilBy,
    findWriterProfileById,
    addWriterProfile,
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
    return db('writer_profiles');
}

//returns a specific writer  profile or null
function findWriterProfileById(id) {
    return db("writer_profiles").where({ id }).first();
}
//returns  a  writer profile by filter
function findWriterProfilBy(filter) {
    return db("writer_profiles").where(filter).first();
}

//adds new writer profile. This is only to be used during the onboarding process, function is inserted into add function in bothUserTypeModel file.
async function addWriterProfile(id) {

  const defaultData = {
    writer_id: id,
    city: "",
    state: "",
    country: "",
    zip: "",
    bio: "",
    sector: "",
    website_url: ""
  }

  const [profileId] = await db('writer_profiles').insert(defaultData, "id");
  console.log(`base user profile created for user ID: ${defaultData.writer_id}`);
  return findWriterProfileById(profileId);
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