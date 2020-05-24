const db = require("../../knex/knex");

module.exports = {
  //export grantsModels...
  findGrants,
  findGrantsById,
  findGrantsByUser,
  findGrantsBy,
  findSingleGrantBy,
  addGrant,
  updateGrant,
  deleteGrant,
};

//returns all grants details
function findGrants(status) {
  return db("grants");
  // if we want to search grants by it's status...
  // return db('grants').where({status});
}

//returns a specific grant profile or null
function findGrantsById(grant_Id) {
  return db("grants").where({ grant_id }).first();
}
//returns a specific grant profile or null
function findGrantsByUser(user_Id) {
  return db("grants").where({ user_id }).first();
}
//returns ALL grants by filter
function findGrantsBy(filter) {
  return db("grants").where(filter);
}
//returns a SINGLE grant by filter
function findSingleGrantBy(filter) {
  return db("grants").where(filter).first();
}

//adds new grant.
async function addGrant(id) {
  const defaultData = {
    grant_id: id,
    //other fields that are needed base on the tables...
  };

  const [grantId] = await db("grants").insert(defaultData, "id");

  return findGrantsById(grantId);
}

//updates data on a grant
function updateGrant(changes, grant_id) {
  return db("grants").where({ grant_id }).first().update(changes);
}

//function to delete a grant
function deleteGrant(grant_id) {
  return db("grants").where({ grant_id }).del();
}
