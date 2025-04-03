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

  const post = {
    title: req.body.title,
    text: req.body.text,
    published: req.body.published ? req.body.published : false
  };

  Post.create(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Some error occurred while creating!\n${err}`
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
        message: `Some error occurred while retrieving!\n${err}`
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Can not found id=${id}!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Some error occurred while retrieving id=${id}!\n${err}`
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
          message: `id=${id} was updated successfully!`
        });
      } else {
        res.send({
          message: `Can not found id=${id}!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Some error occurred while updating id=${id}!\n${err}`
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
          message: `id=${id} was deleted successfully!`
        });
      } else {
        res.send({
          message: `Can not found id=${id}!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Some error occurred while deleting id=${id}!\n${err}`
      });
    });
};