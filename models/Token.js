const { v4: uuidv4 } = require("uuid");

const db = require("../database/connect");

class Token {

    constructor({ tokenid, userid, token }){
        this.tokenid = tokenid;
        this.userid = userid;
        this.token = token;
    }

    static async create(userid) {
        const token = uuidv4()
        const response  = await db.query("INSERT INTO tokens (userid, token) VALUES ($1, $2) RETURNING tokenid;",
        [userid, token])
        const newId = response.rows[0].tokenid
        const newToken = await Token.getOneById(newId)
        return newToken
    }

    async destroy(token) {
        const response = await db.query("DELETE FROM tokens WHERE token = $1 RETURNING *", [token])
        return response.rows[0]
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM tokens WHERE tokenid = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

    static async getOneByToken(token) {
        const response = await db.query("SELECT * FROM tokens WHERE token = $1", [token]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

}

module.exports = Token;