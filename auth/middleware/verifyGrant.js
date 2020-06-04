const Grants = require("../../users/grants/grantsModel.js");

function verifyGrant(req, res, next) {
  const grant = req.params;
  let defaultGrant = {
    applicant_profile_id: "",
    contact_name: "",
    description: "",
    due_date: "",
    grant_name: "",
    id: "",
    org_name: "",
    sector: "",
    site_id: "",
    status: "",
  };

  return {
    ...defaultGrant,
    grant_id: grant.grant_id,
    contact_name: grant.contact_name,
    description: grant.description,
    due_date: grant.due_date,
    grant_name: grant.grant_name,
    org_name: grant.org_name,
    sector: grant.sector,
    //other fields that are needed base on the tables...
    /*
    site_id: grant.site_id,
    status: grant.status,
    applicant_profile_id: grant.applicant_profile_id
    */
  };
}

module.exports = verifyGrant;
