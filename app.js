const userRouter = require('./routes/userRoutes')

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

module.exports = app;