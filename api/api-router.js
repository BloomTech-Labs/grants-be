const router = require("express").Router();
const authRouter = require("../auth/auth-router.js");
const writersProfileRouter = require("../users/writer_profiles/writersProfileRouter.js");
const applicantProfileRouter = require("../users/applicant_profiles/applicantProfileRouter.js");
const grantsRouter = require("../users/grants/grantsRouter.js");

router.use("/auth", authRouter);
router.use("/writers", writersProfileRouter);
router.use("/applicants", applicantProfileRouter);
router.use("/grants", grantsRouter);

module.exports = router;
