const db = require("../../knex/knex");

module.exports = {
  //export grantsModels...
  findGrants,
  findGrantsById,
  findGrantsByUser,
  findGrantsBy,
  findSingleGrantBy,
  findGrantsByStatus,
  addGrant,
  updateGrant,
  deleteGrant,
};

//returns all grants details
function findGrants(status) {
  return db("grants");
}

//returns a specific grant profile or null
function findGrantsById(id) {
  return db("grants").where({ id }).first();
}
//returns a specific grant profile or null
function findGrantsByUser(applicant_profile_id) {
  return db("grants").where({ applicant_profile_id });
}
//returns ALL grants by filter
function findGrantsBy(filter) {
  return db("grants").where(filter);
}
function findGrantsByStatus(status) {
  return db("grants").where({ status });
}
//returns a SINGLE grant by filter
function findSingleGrantBy(filter) {
  return db("grants").where(filter).first();
}

//adds new grant.
async function addGrant(grant) {
  const [grantId] = await db("grants").insert(grant, "id");

  return findGrantsById(grantId);
}

//updates data on a grant
function updateGrant(changes, id) {
  return db("grants").where({ id }).first().update(changes);
}

//function to delete a grant
function deleteGrant(id) {
  return db("grants").where({ id }).del();
}
