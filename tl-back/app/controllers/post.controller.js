const db = require("../models");
const Post = db.posts;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: `Title can not be empty!`
    });
    return;
  }

  if (!req.body.text) {
    res.status(400).send({
      message: `Text can not be empty!`
    });
    return;
  }

  if (!req.body.userId) {
    res.status(400).send({
      message: `UserId can not be empty!`
    });
    return;
  }

  const post = {
    title: req.body.title,
    text: req.body.text,
    userId: req.body.userId
  };

  Post.create(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Some error occurred while creating Post!\n${err}`
      });
    });
};

exports.findAll = (req, res) => {
  Post.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Some error occurred while retrieving Post!\n${err}`
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id, { include: ["user"] })
    .then(data => {
      if (data) {
        res.send({
          post: {
            id: data.id,
            text: data.text,
            title: data.title
          },
          user: {
            id: data.user.id,
            username: data.user.username
          }
      });
      } else {
        res.status(404).send({
          message: `Post Not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Some error occurred while retrieving Post!\n${err}`
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Post was updated successfully!`
        });
      } else {
        res.send({
          message: `Post Not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Some error occurred while updating Post!\n${err}`
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Post was deleted successfully!`
        });
      } else {
        res.send({
          message: `Post Not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Some error occurred while deleting Post!\n${err}`
      });
    });
};