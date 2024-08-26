const usersStorage = require("../storages/usersStorage");
//Validation

const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emailErr = "example@somewhere.com"
const ageErr = "must be between 18 and 120."
const bioErr = "must be at most 200 characters long."

const validateUser = [
    body("firstName").trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
    body("lastName").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
    body("email").trim()
    .isEmail().withMessage(`Use a valid email address for example: ${emailErr}`),
    body("age").optional().trim()
    .if(body("age").notEmpty())
        .isNumeric().withMessage(`Age must be a number`)
        .isInt({min: 18, max: 120}).withMessage(`Age ${ageErr}`),
    body("bio").optional().trim()
    .if(body("bio").notEmpty())
        .isLength({ max: 200 }).withMessage(`Bio ${bioErr}`),
];

//Create user views

exports.usersListGet = (req, res) => {
    res.render("index", {
        title: "User list",
        users: usersStorage.getUsers(),
    });
};

exports.usersCreateGet = (req, res) => {
    res.render("createUser", {
        title: "Create user",
        formData: null,
    });
};

// We can pass an entire array of middleware validations to our controller.
exports.usersCreatePost = [
    validateUser,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("createUser", {
                title: "Create user",
                errors: errors.array(),
                formData: req.body, //Pass the submitted data to be reused
            });
        }
        const { firstName, lastName, email, age, bio } = req.body;
        usersStorage.addUser({ firstName, lastName, email, age, bio });
        res.redirect("/");
    }
];

//Update users views

exports.usersUpdateGet = (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    res.render("updateUser", {
        title: "Update user",
        user: user,
    });
};

exports.usersUpdatePost = [
    validateUser,
    (req, res) => {
        const user = usersStorage.getUser(req.params.id);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("updateUser", {
                title: "Update user",
                user: user,
                errors: errors.array(),
            });
        }
        const { firstName, lastName, email, age, bio } = req.body;
        usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio });
        res.redirect("/");
    }
];

//Delete user
// Tell the server to delete a matching user, if any. Otherwise, respond with an error.
exports.usersDeletePost = (req, res) => {
    usersStorage.deleteUser(req.params.id);
    res.redirect("/");
  };
  