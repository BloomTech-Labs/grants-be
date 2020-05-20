const router = require("express").Router();

const Writers = require("./writersProfileModel");
const restricted = require("../../auth/middleware/restricted");
const checkUserId = require("../../auth/middleware/verifyUserId");


//get all writers profiles
router.get("/", restricted, (req, res) => {
    Writers.findWritersProfile()
        .then((profiles) => {
            res.json(profiles);
        })
        .catch((err) => res.send(err));
});

//get a writer  profile by id
router.get("/:userId", checkUserId, (req, res) => {
  const {userId} = req.params;

  Writers.findWriterProfileById(userId)
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

//put update a writer profile info
router.put("/:userId", restricted, (req, res) => {
    const { userId } = req.params;
    const changes = req.body;

    Writers.updateWriterProfile(changes, userId)
        .then(updated => {
            res.status(201).json({
              recordsUpdated: updated
            })
        })
        .catch(err => {
            res.status(500).json({
              message: "There was an issue updating writer profile",
              error: err
            });
        });
});

//delete a writer profile  by id
router.delete("/:id", restricted, (req, res) => {
    const id = req.params.id;

    Writers.deleteWriteProfile(id)
        .then((profile) => {
            res.status(200).json({
                message: "The writer profile successfully deleted.",
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});


// *** WRITER SERVICES OFFERED ROUTER ***

//get all services in db
router.get('/services', (req, res) => {

  Writers.findWriterServices()
    .then(services => {
      res.json(services);
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to retreive services.",
        error: err
      });
    });
});


//get all services from one specific user by profile id
router.get('/services/:id', (req, res) => {

  const { id } = req.params;

  Writers.findWriterServicesById(id)
    .then(services => {
      if(services) {
        res.json(pickups);
      }else {
        res.status(200).json({
          message: "This user has no added services offered."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to retrieve offered services for this user.",
        error: err
      });
    });
});

//add service to user profile...writer profile id in params
router.post('/services/:id', (req, res) => {

  const { id } = req.params;
  const service = {
    writer_profile_id : id,
    service_offered : req.body
  }

  Writers.addWriterService(service)
    .then(addedService => {
      res.status(201).json(addedService);
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to add service to profile.",
        error: err
      });
    });
});

//edit existing service on writer profile...uses writer profile id in params
router.put('/services/:id', (req, res) => {
  
  const id = req.params;
  const changes = req.body;

  Writers.updateWriterService(changes, id)
    .then(updated => {
      res.status(200).json({
        recordsUpdated: updated
      })
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to update services on profile",
        error: err
      });
    });
});

//delete existing service from writer profile...uses service id in params
router.delete('/services/:service_id', (req, res) => {

  const { service_id } = req.params;

  Writers.deleteWriteProfile(service_id)
    .then(service => {
      res.status(200).json({
        message: "Service has been deleted from user profile."
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to delete service from user profile",
        error: err
      });
    });
});

module.exports = router;
