module.exports = app => {
  const posts = require("../controllers/post.controller.js");

  var postsRouter = require("express").Router();

  postsRouter.post("/", posts.create);

  postsRouter.get("/", posts.findAll);

  postsRouter.get("/:id", posts.findOne);

  postsRouter.put("/:id", posts.update);

  postsRouter.delete("/:id", posts.delete);

  app.use('/api/posts', postsRouter);
  
  
  const users = require("../controllers/user.controller.js");

  var usersRouter = require("express").Router();

  usersRouter.post("/register", users.register);

  usersRouter.post("/authorize", users.authorize);

  app.use("/api/users", usersRouter)
};