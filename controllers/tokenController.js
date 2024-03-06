const Token = require('../models/Token')

async function getOneByToken(req, res){
    try {
        const token = req.body.token
        const response = await Token.getOneByToken(token)
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

async function logout (req, res) {
    const token = req.body.token
    try {
        const tokenToDelete = await Token.getOneByToken(token)
        const result = await tokenToDelete.destroy()
        res.status(204).send(result)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = { getOneByToken, logout }