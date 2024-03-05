const { Router } = require('express');

const noteController = require('../controllers/noteController.js');

const noteRouter = Router();

noteRouter.get("/all/:userid", noteController.getAll)
noteRouter.post("/", noteController.create)
noteRouter.get("/category/:userid", noteController.getByCategory)
noteRouter.get("/:id", noteController.getById)
noteRouter.patch("/:id", noteController.update)
noteRouter.delete("/:id", noteController.destroy)

module.exports = noteRouter