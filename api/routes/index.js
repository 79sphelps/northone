module.exports = (app) => {
  const calendarEvents = require("../controllers/controller.js");
  const router = require("express").Router();

  router.post("/", calendarEvents.create);
  router.get("/", calendarEvents.findAll);
  router.get("/status", calendarEvents.findAllDone);
  router.get("/:id", calendarEvents.findOne);
  router.put("/:id", calendarEvents.update);
  router.delete("/:id", calendarEvents.delete);
  router.delete("/", calendarEvents.deleteAll);

  app.use("/api/calendarEvents", router);
};
