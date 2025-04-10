module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var usersRouter = require("express").Router();

  usersRouter.post("/register", users.register);

  usersRouter.post("/authorize", users.authorize);

  usersRouter.get("/:id", users.findOne);

  app.use("/api/users", usersRouter)
};