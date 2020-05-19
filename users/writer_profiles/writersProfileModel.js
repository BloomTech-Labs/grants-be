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
    findWriterServices,
    addWriterEducation,
    findWriterEducations,
    findWriterEducationById,
    updateWriterEducation,
    deleteWriterEducation,
};

//returns all writers user type profiles
function findWritersProfile() {
    return db('writer_profiles');
}

//returns a specific writer  profile or null
function findWriterProfileById(writer_id) {
    return db("writer_profiles").where({ writer_id }).first();
}
//returns  a  writer profile by filter
function findWriterProfilBy(filter) {
    return db("writer_profiles").where(filter).first();
}

//adds new writer profile. This is only to be used during the onboarding process, function is inserted into add function in bothUserTypeModel file.
async function addWriterProfile(id) {
    const defaultData = {
        writer_id: id,
        first_name: "",
        last_name: "",
        city: "",
        state: "",
        country: "",
        zip: "",
        bio: "",
        sector: "",
        website: "",
    };

    const [profileId] = await db("writer_profiles").insert(defaultData, "id");
    console.log(
        `base user profile created for user ID: ${defaultData.writer_id}`
    );
    return findWriterProfileById(profileId);
}

//updates data on a writer user profile
function updateWriterProfile(changes, writer_id) {
    return db("writer_profiles").where({ writer_id }).first().update(changes);
}

//function to delete a writer user profile
function deleteWriteProfile(writer_id) {
    return db("writer_profiles").where({ writer_id }).del();
}

// *** WRITER SERVICES OFFERED HELPER FUNCTIONS ***

//returns list of all writer services currently in the database
function findWriterServices() {
    return db("writer_services_offered");
}

//returns writer services for specific writer profile
function findWriterServicesById(writer_profile_id) {
    return db("writer_services_offered").where({ writer_profile_id });
}

//add new service to writer profile, returns updated list of writer services.
async function addWriterService(service) {
    const [writer_profile_id] = await db("writer_services_offered").insert(
        service,
        "writer_profile_id"
    );
    return findWriterServicesById(writer_profile_id);
}

//updates existing writer service on writer profile
function updateWriterService(changes, writer_profile_id) {
    return db("writer_services_offered")
        .where({ writer_profile_id })
        .first()
        .update(changes);
}

//deletes existing writer service on writer profile
function deleteWriterService(service_id) {
    return db("writer_services_offered").where("id", service_id)
    .del();
}

// *** WRITER EDUCATION HELPER FUNCTIONS *** 

//add new education data
async function addWriterEducation(eduData) {
  const [writer_id] = await db("writer_educations").insert(eduData, "writer_id");
  return findWriterEducationById(writer_id);
}

//get writer education data by user id
function findWriterEducationById(writer_id) {
  return db("writer_educations")
    .where(writer_id);
}

//get all writer education data
function findWriterEducations() {
  return db("writer_educations");
}

//update existing writer education data based on education data primary key id (not user id)
function updateWriterEducation(changes, id) {
  return db("writer_educations")
    .where({ id })
    .first()
    .update(changes);
}

//deletes existing writer educate based on education data primary key id (not user id)
function deleteWriterEducation(id) {
  return db("writer_educations")
    .where("id", id)
    .del();
}

// *** WRITER WORK HISTORY HELPER FUNCTIONS ***

//add new work history record to user profile
async function addWorkHistory(workHistory) {
  const [writer_id] = await db("work_histories")
    .insert(
      workHistory, 
      "writer_id"
    );
    return findWorkHistoryById(writer_id);
}

//get all work history records for specific writer requires user id in params
function findWorkHistoryById(writer_id) {
  return db("work_histories")
    .where(writer_id);
}

//update existing work history record, requires work history record id in params
function updateWorkHistory(changes, id) {
  return db("work_histories")
    .where({ id })
    .first()
    .update(changes);
}

//deletes existing work history record, requires work history record id in params
function deleteWorkHistory(id) {
  return db("work_histories")
    .where("id", id)
    .del();
}