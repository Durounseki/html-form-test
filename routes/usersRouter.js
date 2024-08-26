const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

//List of users
usersRouter.get("/", usersController.usersListGet);
//Create user form
usersRouter.get("/create", usersController.usersCreateGet);
usersRouter.post("/create", usersController.usersCreatePost);
//Update user form
usersRouter.get("/:id/update", usersController.usersUpdateGet);
usersRouter.post("/:id/update", usersController.usersUpdatePost);
//Delete user
usersRouter.post("/:id/delete", usersController.usersDeletePost);
//Find user
usersRouter.get("/search", usersController.usersFindGet);



module.exports = usersRouter;