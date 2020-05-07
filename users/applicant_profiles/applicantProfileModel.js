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
  updateApplicantProfile
}
