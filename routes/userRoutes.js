const { Router } = require('express');

const userController = require('../controllers/userController.js');
const tokenController = require('../controllers/tokenController.js');

const userRouter = Router();

userRouter.get("/:token", userController.getOneByToken)
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.delete("/logout", tokenController.logout)

module.exports = userRouter;