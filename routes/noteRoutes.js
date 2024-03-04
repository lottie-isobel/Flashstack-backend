const { Router } = require('express');

const noteController = require('../controllers/noteController.js');

const noteRouter = Router();

flashcardRouter.get("/all", noteController.getAll)
flashcardRouter.post("/", noteController.create)
flashcardRouter.get("/category", noteController.getByCategory)
flashcardRouter.get("/:id", noteController.getById)
flashcardRouter.patch("/:id", noteController.update)
flashcardRouter.delete("/:id", noteController.destroy)