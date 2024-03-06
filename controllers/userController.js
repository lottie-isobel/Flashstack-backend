const bcrypt = require('bcrypt');

const User = require('../models/User');
const Token = require('../models/Token');

async function register (req, res) {
    try{
    const data = req.body

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
    data["password"] =await bcrypt.hash(data.password, salt)

  
    const result = await User.create(data)
    res.status(201).send(result)
    }catch(err){
        res.status(400).json({error: err.message})
    }
    
};

async function login (req, res) {
    const data = req.body;
    try{
        const user = await User.getOneByEmail(data.email)
        const authenticated = await bcrypt.compare(data.password, user.password)

        if(!authenticated){
            throw new Error("Incorrect details")
        }else{
            const token = await Token.create(user["id"])
            res.status(200).json({authenticated: true, token: token.token})
        }

    }catch(err){
        res.status(401).json({error: err.message})
    }
}

async function getOneByToken (req, res) {
    const token = req.params.token
    try {
        const result = await User.getOneByToken(token)
        res.status(200).send(result)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {
    register, login, getOneByToken
}   