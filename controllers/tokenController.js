const Token = require('../models/Token')

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

module.exports = { logout }