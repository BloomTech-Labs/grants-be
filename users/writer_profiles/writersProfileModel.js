const db = require("../../knex/knex");

module.exports = {
    findWritersProfile,
    findWriterProfileBy,
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
    addWorkHistory,
    findWorkHistoryById,
    updateWorkHistory,
    deleteWorkHistory,
    addWriterSavedGrant,
    getWriterSavedGrant,
    deleteWriterSavedGrant,
};

//returns all writers user type profiles
function findWritersProfile() {
    return db("writer_profiles");
}

// returns a specific writer  profile or null
async function findWriterProfileById(writer_id) {
    const writer = await db("writer_profiles")
        .where({
            writer_id,
        })
        .first();
    if (writer === undefined) return undefined;
    const workHistory = await findWorkHistoryById(writer_id);
    return {
        ...writer,
        workHistory,
    };
}

//returns  a  writer profile by filter
function findWriterProfileBy(filter) {
    return db("writer_profiles").where(filter).first();
}

//adds new writer profile. This is only to be used during the onboarding process,
// function is inserted into add function in bothUserTypeModel file.
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

    return findWriterProfileById(id);
}

//updates data on a writer user profile
function updateWriterProfile(changes, writer_id) {
    return db("writer_profiles")
        .where({
            writer_id,
        })
        .first()
        .update(changes);
}

//function to delete a writer user profile
function deleteWriteProfile(writer_id) {
    return db("writer_profiles")
        .where({
            writer_id,
        })
        .del();
}

// *** WRITER SERVICES OFFERED HELPER FUNCTIONS ***

//returns list of all writer services currently in the database
function findWriterServices() {
    return db("writer_services_offered");
}

//returns writer services for specific writer profile
function findWriterServicesById(writer_profile_id) {
    return db("writer_services_offered").where({
        writer_profile_id,
    });
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
        .where({
            writer_profile_id,
        })
        .first()
        .update(changes);
}

//deletes existing writer service on writer profile
function deleteWriterService(service_id) {
    return db("writer_services_offered").where("id", service_id).del();
}

// *** WRITER EDUCATION HELPER FUNCTIONS ***

//add new education data
async function addWriterEducation(eduData) {
    const [writer_id] = await db("writer_educations").insert(
        eduData,
        "writer_id"
    );
    return findWriterEducationById(writer_id);
}

//get writer education data by user id
function findWriterEducationById(writer_id) {
    return db("writer_educations").where(writer_id);
}

//get all writer education data
function findWriterEducations() {
    return db("writer_educations");
}

//update existing writer education data based on education data primary key id (not user id)
function updateWriterEducation(changes, id) {
    return db("writer_educations")
        .where({
            id,
        })
        .first()
        .update(changes);
}

//deletes existing writer educate based on education data primary key id (not user id)
function deleteWriterEducation(id) {
    return db("writer_educations").where("id", id).del();
}

// *** WRITER WORK HISTORY HELPER FUNCTIONS ***

//add new work history record to user profile
async function addWorkHistory(workHistory) {
    await db("work_histories").insert(workHistory);

    return findWorkHistoryById(workHistory.writer_id);
}

//get all work history records for specific writer requires user id in params
function findWorkHistoryById(writer_id) {
    return db("work_histories").where("writer_id", writer_id);
}

//update existing work history record, requires work history record id in params
async function updateWorkHistory(changes, id) {
    await db("work_histories").where("id", id).update(changes);
    return findWorkHistoryById(changes.writer_id);
}

//deletes existing work history record, requires work history record id in params
async function deleteWorkHistory(workHistId, userId) {
    await db("work_histories").where("id", workHistId).del();
    return findWorkHistoryById(userId);
}

//add a grant to writers saved list
async function addWriterSavedGrant(writer_id, grant_id) {
    await db("writer_saved_grants").insert(writer_id, grant_id);
    return {
        message: `Success, grant id ${grant_id} was favorited by user id ${writer_id}.`,
    };
}

function getWriterSavedGrant(writer_id) {

  return db("writer_saved_grants")
    .join("grants", "grants.id", "writer_saved_grants.grant_id")
    .select(
      "writer_saved_grants.writer_id",
      "writer_saved_grants.grant_id",
      "grants.awarding_agency",
      "grants.grant_name",
      "grants.due_date",
      "grants.sector",
      "grants.description"
    )
    .where("writer_saved_grants.writer_id", writer_id);

}

function deleteWriterSavedGrant(writer_id, grant_id) {
    return db("writer_saved_grants")
        .where({
            writer_id,
            grant_id,
        })
        .del();
}
