module.exports = (app) => {
  const todos = require("../controllers/controller.js");
  const router = require("express").Router();

  router.post("/", todos.create);
  router.get("/", todos.findAll);
  router.get("/status", todos.findAllDone);
  router.get("/:id", todos.findOne);
  router.put("/:id", todos.update);
  router.delete("/:id", todos.delete);
  router.delete("/", todos.deleteAll);

  app.use("/api/todos", router);
};
