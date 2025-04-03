const db = require("../models");
const User = db.users;

exports.register = (req, res) => {
  if (!req.body.username) {
    res.status(400).send({
      message: `Username can not be empty!`
    });
    return;
  }

  if (!req.body.password) {
    res.status(400).send({
      message: `Password can not be empty!`
    });
    return;
  }

  const user = {
    username: req.body.username,
    password: req.body.password,
    staff: req.body.staff ? req.body.staff : false
  };

  User.create(user)
    .then(data => {
      res.send({
        message: "Registered successfully",
        user: {
          id: data.id,
          username: data.username,
          staff: data.staff
        }
      });
    })
    .catch(err => {
      res.status(500).send({
        message: `Some error occurred while creating!\n${err}`
      });
    });
};

exports.authorize = (req, res) => {
  if (!req.body.username) {
    res.status(400).send({
      message: `Username can not be empty!`
    });
    return;
  }

  if (!req.body.password) {
    res.status(400).send({
      message: `Password can not be empty!`
    });
    return;
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ 
    where: { username: username } 
  })
    .then(data => {
    if (!data) {
      res.status(404).send({
        message: "User Not found!"
      });
      return;
    }
    if (data.password == password) {
      res.send({
        message: "Authorized successfully",
        user: {
          id: data.id,
          username: data.username,
          staff: data.staff
        }
      });
    } else {
      res.status(401).send({
        message: "Invalid password!"
      });
    }})
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving User!\n${err}`
      });
    });
};