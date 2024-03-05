const express = require('express');
const cors = require('cors');
const logRoutes = require('./middleware/logger');

const app = express();

const userRouter = require('./routes/userRoutes')
const noteRouter = require('./routes/noteRoutes')
const flashcardRouter = require('./routes/flashcardRoutes');
const deckRouter = require('./routes/deckRoutes')


app.use(cors());
app.use(express.json());
app.use(logRoutes)
app.use('/card', flashcardRouter)
app.use("/user", userRouter)
app.use("/note", noteRouter)
app.use("/deck", deckRouter)


app.get("/", (req, res) => {
    res.json({
        name: "Flashstacks Backend",
        description: "This is the root of the Flashstacks API!"
    })
})

module.exports = app;