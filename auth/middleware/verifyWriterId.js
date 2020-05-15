const Writers = require("../../users/writer_profiles/writersProfileModel");

module.exports = function checkWriterId(req, res, next) {
    const { id } = req.params;

    Writers.findWriterProfileById(id)
        .then((writer) => {
            if (writer) {
                req.profile = writer;
                next();
            } else {
                res.status(404).json({
                    message: "The writer profile with this ID doesn't exist.",
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
              message: "Failed to retrieve writer profile",
              error: err
            });
        });
};
