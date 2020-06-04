const router = require("express").Router();

const Grants = require("./grantsModel");
const restricted = require("../../auth/middleware/restricted");
// const verifyGrant = require('../../auth/middleware/verifyGrant.js');

//create a new grant
router.post("/new", (req, res) => {
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
      res.status(500).json(error);
    });
});

//get all grants (maybe add a filter)
router.get("/", (req, res) => {
  // router.get("/", restricted, (req, res) => {
  //should we filter grants by a status?? ie: open vs. closed grants
  Grants.findGrants()
    .then((grants) => {
      res.json(grants);
    })
    .catch((err) => res.send(err));
});

//get a grant by grant_id
router.get("/:grantId", (req, res) => {
  const { grantId } = req.params;
  Grants.findSingleGrantBy(grantId)
    .then((grant) => {
      res.status(200).json({
        grant,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "there's been an issue getting list of grants",
        error: err,
      });
    });
});

//put update a grant info
router.put("/:grantId", restricted, (req, res) => {
  const { grantId } = req.params;
  const changes = req.body;
  Grants.updateGrant(changes, grantId)
    .then((updated) => {
      res.status(204).json({
        recordsUpdated: updated,
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
      res.send({
        message: "error returning grants by user",
        error: err,
      })
    );
});

//get all grants by user_id
router.get("/user/:userId/:grantId", (req, res) => {
  //Do we need this? I DUNNO!!!!
  //   const grantId = req.params.grantId;
  //   const userId = req.params.userId;
  //   Grants.findSingleGrantBy(grantId)
  //     .then((grant) => {
  //       res.status(200).json({
  //         grant,
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({
  //         message: "there's been an issue getting list of grants",
  //         error: err,
  //       });
  //     });
});

module.exports = router;
