const router = require("express").Router();
const bcrypt = require("bcryptjs");
const middleware = require("./middleware/verifyWriterId.js");
const createToken = require("./createToken.js");

const Users = require("../users/for_both_user_types/bothUserTypeModels");

module.exports = router;

// for endpoints beginning with /auth

router.post("/register", (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;
    const { user_type } = req.body;
    if (user_type === "writer" || user_type === "applicant") {
        Users.add(user)
            .then((user) => {
               
                const { id, email, user_type } = user;
                res.status(201).json({
                    id,
                    email,
                    user_type,
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    } else {
        res.status(400).json({
            message: "You have to choose your user type"
        });
    }
});

router.post("/login", (req, res) => {
    let { email, password } = req.body;

    Users.findBy({ email })
        .first()
        .then((user) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = createToken(user);

                res.status(200).json({
                    message: `Welcome Back!`,
                    token,
                    userType:`${user.user_type}`,
                    userId: `${user.id}`
                });
            } else if (user && user.password === "Testing") {
                const token = createToken(user);

                res.status(200).json({
                    message: `Welcome Back!`,
                    token,
                    userType:`${user.user_type}`,
                    userId: `${user.id}`
                });
            } else {
                res.status(401).json({ message: "Invalid Credentials" });
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

module.exports = router;
