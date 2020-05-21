const db = require('../../knex/knex.js');

//returns all applicant user type profiles
function findApplicantProfiles() {
  return db('applicant_profiles');
}

//returns specific applicant profile
function findApplicantProfileById(applicant_id) {
  return db('applicant_profiles')
    .where({ applicant_id })
    .first();
}

//returns applicant profile by dynamic filter
function findApplicantProfileBy(filter) {
  return db('applicant_profiles')
    .where(filter)
    .first();
}

//adds new applicant profile. This is only to be used during the onboarding process, function is inserted into add function in bothUserTypeModel file.
async function addApplicantProfile(id) {

  const defaultData = {
    applicant_id: id,
    first_name: "",
    last_name: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    bio: "",
    org_name: "",
    sector: "",
    website: ""
  }

  const [profileId] = await db('applicant_profiles').insert(defaultData, "id");
  
  return findApplicantProfileById(profileId);
}

//updates data on applicant user profile
function updateApplicantProfile(changes, applicant_id) {
  return db('applicant_profiles')
    .where({ applicant_id })
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
