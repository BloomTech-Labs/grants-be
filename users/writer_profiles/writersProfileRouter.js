const router = require("express").Router();

const Writers = require("./writersProfileModel");
const restricted = require("../../auth/middleware/restricted");
const checkWriterId = require("../../auth/middleware/verifyWriterId");

//get all writers profiles
router.get("/", restricted, (req, res) => {
    Writers.findWritersProfile()
        .then((profiles) => {
            res.json(profiles);
        })
        .catch((err) => res.send(err));
});

//get a writer  profile by id
router.get("/:id", checkWriterId, (req, res) => {
    const id = req.params.id;

    Writers.findWriterProfileById(id)
        .then((profile) => {
            const { first_name, last_name, email, user_type } = profile;
            res.status(200).json({ first_name, last_name, email, user_type });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

//put update a writer profile info
router.put("/:id", restricted, checkWriterId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Writers.updateWriterProfile(id, changes)
        .then((updated) => {
            res.status(201).json(updated);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

//delete a writer profile  by id
router.delete("/:id", restricted, checkWriterId, (req, res) => {
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
