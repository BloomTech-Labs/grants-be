const router = require('express').Router();
const Applicants = require('./applicantProfileModel.js');

//GET all applicant profiles
router.get('/', (req, res) => {

  Applicants.findApplicantProfiles()
    .then(profiles => {
      res.json(profiles);
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to retrieve applicant profiles",
        error: err
      });
    });
});

//GET specific applicant by profile id
router.get('/:profileId', (req, res) => {
  
  Applicants.findApplicantProfileById()
    .then(profile => {
      res.json(profile);
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to retrieve applicant profile",
        error: err
      });
    });
});

//PUT update applicant profile info
router.put('/:profileId', (req, res) => {
  
  const { profileId } = req.params;
  const changes = req.body;

  Applicants.updateApplicantProfile(changes, profileId)
    .then(updated => {
      res.status(200).json({
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

