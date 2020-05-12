const Applicants = require("../../users/applicant_profiles/applicantProfileModel.js");

module.exports = function checkApplicantId(req, res, next) {
    const id = req.params.id;

    Applicants.findApplicantProfileById(id)
        .then((applicant) => {
            if (applicant) {
                req.item = applicant;
                next();
            } else {
                res.status(404).json({
                    message: "The applicant profile with this ID doesn't exist.",
                });
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};
