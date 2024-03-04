const userRouter = require('./routes/userRoutes')
const noteRouter = require('./routes/noteRoutes')

const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.json({
        name: "Flashstacks backend",
        description: "Flashstacks is an educational app"
    })
})

app.use("/user", userRouter)
app.use("/note", noteRouter)

module.exports = app;