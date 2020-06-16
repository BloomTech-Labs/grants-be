const router = require("express").Router();

const Grants = require("./grantsModel");
const restricted = require("../../auth/middleware/restricted");
// const verifyGrant = require('../../auth/middleware/verifyGrant.js');

//create a new grant
router.post("/new", restricted, (req, res) => {
  let newGrant = req.body;
  Grants.addGrant(newGrant)
    .then((grant) => {
      console.log("Added a grant", grant);
      res.status(201).json({
        message: "successfully entered new grant!",
        grant_details: grant,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "error posting new grant",
        error: error,
      });
    });
});

//get all grants (maybe add a filter)
router.get("/", restricted, (req, res) => {
  Grants.findGrants()
    .then((grants) => {
      res.json(grants);
    })
    .catch((err) => {
      res.status(500).json({
        message: "error retrieving all grants",
        error: err,
      });
    });
});

//get a grant by grant_id
router.get("/:grantId", restricted, (req, res) => {
  const id = req.params.grantId;
  Grants.findSingleGrantById(id)
    .then((grant) => {
      res.status(200).json({
        grant,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `there's been an issue getting grant ${id}`,
        error: err,
      });
    });
});

//put update a grant info
router.put("/:grantId", restricted, (req, res) => {
  const id = req.params.grantId;
  const changes = req.body;
  Grants.updateGrant(changes, id)
    .then((updated) => {
      res.status(204).json({
        Updated_grant: updated,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an issue updating grant information",
        error: err,
      });
    });
});

//delete a grant by grant_id
router.delete("/:grantId", restricted, (req, res) => {
  const grantId = req.params.grantId;
  Grants.deleteGrant(grantId)
    .then((grant) => {
      res.status(200).json({
        message: "The writer grant successfully deleted.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error deleting this grant",
        error: err,
      });
    });
});

// *** Affecting grants based on user ***

//get all grants
router.get("/user/:userId/", restricted, (req, res) => {
  const userId = req.params.userId;
  //should we filter grants by a status?? ie: open vs. closed grants
  Grants.findGrantsByUser(userId)
    .then((grants) => {
      res.json(grants);
    })
    .catch((err) =>
      res.status(500).json({
        message: "error returning grants by user",
        error: err,
      })
    );
});

module.exports = router;
