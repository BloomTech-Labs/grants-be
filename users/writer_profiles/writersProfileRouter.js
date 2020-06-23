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
  const {
    userId
  } = req.params;

  Writers.findWriterProfileById(userId)
    .then((profile) => {
      res.status(200).json({
        profile,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "there's been an issue getting user info",
        error: err,
      });
    });
});

//put update a writer profile info
router.put("/:userId", restricted, (req, res) => {
  const {
    userId
  } = req.params;
  const changes = req.body;

  Writers.updateWriterProfile(changes, userId)
    .then((updated) => {
      res.status(204).json({
        recordsUpdated: updated,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an issue updating writer profile",
        error: err,
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
router.get("/services", (req, res) => {
  Writers.findWriterServices()
    .then((services) => {
      res.status(200).json(services);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to retreive services.",
        error: err,
      });
    });
});

//get all services from one specific user by profile id
router.get("/services/:id", (req, res) => {
  const {
    id
  } = req.params;

  Writers.findWriterServicesById(id)
    .then((services) => {
      if (services) {
        res.status(200).json(services);
      } else {
        res.status(200).json({
          message: "This user has no added services offered.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to retrieve offered services for this user.",
        error: err,
      });
    });
});

//add service to user profile...writer profile id in params
router.post("/services/:id", (req, res) => {
  const {
    id
  } = req.params;
  const service = {
    writer_profile_id: id,
    service_offered: req.body,
  };

  Writers.addWriterService(service)
    .then((addedService) => {
      res.status(201).json(addedService);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to add service to profile.",
        error: err,
      });
    });
});

//edit existing service on writer profile...uses writer profile id in params
router.put("/services/:id", (req, res) => {
  const id = req.params;
  const changes = req.body;

  Writers.updateWriterService(changes, id)
    .then((updated) => {
      res.status(200).json({
        recordsUpdated: updated,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to update services on profile",
        error: err,
      });
    });
});

//delete existing service from writer profile...uses service id in params
router.delete("/services/:service_id", (req, res) => {
  const {
    service_id
  } = req.params;

  Writers.deleteWriteProfile(service_id)
    .then((service) => {
      res.status(200).json({
        message: "Service has been deleted from user profile.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to delete service from user profile",
        error: err,
      });
    });
});

// *** WRITER EDUCATIONS ROUTER ***

//add new writer education data
router.post("/edu/:id", (req, res) => {
  const {
    id
  } = req.params;
  const eduData = {
    writer_id: id,
    college: req.params,
    start_date: req.params,
    end_data: req.params,
    still_attending: req.params,
    degree: req.params,
  };

  Writers.addWriterEducation(eduData)
    .then((education) => {
      res.status(201).json(education);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to add education history to profile.",
        error: err.message,
      });
    });
});

//get specific writer's education data by user id
router.get("/edu/:id", (req, res) => {
  const {
    id
  } = req.params;

  Writers.findWriterEducationById(id)
    .then((educations) => {
      if (educations) {
        res.status(200).json(educations);
      } else {
        res.status(200).json({
          message: "This user has not added education history.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to retrieve education history for this user.",
        error: err,
      });
    });
});

//updates existing educationa history record, takes education record id (primary key) in params
router.put("/edu/:educationId", (req, res) => {
  const {
    educationId
  } = req.params;
  const changes = req.body;

  Writers.updateWriterEducation(changes, educationId)
    .then((updated) => {
      res.status(204).json({
        recordsUpdated: updated,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an issue updating user education history.",
      });
    });
});

//deletes existing education record, uses education record id (primary key).
router.delete("/edu/:educationId", (req, res) => {
  const {
    educationId
  } = req.params;

  Writers.deleteWriterEducation(educationId)
    .then((education) => {
      res.status(200).json({
        message: "Education history has been deleted.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to delete education history from user profile",
        error: err,
      });
    });
});

// *** WORK HISTORY ROUTER ***

//adds new work history record to user - returns writers entire array of jobs
router.post("/:id/work/", (req, res) => {
  const {
    body
  } = req;
  Writers.addWorkHistory(body)
    .then((work) => {
      res.status(201).json(work);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to add work history to profile.",
        error: err.message,
      });
    });
});

//get work history for specific user, user id required in params
router.get("/:id/work/", (req, res) => {
  const {
    id
  } = req.params;

  Writers.findWorkHistoryById(id)
    .then((workHistories) => {
      if (workHistories) {
        res.json(workHistories);
      } else {
        res.status(200).json({
          message: "This user has no added work history.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to retrieve work history records for this user.",
        error: err.message,
      });
    });
});

//update existing user work history record, work history id required in params - returns updated array
router.put("/:id/work/:workHistId", (req, res) => {
  const {
    workHistId
  } = req.params;
  const changes = req.body;

  Writers.updateWorkHistory(changes, workHistId)
    .then((updated) => res.json(updated))
    .catch((err) => {
      res.status(500).json({
        message: "There was an issue updating user work history.",
        error: err,
      });
    });
});

//delete existing work history, requires work history id in params.
router.delete("/:id/work/:workHistId", (req, res) => {
  const {
    workHistId
  } = req.params;
  const {
    id
  } = req.params;

  Writers.deleteWorkHistory(workHistId, id).then((workHistory) => {
    res.status(200).json(workHistory);
  });
});

// *** WRITER FAVORITE GRANTS ROUTER ***

// this post doesn't need a body, when passed the valid id's in the params it will create the appropriate new record
router.post("/:writer_id/saved-grants/:grant_id", (req, res) => {
  const {
    writer_id
  } = req.params;
  const {
    grant_id
  } = req.params;
  Writers.addWriterSavedGrant(Number(writer_id), Number(grant_id))
    .then((success) => {
      res.status(201).json(success);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
        message: "it was me"
      });
    });
});

router.get("/:id/saved-grants/", (req, res) => {
  const {
    id
  } = req.params;
  Writers.getWriterSavedGrant(id)
    .then((favorites) => {
      res.status(201).json(favorites);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
        message: "it was me"
      });
    });
});

router.delete("/:writer_id/saved-grants/:grant_id", (req, res) => {
  const {
    writer_id
  } = req.params;
  const {
    grant_id
  } = req.params;
  Writers.deleteWriterSavedGrant(Number(writer_id), Number(grant_id))
    .then((success) =>
      res.send({
        message: `Grant ID ${grant_id} removed from favorites`,
      })
    )
    .catch((err) => res.send({
      error: err.message
    }));
});

module.exports = router;