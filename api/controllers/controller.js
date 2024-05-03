const db = require("../models");
const Todo = db.todos;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status ? req.body.status : false,
    dueDate: req.body.dueDate,
  });

  todo
    .save(todo)
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Todo.",
      });
    });
};

exports.findAll = (req, res) => {
  // Provide API for the search by title functionality in the client.
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Todo.find(condition)
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      res
        .status(500)
        .send({
          message: err.message || "Some error occurred while fetching todos.",
        });
    });
};

exports.findOne = (req, res) => {
  if (!req.body)
    res.status(400).send({ message: "Search content cannot be empty" });
  const id = req.params.id;
  Todo.findById(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: "Todo not found" });
      else res.status(200).send(data);
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Error retrieving todo with id " + id })
    );
};

exports.findAllDone = (req, res) => {
  Todo.find({ status: true })
    .then((data) => res.status(200).send(data))
    .catch((err) =>
      res
        .status(500)
        .send({
          message: err.message || "Some error occurred during retrieval",
        })
    );
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty." });
  }

  console.log(req)


  const id = req.params.id;

  Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot update Todo with id=${id}. Not found.` });
      } else {
        res.status(200).send({ message: "Todo was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Todo with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to delete cannot be empty." });
  }

  const id = req.params.id;

  Todo.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Todo with id=${id}. Not found.`,
        });
      } else {
        res.status(200).send({ message: "Todo was deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete Todo with id=" + id });
    });
};

exports.deleteAll = (req, res) => {
  Todo.deleteMany({})
    .then((data) =>
      res
        .status(200)
        .send({
          message: `${data.deletedCount} Todos were deleted successfully`,
        })
    )
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Error occurred while deleting todos" })
    );
};
