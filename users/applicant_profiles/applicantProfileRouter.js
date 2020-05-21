const router = require('express').Router();
const Applicants = require('./applicantProfileModel.js');
const checkUserId = require('../../auth/middleware/verifyUserId.js');
const mware = require('../../auth/middleware/verifyApplicantId');
const restricted = require('../../auth/middleware/restricted.js');


//GET all applicant profiles
router.get('/', restricted, (req, res) => {

  Applicants.findApplicantProfiles()
    .then(profiles => {
      res.status(200).json(profiles);
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to retrieve applicant profiles",
        error: err
      });
    });
});

//GET specific applicant by user Id
router.get('/:userId', checkUserId, (req, res) => {
  const {userId} = req.params;

  Applicants.findApplicantProfileById(userId)
    .then(profile => {
      res.status(200).json({
        profile
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "there's been an issue getting user info",
        error: err
      })
    })
      
});

//PUT update applicant profile info
router.put('/:userId', (req, res) => {
  
  const { userId } = req.params;
  const changes = req.body;

  Applicants.updateApplicantProfile(changes, userId)
    .then(updated => {
      res.status(204).json({
        recordsUpdated: updated
      })
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an issue updating applicant profile",
        error: err
      });
    });
});

module.exports = router;
