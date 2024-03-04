const Token = require("../models/Token")

const authenticator = async (req, res, next) => {
    try{
        const userToken = req.headers.authorization
        
        if(!userToken){
            return res.status(401).then({error: "You need a token"})
        } 
        
        const validToken = await Token.getOneByToken(userToken)
        if(!validToken){
            throw new Error("Token is bad or invalid")
        }

        next()
       
    } catch (err) {
        res.status(403).json({error: err.message})
    }
}

module.exports = authenticator 