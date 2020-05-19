const Users = require("../../users/for_both_user_types/bothUserTypeModels.js");

function checkUserId(req, res, next) {
  const { userId } = req.params;

  Users.findById(userId)
    .then(user => {
      
      if(user) {
        req.user = user;
        next();
      }else {
        res.status(404).json({
          message: "The user with this ID does not exist."
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to retrieve user info.",
        error: err
      });
    });
};

module.exports = checkUserId;