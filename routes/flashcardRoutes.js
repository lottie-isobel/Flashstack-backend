const { Router } = require('express');

const flashcardController = require('../controllers/flashcardController.js');

const flashcardRouter = Router();

flashcardRouter.get("/deck/:id", flashcardController.getAllByDeckId)
flashcardRouter.post("/deck/:id", flashcardController.create)
flashcardRouter.get("/:id", flashcardController.getOneByCardId)
flashcardRouter.patch("/:id", flashcardController.update)
flashcardRouter.delete("/:id", flashcardController.destroy)


module.exports = flashcardRouter