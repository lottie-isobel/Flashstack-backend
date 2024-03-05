const { Router } = require('express');

const deckController = require('../controllers/deckController.js');

const deckRouter = Router();

deckRouter.get("/", deckController.getAllByUserId)
deckRouter.get("/:id", deckController.getOneByDeckId)
deckRouter.post("/", deckController.create)
deckRouter.patch("/:id", deckController.update)
deckRouter.delete("/:id", deckController.destroy)


module.exports = deckRouter