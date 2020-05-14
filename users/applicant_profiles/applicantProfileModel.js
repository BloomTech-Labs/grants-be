const db = require('../../knex/knex.js');

//returns all applicant user type profiles
function findApplicantProfiles() {
  return db('applicant_profiles');
}

//returns specific applicant profile
function findApplicantProfileById(id) {
  return db('applicant_profiles')
    .where({ id })
    .first();
}

//returns applicant profile by dynamic filter
function findApplicantProfileBy(filter) {
  return db('applicant_profiles')
    .where(filter)
    .first();
}

//adds new applicant profile
function addApplicantProfile() {

  const defaultData = {
    applicant_id: user.id,
    first_name: " ",
    last_name: " ",
    city: " ",
    state: " ",
    country: " ",
    zip: " ",
    bio: "introduce yourself",
    org_name: " ",
    sector: "sector",
    website_url: " "
  }

  db('applicant_profiles').insert(defaultData);

  return("base user profile created")
}

//updates data on applicant user profile
function updateApplicantProfile(changes, id) {
  return db('applicant_profiles')
    .where({ id })
    .first()
    .update(changes);
}

module.exports = {
  findApplicantProfiles,
  findApplicantProfileById,
  findApplicantProfileBy,
  addApplicantProfile,
  updateApplicantProfile
}
