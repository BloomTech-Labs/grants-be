const Applicants = require("../../users/applicant_profiles/applicantProfileModel.js");

function checkApplicantId(req, res, next) {
  const { profileId } = req.params;

  Applicants.findApplicantProfileById(profileId)
    .then(profile => {

      if(profile) {
        req.profile = profile;
        next();
      }else {
        res.status(404).json({
          message: "The applicant profile with this ID does not exist."
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to retrieve applicant profile",
        error: err
      });
    });
};

module.exports = checkApplicantId;